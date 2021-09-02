FROM python:3.7
MAINTAINER Evoniners <dev@evonove.it>

ENV DJANGO_SETTINGS_MODULE website.settings.dev
ENV DJANGO_EMAIL_BACKEND django.core.mail.backends.smtp.EmailBackend
ENV DJANGO_EMAIL_HOST mailhog
ENV DJANGO_EMAIL_HOST_PORT 1025
ENV DATABASE_URL postgres://devel:123456@postgres:5432/evonoveit
ENV CACHE_URL redis://redis:6379/1

ENV UWSGI_HTTP 0.0.0.0:8000
ENV UWSGI_PROCESSES 2

WORKDIR /app

ADD ./requirements/requirements.txt /app/
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uwsgi", "--need-app", "--chdir", "django-website", "--py-autoreload", "1", "--http", "8000", "--module", "website.wsgi"]
