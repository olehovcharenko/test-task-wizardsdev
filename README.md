
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
 Facilitates fast retrieval of specific city records by their unique IDs, enhancing search speed and overall database performance.  
  "CREATE INDEX idx_cities_id ON cities(id);"
  
 Optimizes queries involving relationships between tables by improving searches for residents based on their associated city, reducing search times and enhancing database efficiency.
  "CREATE INDEX idx_residents_city_id ON residents(city_id);"
  
 Accelerates queries by enabling efficient filtering and sorting of residents based on both their associated city (city_id) and first name (first_name). 
 This compound index enhances performance when searching for residents within specific cities and further refining the results by their first names. 
 By combining these fields into one index, database queries that involve filtering and sorting by city and first name will be significantly faster, leading to improved overall system responsiveness.
  "CREATE INDEX idx_residents_city_id_first_name ON residents(city_id, first_name);"

 This index speeds up operations related to searching for residents by their names.
 It can also improve the performance of queries related to sorting or grouping by resident names.
  "CREATE INDEX idx_residents_first_name ON residents(first_name);"

 This compound index is designed to optimize searches and queries involving both the city name (name) and the first name of residents (first_name).
 By combining these fields into a single index, database operations that require filtering, sorting, or grouping by both city names and resident first names will experience improved performance.
 This index is particularly valuable for queries that involve complex search conditions or involve multiple criteria based on city and resident names.
 It accelerates operations that match cities with residents based on these specific attributes, ensuring faster response times for relevant database searches.
  "CREATE INDEX idx_cities_name_first_name ON cities(name, first_name);"

 The idx_cities_name_trgm index in the cities table uses trigram operators to create a reverse index for the name column.
 Trigram indexes split each row into sets of three characters (trigrams) and index these sets to speed up search and filter operations.
  "CREATE INDEX idx_cities_name_trigram ON cities USING gin (name gin_trgm_ops);"
```


