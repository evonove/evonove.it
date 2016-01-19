from .base import *


DEBUG = True

for template_engine in TEMPLATES:
    template_engine['OPTIONS']['debug'] = True

SECRET_KEY = 'l5d6!42z#i)s2lhfz9v6i=z2513$a1sd2fn1oakb=(c%jof^j&'
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
