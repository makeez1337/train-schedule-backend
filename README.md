## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```

## Migrations

```bash
# generate migrations

# Description: this script generates migration file,
# which contain database queries and can be run in the future to insert data in the database

# Note: if you dont want to add table in migration,
# dont use "synchronize: true" in entity decorator then!!!

# Warning: don't add property "width" in entity column because
# script "migration:generate" will not work correctly

$ npm run migration:generate -- migrations/NameOfMigration (no need to add extension to the file)

```

```bash
# run migration

# Description: this script run through all migrations files,
# which have not been ran and insert them in database

$ npm run migration:run
```

```bash
# revert migration

# Description: this script revert last ran migration

$ npm run migration:revert

```

