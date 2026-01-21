from datetime import date

from agency.models import AgencyPage
from blog.models import BlogPage, Post
from contacts.models import ContactsPage
from django.conf import settings
from django.core.management.base import BaseCommand
from django.db import transaction
from hiring.models import HiringPage
from options.models import WebsiteSettings
from portfolio.models import PortfolioPage
from wagtail.models import Locale, Site

from home.models import HomePage

SITE_DATA = {
    "locale": {
        "language_code": "en",
    },
    "site": {
        "hostname": "localhost",
        "port": 8000,
        "site_name": "Evonove",
    },
    "website_settings": {
        "name": "Evonove",
        "email": "info@example.test",
        "phone": "+0000000000",
        "vat": "GB000000000",
        "address": "<p>Example address</p>",
        "github": "https://github.com/test/",
        "twitter": "https://twitter.com/test",
        "facebook": "https://www.facebook.com/test",
    },
    "homepage": {
        "title": "Homepage",
        "slug": "home",
        "seo_title": "Evonove - Web Development Solutions with Python, Django & Qt",
        "search_description": (
            "We are a software development and web design agency experienced with "
            "Python, Django, Javascript, C++ and Qt | Contact us to learn how we can "
            "help you!"
        ),
        "section_title": "<p>Services</p>",
        "section_subtitle": (
            "<h2>Bring your idea,</h2><h2>we'll handle everything else.</h2>"
        ),
        "linked_data": {
            "@context": "http://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://evonove.it/",
            "name": "Evonove Srl",
            "url": "https://evonove.it/",
            "image": "",
            "telephone": "",
            "address": {},
            "geo": {},
            "sameAs": [
                "https://www.facebook.com/evonovesrl",
                "https://twitter.com/evonove",
                "https://github.com/evonove/",
            ],
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "opens": "09:00",
                "closes": "18:00",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            },
        },
        "payoff": (
            "<p>A skilled team that helps people make\u00a0</p><p>things they've "
            "always wanted to make.</p>"
        ),
        "partner_title": "<p>Clients</p>",
        "partner_subtitle": "<h2>Some of our clients:</h2>",
        "works_title": "<p>Works</p>",
        "works_subtitle": (
            "<h2>We employ the best minds to give you\u00a0</h2>"
            "<h2>the most creative and brilliant solutions.</h2>"
        ),
    },
    "blog": {
        "title": "Blog",
        "slug": "blog",
        "seo_title": "Blog - Evonove",
        "search_description": (
            "Learn the latest news about life at Evonove, the progress of our "
            "Open Source projects and reports from the tech conferences we attend!"
        ),
        "blog_subtitle": "",
    },
    "post": {
        "title": "Django + Jetty + SPDY = blazing fast!!!",
        "slug": "first-post",
        "intro": "SPDY Potentiality to Optimize Loading Times",
        "date": "2012-12-28",
        "cover": None,
        "body": [
            {
                "type": "paragraph",
                "value": (
                    "<p>During November 2009 a new open network protocol called SPDY "
                    "was defined in a first draft; the main goal of this new protocol "
                    "was to reduce the latency during web page loading. "
                    "The achievement of the technical specifications must "
                    "comply with certain requirements: minimize deployment complexity; "
                    "avoid the need of any changes to content by website developers so "
                    "that the only changes required to support SPDY are in the client "
                    "user agent or in the web server application.<br/></p>"
                ),
            },
            {
                "type": "paragraph",
                "value": (
                    "<h2>Who supports SPDY</h2><p>Recently IETF HTTP-bis working group "
                    "has announced that the first draft of HTTP 2.0 is based on SPDY "
                    "protocol drafts. During the evolution of SPDY many of most famous "
                    "web servers implement, as an experimental "
                    "feature, this new protocol. Web servers like Jetty, Apache "
                    "(via mod_spdy), "
                    "node.js and nginx, to name a few.<br/></p>"
                ),
            },
        ],
    },
    "agency": {
        "title": "Agency",
        "slug": "agency",
        "seo_title": "Agency - Evonove Django, Python & Qt Development",
        "search_description": (
            "Evonove is a dynamic team built around expertise and creativity. "
            "We strive to make great things and to bring you the most efficient "
            "software solutions"
        ),
        "section_title": "<p>Bio</p>",
        "section_subtitle": (
            "<h2>Evonove is a dynamic team<br/> built around expertise and "
            "creativity.<br/> "
            "A group of hackers, nerds and dreamers<br/> that strives to create "
            "great things.</h2>"
        ),
        "linked_data": None,
        "description": (
            "<p>The extensive expertise and unique personalities at Evonove shape a "
            "<b>creative and inventive culture</b>. We offer you the best of a wide "
            "range of skills, "
            "bleeding edge technologies and the right agile mindset to create "
            "the best solution for your needs. Test us!</p>"
        ),
        "project": "<h4>Django OAuth Toolkit</h4>",
        "project_description": (
            "<p>Our biggest Open Source project, and our pride and joy. 1000+ stars "
            "and 900+ commits "
            "prove it's been appreciated by the community and we love we were able to "
            "<b>give back</b> to them.</p>"
        ),
        "project_link": "http://dot.evonove.it/",
        "project_category": "<p>Django Open source library</p>",
        "services_title": "<p>Services</p>",
        "services_subtitle": "<h2>Bring your idea,<br/> we'll handle everything else."
        "</h2>",
        "services_contact": (
            "<p>Interested in our services?</p><p>In need of Django developers?</p>"
            "<p>Drop us a line or come grab a coffee at our office!</p>"
        ),
        "expertise_title": "<p>Expertise</p>",
        "expertise_subtitle": (
            "<h2>We love to create efficient, documented and tested code.<br/>"
            "We love to share our knowledge, giving talks at tech conferences.<br/>"
            "We love to give back, developing Open Source technology.</h2>"
        ),
        "expertise_description": "",
        "stack_subtitle": "<h2>Our stack</h2>",
        "stack_description": (
            "<p>To thrive in this fast-paced tech world, it's necessary to understand "
            "all the tools "
            "available to us and choose <b>the right one for the job</b>. You wouldn't "
            "build a shed "
            "with only a hammer and we won't either.</p>"
        ),
        "team_title": "<p>Team</p>",
        "team_subtitle": "<h2>The Team</h2>",
        "image": None,
    },
    "contacts": {
        "title": "Contacts",
        "slug": "contacts",
        "seo_title": "Contacts - Evonove Django, Python & Qt Development",
        "search_description": (
            "Are you interested in learning how the latest technologies can help "
            "your business? "
            "Do you want to develop that idea you have in mind? Contact us!"
        ),
        "section_title": "<p>Contacts</p>",
        "section_subtitle": "",
        "linked_data": None,
        "job_email": "jobs@example.test",
    },
    "portfolio": {
        "title": "Portfolio",
        "slug": "portfolio",
        "seo_title": "Portfolio - Evonove Django, Python & Qt Development",
        "search_description": (
            "We love to work on challenging projects and no matter the complexity "
            "of your idea, we can make it happen. Explore how our software helps "
            "our clients"
        ),
        "section_title": "<p>Portfolio</p>",
        "section_subtitle": (
            "<h2>We employ the best minds to give you\u00a0</h2>"
            "<h2>the most creative and brilliant solutions.</h2>"
        ),
        "linked_data": None,
    },
    "hiring": {
        "title": "Careers",
        "slug": "careers",
        "seo_title": "We are hiring - Evonove Django, Python & Qt Development",
        "search_description": (
            "We are looking for talented Python, Qt and Django developers with "
            "an agile mentality "
            "and a deep love for technology. See our open positions, join us!"
        ),
        "section_title": "<p>Careers</p>",
        "section_subtitle": "<h2>We are hiring!</h2>",
        "linked_data": None,
        "intro": (
            "<p>Hi,</p><p>We are Evonove, a young and agile company based in the green "
            "heart of Italy, "
            "<b>with a global mindset and a deep love for technology</b>. "
            "We partner with clients to "
            "build user-centric IT solutions, delivering quality software "
            "by writing tested, "
            "documented and elegant code.<br/></p><p>Check out our open positions:</p>"
        ),
        "outro": (
            "<p>Or, if you have something to propose to us, "
            "feel free to write us an email. "
            "<b>We are always on the lookout for talent</b>.</p>"
        ),
    },
}


class Command(BaseCommand):
    help = "Populate dev env db with initial data."

    def _create_child(self, parent, page):
        existing = parent.get_children().filter(slug=page.slug).first()
        if existing:
            return existing.specific
        parent.add_child(instance=page)
        return page

    @transaction.atomic
    def handle(self, *args, **options):
        if not settings.DEBUG:
            self.stdout.write("SKIPPING: DEBUG is False.")
            return

        site_data = SITE_DATA

        locale_code = site_data["locale"]["language_code"]
        locale, _ = Locale.objects.get_or_create(language_code=locale_code)

        homepage_data = site_data["homepage"]
        homepage = HomePage.objects.filter(slug=homepage_data["slug"]).first()

        homepage.title = homepage_data["title"]
        homepage.draft_title = homepage_data["title"]
        homepage.seo_title = homepage_data["seo_title"]
        homepage.search_description = homepage_data["search_description"]
        homepage.section_title = homepage_data["section_title"]
        homepage.section_subtitle = homepage_data["section_subtitle"]
        homepage.linked_data = homepage_data["linked_data"]
        homepage.payoff = homepage_data["payoff"]
        homepage.partner_title = homepage_data["partner_title"]
        homepage.partner_subtitle = homepage_data["partner_subtitle"]
        homepage.works_title = homepage_data["works_title"]
        homepage.works_subtitle = homepage_data["works_subtitle"]
        homepage.locale = locale
        homepage.save()

        if homepage.get_children().exists():
            self.stdout.write(self.style.ERROR("SKIPPING: DB already initialized."))
            return

        site_cfg = site_data["site"]
        site = Site.objects.filter(is_default_site=True).first()
        site.hostname = site_cfg["hostname"]
        site.port = site_cfg["port"]
        site.site_name = site_cfg["site_name"]
        site.root_page = homepage
        site.is_default_site = True
        site.save()

        ws = site_data["website_settings"]
        WebsiteSettings.objects.update_or_create(site=site, defaults=ws)

        blog_data = dict(site_data["blog"])
        blog = self._create_child(homepage, BlogPage(**blog_data))

        post_data = dict(site_data["post"])
        post_data["date"] = date.fromisoformat(post_data["date"])
        post_data["body"] = [
            (block["type"], block.get("value"))
            for block in post_data["body"]
            if isinstance(block, dict)
        ]
        self._create_child(blog, Post(**post_data))

        self._create_child(homepage, AgencyPage(**dict(site_data["agency"])))
        self._create_child(homepage, ContactsPage(**dict(site_data["contacts"])))
        self._create_child(homepage, PortfolioPage(**dict(site_data["portfolio"])))
        self._create_child(homepage, HiringPage(**dict(site_data["hiring"])))

        self.stdout.write(self.style.SUCCESS("Successfully populated site."))
