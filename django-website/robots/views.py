from django.views.generic import TemplateView


class RobotsView(TemplateView):
    content_type = 'text/plain'
    template_name = 'robots.txt'
