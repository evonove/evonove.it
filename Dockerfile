FROM python:3.5.2
MAINTAINER Emanuele Palazzetti <hello@palazzetti.me>

# environment variables
ENV DJANGO_SETTINGS_MODULE website.settings.dev
ENV DATABASE_URL postgres://devel:123456@postgres:5432/evonoveit
ENV CACHE_URL redis://redis:6379/0

ENV UWSGI_HTTP 0.0.0.0:8000
ENV UWSGI_PROCESSES 2

WORKDIR /app

COPY . /app/
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uwsgi", "--need-app", "--chdir", "django-website", "--py-autoreload", "1", "--http", "8000", "--module", "website.wsgi"]
