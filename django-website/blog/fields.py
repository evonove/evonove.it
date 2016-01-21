from django.forms import ChoiceField
from django.utils.translation import ugettext as _

from wagtail.wagtailcore.blocks import StructBlock, StreamBlock, CharBlock, RichTextBlock, TextBlock, FieldBlock
from wagtail.wagtailimages.blocks import ImageChooserBlock


class ImageFormatBlock(FieldBlock):
    FORMAT_CHOICES = (
        ('article-left', 'Wrap left'),
        ('article-right', 'Wrap right'),
        ('article-middle', 'Place in the center'),
        ('article-full', 'Full width'),
    )

    field = ChoiceField(choices=FORMAT_CHOICES)


class ImageBlock(StructBlock):
    image = ImageChooserBlock()
    alignment = ImageFormatBlock()
    caption = RichTextBlock(required=False)


class PullQuoteBlock(StructBlock):
    quote = TextBlock(label=_("Quote title"))
    attribution = CharBlock()


class BlogPageStreamBlock(StreamBlock):
    """
    Defines
    """
    h2 = CharBlock(icon="title")
    h3 = CharBlock(icon="title")
    paragraph = RichTextBlock(icon="pilcrow")
    aligned_image = ImageBlock(label=_("Aligned image"), icon="image")
    pullquote = PullQuoteBlock(icon="openquote")
