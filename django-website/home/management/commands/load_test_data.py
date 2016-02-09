import os

from django.db import transaction
from django.conf import settings
from django.core.files import File
from django.core.management.base import BaseCommand, CommandError

from wagtail.wagtailcore.models import Site
from wagtail.wagtailimages.models import Image

from options.models import WebsiteSettings

from home.models import HomePage, Service, Work, TeamMember


class Command(BaseCommand):
    help = "Add some fake data to populate the home page; useful for new developers"

    @transaction.atomic
    def handle(self, *args, **options):
        # getting the home page
        try:
            homepage = HomePage.objects.get(slug="home")
            current_site = Site.objects.get(root_page=homepage)
        except HomePage.DoesNotExist:
            raise CommandError("The Homepage does not exist. Be sure to run the first migration.")
        except Site.DoesNotExist:
            raise CommandError("The Homepage is not bound to the main site. Be sure to run the first migration.")

        # some useful helpers
        lorem = """Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis semper nisi. Nulla facilisi.
        Integer congue dictum arcu,  at pulvinar felis tincidunt ac. Sed ultrices  dictum elit, in aliquet mauris
        vulputate sit  amet. Nulla condimentum consectetur volutpat.  Nunc dapibus ante vitae feugiat dignissim."""

        media_path = os.path.join(settings.BASE_DIR, "tests", "assets")
        work_placeholder = File(open(os.path.join(media_path, "works-placeholder.png"), "rb"))
        team_placeholder = File(open(os.path.join(media_path, "man-silhouette.png"), "rb"))

        # add company fake data
        website_settings = WebsiteSettings.for_site(current_site)
        website_settings.name = "Dunder Mifflin Inc."
        website_settings.email = "sales@dundermifflin.com"
        website_settings.phone = "+1-202-555-0177"
        website_settings.vat = "not applicable"
        website_settings.github = "https://github.com/evonove/"
        website_settings.twitter = "http://twitter.com/evonove"
        website_settings.facebook = "http://www.facebook.com/evonovesrl"
        website_settings.save()

        # add a placeholder image for Works section
        work_image, created = Image.objects.get_or_create(
            title="Placeholder",
            width=725,
            height=725,
        )

        if created:
            work_image.file.save("works-placeholder.png", work_placeholder, save=True)

        # add a placeholder image for Team section
        team_image, created = Image.objects.get_or_create(
            title="Placeholder team",
            width=483,
            height=483,
        )

        if created:
            team_image.file.save("man-silhouette.png", team_placeholder, save=True)

        # add some services
        Service.objects.get_or_create(
            slogan="A Paper Company",
            technologies="We are the best Paper Company",
            description=lorem,
            page=homepage,
        )

        Service.objects.get_or_create(
            slogan="Best place where to work",
            technologies="We have the world's best boss",
            description=lorem,
            page=homepage,
        )

        Service.objects.get_or_create(
            slogan="Based on Scranton, Pennsylvania",
            technologies="We ship everywhere!",
            description=lorem,
            page=homepage,
        )

        # add some works
        Work.objects.get_or_create(
            name="Selling stuff",
            description=lorem,
            cover=work_image,
            page=homepage,
        )

        Work.objects.get_or_create(
            name="Merging branches",
            description=lorem,
            cover=work_image,
            page=homepage,
        )

        Work.objects.get_or_create(
            name="Boat parties",
            description=lorem,
            cover=work_image,
            page=homepage,
        )

        # add some team members
        TeamMember.objects.get_or_create(
            firstname="Ryan",
            lastname="Howard",
            role="Temporary Worker",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Toby",
            lastname="Flenderson",
            role="Human Resources Representative",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Meredith",
            lastname="Palmer",
            role="Supplier Relations Representative",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Kevin",
            lastname="Malone",
            role="Accountant",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Angela",
            lastname="Martin",
            role="Senior Accountant",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Pam",
            lastname="Beesly",
            role="Receptionist",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Stanley",
            lastname="Hudson",
            role="Sales Representative",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Jim",
            lastname="Halpert",
            role="Sales Representative",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Dwight",
            lastname="Schrute",
            role="Assistant to the Regional Manager",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )

        TeamMember.objects.get_or_create(
            firstname="Michael",
            lastname="Scott",
            role="Best boss, Regional Manager",
            bio=lorem,
            photo=team_image,
            website="https://evonove.it",
            github="https://github.com/evonove/",
            page=homepage,
        )
