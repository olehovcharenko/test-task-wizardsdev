
## Installation

```bash
$ npm install
```

## Swagger

```bash
 http://localhost:3000/api
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
## Description of indices used

```bash
  This index will speed up the operations of searching for a city by its name.
  Indexes improve query performance by making searches on a specified column faster.

  "CREATE INDEX idx_cities_name ON cities(name);"


  This index speeds up operations related to searching for residents in a particular city (by city_id).
  Since the foreign key links the "residents" table to "cities", creating an index on the column that is the foreign key will improve the performance of queries related to this linkage.

  "CREATE INDEX idx_residents_city_id ON residents(city_id);"


  This index speeds up operations related to searching for residents by their names.
  It can also improve the performance of queries related to sorting or grouping by resident names.

  "CREATE INDEX idx_residents_first_name ON residents(first_name);"


   The idx_cities_name_trgm index in the cities table uses trigram operators to create a reverse index for the name column.
   Trigram indexes split each row into sets of three characters (trigrams) and index these sets to speed up search and filter operations.

  "CREATE INDEX idx_cities_name_trigram ON cities USING gin (name gin_trgm_ops);"
```


