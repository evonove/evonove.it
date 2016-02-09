from django.forms import ChoiceField
from django.utils.translation import ugettext as _

from wagtail.wagtailcore.blocks import StructBlock, StreamBlock, CharBlock, RichTextBlock, TextBlock, FieldBlock
from wagtail.wagtailimages.blocks import ImageChooserBlock


class ImageFormatBlock(FieldBlock):
    """
    The Image stream field accepts an ``alignment`` parameter that adds
    a class to the resulting image. This allows editors to place the image
    in different ways, according to the built-in CSS style.
    """
    FORMAT_CHOICES = (
        ('article-left', _('Wrap left')),
        ('article-right', _('Wrap right')),
        ('article-middle', _('Place in the center')),
        ('article-full', _('Full width')),
    )

    field = ChoiceField(choices=FORMAT_CHOICES)


class ImageBlock(StructBlock):
    """
    The ``aligned_image`` block, used to add an image into the ``BlogPage``
    """
    image = ImageChooserBlock()
    alignment = ImageFormatBlock()
    caption = RichTextBlock(required=False)


class PullQuoteBlock(StructBlock):
    """
    A block that adds a quote with the proper attribution
    """
    quote = TextBlock(label=_("Quote title"))
    attribution = CharBlock()


class PostStreamBlock(StreamBlock):
    """
    Defines the ``StreamBlock`` used in the ``BlogPage`` model. This adds a
    dynamic behavior when writing the body of a new blog page. It includes:
        - h2 and h2 titles
        - a paragraph
        - an image that could be aligned on the left, on the right, in the center
          or with a full width
        - a quote with a proper attribution
    """
    h2 = CharBlock(icon="title")
    h3 = CharBlock(icon="title")
    paragraph = RichTextBlock(icon="pilcrow")
    aligned_image = ImageBlock(label=_("Aligned image"), icon="image")
    pullquote = PullQuoteBlock(icon="openquote")
