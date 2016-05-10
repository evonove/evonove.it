from .base import *


# security enforcement
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = env('DJANGO_SECURE_SSL_REDIRECT', True)
SESSION_COOKIE_SECURE = env('DJANGO_SESSION_COOKIE_SECURE', True)

# Using WhiteNoise storage backend which automatically takes care of gzipping
# static files, while creating unique names for each version so they can
# safely be cached forever
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

# load media files via S3
DEFAULT_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'
AWS_REGION = 'eu-central-1'
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_S3_BUCKET_NAME = env('AWS_S3_BUCKET_NAME')
# uploads is not authenticated so all files are public
AWS_S3_BUCKET_AUTH = env('AWS_S3_BUCKET_AUTH', False)

# emails
DEFAULT_EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', DEFAULT_EMAIL_BACKEND)
EMAIL_HOST = env("DJANGO_EMAIL_HOST")
EMAIL_PORT = env("DJANGO_EMAIL_HOST_PORT")
EMAIL_HOST_USER = env("DJANGO_EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("DJANGO_EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = env('DJANGO_EMAIL_USE_TLS', True)

# logging
LOGGING['loggers'] = {
    'django': {
        'handlers': ['console', 'syslog'],
        'level': env('DJANGO_LOG_LEVEL', 'INFO'),
    },
    'website': {
        'handlers': ['logstash', 'syslog'],
        'level': env('WEBSITE_LOG_LEVEL', 'INFO'),
    },
}
