from django.conf import settings
from django.core.wsgi import get_wsgi_application

from whitenoise import WhiteNoise
from whitenoise.django import DjangoWhiteNoise


# WhiteNoise is used to serve Django statics and
# uploaded media files. In the first case we can improve
# the server performance using a CDN such as CloudFlare
application = WhiteNoise(
    DjangoWhiteNoise(get_wsgi_application()),
    root=settings.MEDIA_ROOT,
    prefix='/media/',
)
