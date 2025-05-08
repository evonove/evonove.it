import os

from getenv import env

# django-website is the root folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# security
SECRET_KEY = env("SECRET_KEY", "1234567890")

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

DEBUG = env("DJANGO_DEBUG", True)

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
    "wagtail.contrib.forms",
    "wagtail.contrib.redirects",
    "wagtail.embeds",
    "wagtail.sites",
    "wagtail.users",
    "wagtail.snippets",
    "wagtail.documents",
    "wagtail.images",
    "wagtail.search",
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
    "raven.contrib.django.raven_compat",
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
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "wagtail.contrib.settings.context_processors.settings",
            ],
            "loaders": [
                (
                    "django.template.loaders.cached.Loader",
                    [
                        "django.template.loaders.filesystem.Loader",
                        "django.template.loaders.app_directories.Loader",
                    ],
                ),
            ],
        },
    },
]

WSGI_APPLICATION = "website.wsgi.application"

# database configuration
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("POSTGRES_DB", "evonoveit"),
        "USER": env("POSTGRES_USER", "devel"),
        "PASSWORD": env("POSTGRES_PASSWORD", "123456"),
        "HOST": env("POSTGRES_HOST", "127.0.0.1"),
        "PORT": env("POSTGRES_PORT", "5432"),
    }
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
DEFAULT_EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_BACKEND = env("DJANGO_EMAIL_BACKEND", DEFAULT_EMAIL_BACKEND)
EMAIL_HOST = env("DJANGO_EMAIL_HOST", "localhost")
EMAIL_PORT = env("DJANGO_EMAIL_PORT", "1025")
EMAIL_HOST_USER = env("DJANGO_EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = env("DJANGO_EMAIL_HOST_PASSWORD", "")
EMAIL_USE_TLS = env("DJANGO_EMAIL_USE_TLS", True)
DEFAULT_FROM_EMAIL = env("DJANGO_FROM_EMAIL", "Evonove <info@evonove.it>")

# Wagtail settings
WAGTAIL_SITE_NAME = "Evonove"
WAGTAILADMIN_BASE_URL = env("DJANGO_BASE_URL", "http://localhost:8000")
TAGGIT_CASE_INSENSITIVE = True
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10_000

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

# security enforcement
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_SSL_REDIRECT = env("DJANGO_SECURE_SSL_REDIRECT", False)
SESSION_COOKIE_SECURE = env("DJANGO_SESSION_COOKIE_SECURE", False)

S3_ENABLED = env("DJANGO_S3_ENABLED", False)
STORAGES = {
    "default": {
        "BACKEND": "django_s3_storage.storage.S3Storage"
        if S3_ENABLED
        else "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

if S3_ENABLED:
    AWS_REGION = env("AWS_REGION", "eu-central-1")
    AWS_ACCESS_KEY_ID = env("AWS_ACCESS_KEY_ID", "")
    AWS_SECRET_ACCESS_KEY = env("AWS_SECRET_ACCESS_KEY", "")
    AWS_S3_BUCKET_NAME = env("AWS_S3_BUCKET_NAME", "evonove.it")
    AWS_S3_MAX_AGE_SECONDS = 60 * 60 * 24 * 60
    # uploads is not authenticated so all files are public
    AWS_S3_BUCKET_AUTH = env("AWS_S3_BUCKET_AUTH", False)

# monitoring
RAVEN_CONFIG = {
    "dsn": env("SENTRY_DSN"),
}
