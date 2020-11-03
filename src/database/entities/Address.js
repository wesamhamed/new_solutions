module.exports ={
  createTable(){
    const query=`
    CREATE TABLE IF NOT EXISTS "addresses" (
      "id" serial PRIMARY KEY,
      "cityId" INT NOT NULL,
      "counteryId" INT NOT NULL,
      FOREIGN KEY ("cityId") REFERENCES "cities" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("counteryId") REFERENCES "countries" ("id") ON DELETE CASCADE
      );`;

    return query;
  },
  dropTable(){
    const query=`DROP TABLE IF EXISTS "addresses" CASCADE;`

    return query;
  }
}