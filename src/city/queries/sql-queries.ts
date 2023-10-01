export const queries = {
  getCityMembersCount:
    'SELECT c.name AS city, COUNT(r.id) AS count FROM cities c JOIN residents r ON r.city_id = c.id GROUP BY c.name ORDER BY count DESC',

  getMembersWithSameFirstName:
    'SELECT c.name AS city, r.first_name, COUNT(r.id) AS count FROM cities c JOIN residents r ON r.city_id = c.id GROUP BY c.name, r.first_name',

  getFilteredCities: (partialName: string) =>
    `SELECT * FROM cities WHERE name ILIKE '%${partialName}%'`,
};
