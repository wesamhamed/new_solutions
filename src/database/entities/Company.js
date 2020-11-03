module.exports ={
  createTable(){
    const query=`
    CREATE TABLE IF NOT EXISTS "companies" (
      "id" serial PRIMARY KEY,
      "name" VARCHAR(255) NOT NULL,
      "profileId" INT NOT NULL,
      "addressId" INT NOT NULL,
      FOREIGN KEY ("profileId") REFERENCES "profiles" ("id") ON DELETE CASCADE,
      FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE CASCADE
      );`;

    return query;
  },
  dropTable(){
    const query=`DROP TABLE IF EXISTS "companies" CASCADE;`

    return query;
  }
}