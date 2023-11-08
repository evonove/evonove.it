from .base import *  # noqa
from .base import LOGGING, env

# removing security enforcement in development mode
DEBUG = True
SECRET_KEY = env("SECRET_KEY", "1234567890")

# enabling console loggers
LOGGING["loggers"] = {
    "django": {
        "handlers": ["console"],
        "level": env("DJANGO_LOG_LEVEL", "INFO"),
    },
    "website": {
        "handlers": ["console"],
        "level": env("WEBSITE_LOG_LEVEL", "DEBUG"),
    },
}
