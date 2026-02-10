#!/bin/sh

set -e

if [ "$1" = 'uwsgi' ]; then
    python django-website/manage.py collectstatic --noinput
    python django-website/manage.py migrate

    exec uwsgi uwsgi.ini
fi

exec "$@"
