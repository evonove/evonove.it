import os

import dj_database_url
from getenv import env

# django-website is the root folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.join(BASE_DIR, "..")

# security
SECRET_KEY = env("SECRET_KEY")

# this line was added to avoid a line too long error
_FOO = "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": _FOO,
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

DEFAULT_ALLOWED_HOSTS = "localhost, 127.0.0.1, [::1]"
ALLOWED_HOSTS = (
    env("DJANGO_ALLOWED_HOSTS", DEFAULT_ALLOWED_HOSTS).replace(" ", "").split(",")
)

DEBUG = env("DJANGO_DEBUG", False)

# apps and middleware
INSTALLED_APPS = (
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",
    "django_s3_storage",
    "wagtail.contrib.redirects",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.images",
    "wagtail.documents",
    "wagtail.embeds",
    "wagtail.admin",
    "wagtail",
    "wagtail.contrib.settings",
    "modelcluster",
    "taggit",
    "options",
    "agency",
    "blog",
    "contacts",
    "home",
    "hiring",
    "portfolio",
    "frontend",
    "user_sitemap",
)

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "wagtail.contrib.redirects.middleware.RedirectMiddleware",
    "google.cloud.logging.handlers.middleware.RequestMiddleware",
]

ROOT_URLCONF = "website.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "templates"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "wagtail.contrib.settings.context_processors.settings",
            ],
        },
    },
]

WSGI_APPLICATION = "website.wsgi.application"

# database configuration
DATABASES_DEFAULT = "postgres://devel:123456@127.0.0.1:5432/evonoveit"
DATABASES = {
    "default": dj_database_url.config(default=DATABASES_DEFAULT),
}
DEFAULT_AUTO_FIELD = "django.db.models.AutoField"

# Cache
CACHES_DEFAULT = "redis://127.0.0.1:6379/1"
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("CACHE_URL", CACHES_DEFAULT),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
        "TIMEOUT": 3600,
    }
}

# internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# static files and media
ASSETS_ROOT = env("DJANGO_ASSETS_ROOT", BASE_DIR)
STATIC_ROOT = os.path.join(ASSETS_ROOT, "static")
MEDIA_ROOT = os.path.join(ASSETS_ROOT, "media")

# using a CDN if available
STATIC_HOST = os.environ.get("DJANGO_STATIC_HOST", "")
MEDIA_HOST = os.environ.get("DJANGO_MEDIA_HOST", "")
STATIC_URL = STATIC_HOST + "/static/"
MEDIA_URL = MEDIA_HOST + "/media/"

# emails
DEFAULT_FROM_EMAIL = env("DJANGO_FROM_EMAIL")

DEFAULT_EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
EMAIL_BACKEND = env("DJANGO_EMAIL_BACKEND", DEFAULT_EMAIL_BACKEND)

# Wagtail settings
WAGTAIL_SITE_NAME = "Evonove"
WAGTAILADMIN_BASE_URL = env("DJANGO_BASE_URL", "http://localhost:8000")
TAGGIT_CASE_INSENSITIVE = True

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "google.cloud.logging.handlers.StructuredLogHandler",
        },
    },
    "loggers": {
        "django.request": {
            "handlers": ["console"],
            "level": env("DJANGO_LOG_LEVEL", "INFO"),
        },
        "website": {
            "handlers": ["console"],
            "level": env("WEBSITE_LOG_LEVEL", "INFO"),
        },
    },
}
