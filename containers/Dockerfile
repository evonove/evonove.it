####################################################################
FROM python:3.7-slim as python-base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PROJECT_PATH="/app" \
    VENV_PATH="/app/.venv"

ENV PATH="$VENV_PATH/bin:$PATH"

####################################################################
FROM python-base as builder-base
ENV POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    POETRY_VERSION=1.1.12

# Install Poetry - respects $POETRY_VERSION
RUN pip install "poetry==${POETRY_VERSION}"
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# We copy our Python requirements here to cache them
# and install only runtime deps using poetry
COPY ./poetry.lock ./pyproject.toml $PROJECT_PATH/

WORKDIR $PROJECT_PATH

####################################################################
FROM builder-base as builder-production
RUN poetry install --no-dev --no-ansi

####################################################################
FROM builder-base as builder-test
RUN poetry install --no-ansi

####################################################################
FROM python-base as testing

COPY ./django-website $PROJECT_PATH/
COPY --from=builder-test $VENV_PATH $VENV_PATH
WORKDIR $PROJECT_PATH
ENV DJANGO_SETTINGS_MODULE=website.settings.dev
CMD ["pytest"]

####################################################################
# FROM python-base as application
#
# # copy application code
# COPY ./django-website $PROJECT_PATH/django-website
# COPY --from=builder $VENV_PATH $VENV_PATH
# WORKDIR $PROJECT_PATH
#
# ENV DJANGO_SETTINGS_MODULE=website.settings.production \
#     DJANGO_DEBUG=False
#
# ENTRYPOINT ["start.sh"]
# CMD ["uwsgi"]
