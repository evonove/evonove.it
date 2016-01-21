from django import template


register = template.Library()


@register.simple_tag(takes_context=True)
def replace_query_link(context, field, value):
    """
    """
    # cloning request
    request = context['request']
    querystring = request.GET.copy()

    # changing the field returning the url econding
    querystring[field] = value
    return "?{}".format(querystring.urlencode())
