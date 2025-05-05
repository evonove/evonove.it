####################################################################
# Base python image
####################################################################
FROM python:3.13.3-slim AS python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PROJECT_PATH="/app" \
    VENV_PATH="/app/.venv"

ENV PATH="$VENV_PATH/bin:$PATH"

####################################################################
# Builder image, here we create our virtualenv
####################################################################
FROM python-base AS builder

RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv
# - Silence uv complaining about not being able to use hard links,
# - tell uv to byte-compile packages for faster application startups,
# - prevent uv from accidentally downloading isolated Python builds,
# - pick a Python
# - and finally declare `/app` as the target for `uv sync`.
ENV UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PYTHON_DOWNLOADS=never \
    UV_PYTHON=python3.13 \
    UV_PROJECT_ENVIRONMENT=$PROJECT_PATH

# Synchronize DEPENDENCIES without the application itself.
# This layer is cached until uv.lock or pyproject.toml change, which are
# only temporarily mounted into the build container since we don't need
# them in the production one.
# You can create `/app` using `uv venv` in a separate `RUN`
# step to have it cached, but with uv it's so fast, it's not worth
# it, so we let `uv sync` create it for us automagically.
RUN --mount=type=cache,target=/root/.cache \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync \
        --frozen \
        --no-dev \
        --no-install-project

# copy application code
COPY ./django-website $PROJECT_PATH/django-website
COPY ./containers/start.sh $PROJECT_PATH
COPY ./uwsgi.ini $PROJECT_PATH

WORKDIR $PROJECT_PATH
RUN --mount=type=cache,target=/root/.cache \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync \
        --locked \
        --no-dev \
        --no-editable

####################################################################
# Final deployable image
####################################################################
FROM python-base AS application

RUN groupadd -r app \
 && useradd -r -d $PROJECT_PATH -g app -N app

# FIXME: uwsgi 2.0.29 do not start without the sharer libs
COPY --from=builder --chown=app:app /usr/lib /usr/lib
COPY --from=builder --chown=app:app $PROJECT_PATH $PROJECT_PATH

WORKDIR $PROJECT_PATH

ENV DJANGO_SETTINGS_MODULE=website.settings.production \
    DJANGO_DEBUG=False

ENV PATH="/app/bin:$PATH"

ENTRYPOINT ["/app/start.sh"]
CMD ["uwsgi"]
