from django.conf import settings
from django.core.wsgi import get_wsgi_application

from whitenoise.django import DjangoWhiteNoise


# WhiteNoise is used to serve Django statics; to improve
# the Python application performance, configure a proper
# CDN such as CloudFront
application = DjangoWhiteNoise(get_wsgi_application())
