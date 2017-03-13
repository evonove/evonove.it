from django.core.wsgi import get_wsgi_application


# WhiteNoise is used to serve Django statics; to improve
# the Python application performance, configure a proper
# CDN such as CloudFront
application = get_wsgi_application()
