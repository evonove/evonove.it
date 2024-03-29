from django.forms import ChoiceField
from django.utils.safestring import mark_safe
from django.utils.translation import gettext as _
from pygments import highlight
from pygments.formatters import get_formatter_by_name
from pygments.lexers import get_lexer_by_name
from wagtail.blocks import (
    CharBlock,
    ChoiceBlock,
    FieldBlock,
    RichTextBlock,
    StreamBlock,
    StructBlock,
    TextBlock,
)
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.blocks import ImageChooserBlock


class ImageFormatBlock(FieldBlock):
    """
    The Image stream field accepts an ``alignment`` parameter that adds
    a class to the resulting image. This allows editors to place the image
    in different ways, according to the built-in CSS style.
    """

    FORMAT_CHOICES = (
        ("article-left", _("Wrap left")),
        ("article-right", _("Wrap right")),
        ("article-middle", _("Place in the center")),
        ("article-full", _("Full width")),
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


class CodeBlock(StructBlock):
    """
    Code Highlighting Block
    """

    LANGUAGE_CHOICES = (
        ("python", "Python"),
        ("cpp", "C++"),
        ("html", "HTML"),
        ("css", "CSS"),
    )

    language = ChoiceBlock(choices=LANGUAGE_CHOICES)
    code_text = TextBlock()

    def render(self, value):
        src = value["code_text"].strip("\n")
        lang = value["language"]

        lexer = get_lexer_by_name(lang)
        formatter = get_formatter_by_name(
            "html", linenos="table", noclasses=True, style="monokai"
        )
        return mark_safe(highlight(src, lexer, formatter))


class PostStreamBlock(StreamBlock):
    """
    Defines the ``StreamBlock`` used in the ``BlogPage`` model. This adds a
    dynamic behavior when writing the body of a new blog page. It includes:
        - h2 and h2 titles
        - a paragraph
        - an image that could be aligned on the left, on the right, in the center
          or with a full width
        - a YouTube embedded iframe
        - a quote with a proper attribution
    """

    h2 = CharBlock(icon="title")
    h3 = CharBlock(icon="title")
    paragraph = RichTextBlock(icon="pilcrow")
    aligned_image = ImageBlock(label=_("Aligned image"), icon="image")
    youtube = EmbedBlock(icon="image")
    pullquote = PullQuoteBlock(icon="openquote")
    code_snippet = CodeBlock(label=_("Code Snippet"), icon="code")
