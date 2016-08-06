===============
Evonove website
===============

.. image:: https://travis-ci.org/evonove/evonove.it.svg?branch=master
   :alt: Build Status
   :target: https://travis-ci.org/evonove/evonove.it

`evonove.it`_ website, made with `Wagtail`_!

.. _evonove.it: https://evonove.it/
.. _Wagtail: https://wagtail.io/

Getting started
---------------

Starting this website requires the following backend services up and running:

* Redis
* PostgreSQL

If you want to launch your backend services via ``docker-compose``, just::

    $ docker-compose up

Populate the database
~~~~~~~~~~~~~~~~~~~~~

Running migrations isn't enough because the home page requires some data. If you dislike inserting data
using the admin (or in general be a data insert operator), you can launch the following commands that create
the database schema, the initial superuser, the blog page linked to the home page and a set of initial data
for a fake company.

From the ``django-website`` folder, launch::

    $ python manage.py migrate
    $ python manage.py createsuperuser
    $ python manage.py create_pages
    $ python manage.py load_test_data
    $ python manage.py runserver

Frontend development
~~~~~~~~~~~~~~~~~~~~

The frontend application, uses Wheelie toolchain. To start the livereload, enter in the
``django-website/wheelie/`` folder and just::

    $ npm run wheelie

When the frontend is ready to be deployed, launch the production build and commit all files in the
repository::

    $ npm run build
    $ git commit -m'process static files'

Settings
--------

The website requires the following settings in order to work as expected.

These environment variables must be set when using the ``production.py`` settings; this may not be
necessary while in development or testing mode, and no SSL connection will be used.

Django
~~~~~~

* ``SECRET_KEY`` (default: ``None``)
* ``DJANGO_SETTINGS_MODULE`` (default: ``None``)
* ``DJANGO_ALLOWED_HOSTS`` (default: ``None``)
* ``DJANGO_ASSETS_ROOT`` (default: project root folder)
* ``DJANGO_SECURE_SSL_REDIRECT`` (default: ``True``)
* ``DJANGO_SESSION_COOKIE_SECURE`` (default: ``True``)

Backends
~~~~~~~~

These environment variables define the service connection strings. You may set
these values according to your development environment. If you are using ``docker``,
just change ``DATABASE_URL`` and ``CACHE_URL`` with your linked container URLs.

* ``DATABASE_URL`` (default: ``postgres://devel:123456@127.0.0.1:5432/evonoveit``)
* ``CACHE_URL`` (default: ``redis://127.0.0.1:6379/1``)

Email
~~~~~

* ``DJANGO_EMAIL_BACKEND`` (default: ``django.core.mail.backends.smtp.EmailBackend``)
* ``DJANGO_FROM_EMAIL`` (default: ``None``)
* ``DJANGO_EMAIL_HOST`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_PORT`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_USER`` (default: ``None``)
* ``DJANGO_EMAIL_HOST_PASSWORD`` (default: ``None``)

Application server
~~~~~~~~~~~~~~~~~~

* ``UWSGI_HTTP``: sets the binding *address:port*
* ``UWSGI_SOCKET``: sets the unix socket path
* ``UWSGI_PROCESSES``: sets the number of uWSGI processes

Logging and monitoring
~~~~~~~~~~~~~~~~~~~~~~

* ``LOGSTASH_HOST`` (default: ``127.0.0.1``)
* ``LOGSTASH_PORT`` (default: ``5000``)
* ``NEW_RELIC_CONFIG_FILE``: sets the NewRelic configuration file ``newrelic.ini``
* ``SENTRY_DSN``: sets the ``DSN`` value, found in the Sentry setup page

Running on production
---------------------

The service may be wrapped using NewRelic. In this case, launch the application server with the
following command::

    $ newrelic-admin run-program uwsgi
