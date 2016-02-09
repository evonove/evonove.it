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

        # put here your data
        placeholders = [
            {"title": "works", "file": work_placeholder, "w": 725, "h": 725},
            {"title": "team", "file": team_placeholder, "w": 483, "h": 483},
        ]

        services = [
            {"slogan": "A Paper Company", "technologies": "We are the best Paper Company"},
            {"slogan": "Best place where to work", "technologies": "We have the world's best boss"},
            {"slogan": "Based on Scranton, Pennsylvania", "technologies": "We ship everywhere!"},
        ]

        works = [
            {"name": "Selling stuff"},
            {"name": "Merging branches"},
            {"name": "Boat parties"},
        ]

        team = [
            {"firstname": "Ryan", "lastname": "Howard", "role": "Temporary Worker"},
            {"firstname": "Toby", "lastname": "Flenderson", "role": "Human Resources Representative"},
            {"firstname": "Meredith", "lastname": "Palmer", "role": "Supplier Relations Representative"},
            {"firstname": "Kevin", "lastname": "Malone", "role": "Accountant"},
            {"firstname": "Angela", "lastname": "Martin", "role": "Senior Accountant"},
            {"firstname": "Pam", "lastname": "Beesly", "role": "Receptionist"},
            {"firstname": "Stanley", "lastname": "Hudson", "role": "Sales Representative"},
            {"firstname": "Jim", "lastname": "Halpert", "role": "Sales Representative"},
            {"firstname": "Dwight", "lastname": "Schrute", "role": "Assistant to the Regional Manager"},
            {"firstname": "Michael", "lastname": "Scott", "role": "Best boss, Regional Manager"},
        ]

        # add a placeholder image for Works section
        images = {}
        for placeholder in placeholders:
            image, created = Image.objects.get_or_create(
                title=placeholder["title"],
                width=placeholder["w"],
                height=placeholder["h"],
            )

            if created:
                image.file.save(placeholder["title"], placeholder["file"], save=True)

            images[placeholder["title"]] = image

        # add some services
        for service in services:
            Service.objects.get_or_create(
                slogan=service["slogan"],
                technologies=service["technologies"],
                description=lorem,
                page=homepage,
            )

        # add some works
        for work in works:
            Work.objects.get_or_create(
                name=work["name"],
                description=lorem,
                cover=images["works"],
                page=homepage,
            )

        # add some team members
        for employee in team:
            TeamMember.objects.get_or_create(
                firstname=employee["firstname"],
                lastname=employee["lastname"],
                role=employee["role"],
                bio=lorem,
                photo=images["team"],
                website="https://evonove.it",
                github="https://github.com/evonove/",
                page=homepage,
            )
