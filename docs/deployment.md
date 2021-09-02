# Deployment guidelines


## Environment & Settings

``Evonove Website`` requires the following settings in order to work as expected.

These environment variables must be set when using the ``production.py`` settings; this may not be
necessary while in development or testing mode, and no SSL connection will be used.

### Django

* ``DJANGO_SECRET_KEY`` (default: ``None``)
* ``DJANGO_SETTINGS_MODULE`` (default: ``None``)
* ``DJANGO_ALLOWED_HOSTS`` (default: ``None``)
* ``DJANGO_ASSETS_ROOT`` (default: project root folder)
* ``DJANGO_SECURE_SSL_REDIRECT`` (default: ``True``)
* ``DJANGO_SESSION_COOKIE_SECURE`` (default: ``True``)

### Backends

These environment variables define the service connection strings. You may set
these values according to your development environment. If you are using ``docker``,
just change ``DATABASE_URL`` and ``CACHE_URL`` with your linked container URLs.

* ``DATABASE_URL`` (default: ``postgres://devel:123456@127.0.0.1:5432/evonoveit``)
* ``CACHE_URL`` (default: ``redis://127.0.0.1:6379/1``)

### Email

* ``DJANGO_EMAIL_BACKEND`` (default: ``django.core.mail.backends.smtp.EmailBackend``)
* ``DJANGO_FROM_EMAIL`` (default: ``None``)
* ``DJANGO_EMAIL_HOST`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_PORT`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_USER`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_PASSWORD`` (default: ``None``)
* ``DJANGO_EMAIL_USE_TLS`` (default: ``True``)

### Application server

* ``UWSGI_HTTP``: sets the binding *address:port*
* ``UWSGI_SOCKET``: sets the unix socket path
* ``UWSGI_PROCESSES``: sets the number of uWSGI processes

### Monitoring

* ``SENTRY_DSN``: sets the ``DSN`` value, found in the Sentry setup page
