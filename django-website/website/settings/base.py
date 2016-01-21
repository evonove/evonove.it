import os
import dj_database_url

from getenv import env


# django-website is the root folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.join(BASE_DIR, '..')

# security
SECRET_KEY = env('SECRET_KEY')

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ALLOWED_HOSTS = [
    env("DJANGO_ALLOWED_HOSTS"),
]

DEBUG = env('DJANGO_DEBUG', False)

# apps and middleware
INSTALLED_APPS = (
    'wagtail.contrib.wagtailsitemaps',
    'wagtail.wagtailredirects',
    'wagtail.wagtailsites',
    'wagtail.wagtailusers',
    'wagtail.wagtailimages',
    'wagtail.wagtailadmin',
    'wagtail.wagtailcore',
    'wagtail.contrib.settings',

    'modelcluster',
    'compressor',
    'taggit',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'options',
    'home',
    'blog',
    'wheelie',
)

MIDDLEWARE_CLASSES = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',

    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'website.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'wagtail.contrib.settings.context_processors.settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'website.wsgi.application'

# database configuration
DATABASES_DEFAULT = "postgres://devel:123456@127.0.0.1:5432/evonoveit"
DATABASES = {
    'default': dj_database_url.config(default=DATABASES_DEFAULT),
}

# Cache
CACHES_DEFAULT = "redis://127.0.0.1:6379/1"
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("CACHE_URL", CACHES_DEFAULT),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
        'TIMEOUT': 3600
    }
}

# internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# static files and media
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
]

ASSETS_ROOT = env("DJANGO_ASSETS_ROOT", BASE_DIR)

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(ASSETS_ROOT, 'static')
MEDIA_ROOT = os.path.join(ASSETS_ROOT, 'media')

# emails
DEFAULT_FROM_EMAIL = env('DJANGO_FROM_EMAIL')

EMAIL_BACKEND_DEFAULT = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', EMAIL_BACKEND_DEFAULT)

# logging
LOGSTASH_HOST = env("LOGSTASH_HOST", "127.0.0.1")
LOGSTASH_PORT = env("LOGSTASH_PORT", 5000)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(name)s [%(process)d] %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(name)s %(message)s'
        },
        'syslog': {
            'format': '%(levelname)s %(name)s [%(process)d] %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'syslog': {
            'class': 'logging.handlers.SysLogHandler',
            'formatter': 'syslog',
        },
        'logstash': {
            'class': 'logstash.LogstashHandler',
            'host': LOGSTASH_HOST,
            'port': LOGSTASH_PORT,
            'version': 1,
            'message_type': 'website',
        },
    },
}

# Wagtail settings
WAGTAIL_SITE_NAME = "Evonove"
TAGGIT_CASE_INSENSITIVE = True
COMPRESS_OFFLINE = True
