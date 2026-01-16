# Evonove website

[evonove.it][1] website, made with [Wagtail][2]!

## Requirements

To run this project you need Docker:

    https://docs.docker.com/get-started/

And `uv`:

    https://docs.astral.sh/uv/getting-started/

And `tox` for testing:

    https://tox.wiki/en/4.25.0/installation.html

## Development

To setup the environment for development, install the dependencies:

    $ uv sync

Then start the services:

    $ docker compose -f docker-services up

or:

    $ make start-services

Initialize the database schema with:

    $ uv run python django-website/manage.py migrate

Initialize the data importing production db with:

    $ make import-production-db

Or creating fake data: (NOT TESTED)

    $ uv run python django-website/manage.py create_pages
    $ uv run python django-website/manage.py load_test_data

Before running the application inspect and change if needed the `.env.local` file,
containing the app configuration. Then apply the configuration:

    $ source .env.local

Or set the `UV_ENV_FILE=.env` variable in `.profile` to make uv apply the configuration for
you before running every command.

Run the local web server:

    $ uv run python django-website/manage.py runserver

Now visit [http://localhost:8000/](http://localhost:8000/) to see the application running.

A frontend to the mailhog smtp service is served at: [http://localhost:8025](http://localhost:8025)

## Running the tests

To run the tests:

    $ tox

# Accessibility checks

To check against WCAG 2.1 accessibility issues we use [Pa11y-ci](https://github.com/pa11y/pa11y-ci).
This tool needs a live server instance running at [http://localhost:8000/](http://localhost:8000/).

To run exclusively the pa11y-ci tox environment use:

    $ tox -e pa11y-ci

To run pa11y-ci against a live server instance during development go to `django-website/frontend`:

    $ corepack enable
    $ yarn install
    $ yarn pa11y-ci

Configuration file can be found at:

    django-website/frontend/.pa11yci

The tests results are saved at repository root level in:

    a11y-results/pa11y.json

If you experience errors or issues related to AppArmor, take a look at [AppArmor User Namespace Restrictions vs. Chromium Developer Builds](https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md).

## Frontend development (NOT TESTED)

The frontend app uses [Webpack](https://webpack.js.org/) as toolchain. To install all dependencies run this command from the `frontend/` folder:

    $ yarn

Then compile all necessary files:

    $ yarn webpack

## Deployment

Deployed in GC kubernetes cluster, check configuration files in:

    https://github.com/evonove/couscous/tree/main/enine-cluster/evonove.it

[1]: https://evonove.it/ "Evonove"
[2]: https://wagtail.io/ "Wagtail"

## Vulnerability Scan

To perform a single scan use :

    $ make trivy
    
This type of scan generatate JSON or HTML report and save the resulting report into     
    
    trivy-results/trivy-{time_of_creation}.html or trivy-results/trivy-{time_of_creation}.json

The trivy scan is also integrated into tox with a text-only output in console, just run the command:

    $ tox

Or launching only trivy scan with:

    $ tox -e trivy

## Static Analysis (SAST)

It possible perform SATS, with Semgrep, launching:

    $ make semgrep

The result will be a JSON formatted report that will be saved in the folder:     

    semgrep-results/semgrep-{time_of_creation}.json

The scan is also integrated into tox with a text-only output in console, just run the command:

    $ tox

Or using the specific UV command to run a local scan without auth into semgrep system:

    $ uv run semgrep scan
