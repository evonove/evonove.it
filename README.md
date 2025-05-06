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
