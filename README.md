## Description

Backend for InstruGo, an application for connecting students and tutors.

## NOTE

This repository contains just the backend of InstruGo. To run the frontend go see README.md in the frontend repository.

## Install dependencies

```bash
$ yarn
```

## Run the database locally

Before running the actual application, you will need to run a PostgreSQL instance. The easiest way to do it is to use docker compose like this while in the app root dir:

```bash
$ docker compose up -d
```

## Run the backend

Running the app for the first time will also seed the database with initial data. You can find this data in `src/seed` module. Subsequent runs will not run the seeding service unless you delete all subjects and users from db (not recommended, if you want to reset the db look at the last section "Starting from scratch").

```bash
# development mode
$ yarn start

# development watch mode
$ yarn start:dev

# production mode
$ yarn build
$ yarn start:prod
```

If you don't want to seed the db for some reason, you can set the `SEED_DB` environment variable in `.env` to 0 manually before running the app.

## Starting from scratch

If you contaminated the db or just want to start from scratch with initial seeded data, do it like this:

```bash
$ docker container stop instrugo-database
$ docker container rm instrugo-database
$ docker compose up -d
$ yarn start
```
