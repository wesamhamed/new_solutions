module.exports ={
  createTable(){
    const query=`
    CREATE TABLE IF NOT EXISTS "profiles" (
      "id" serial PRIMARY KEY,
      "userName" VARCHAR(255) UNIQUE NOT NULL,
      FOREIGN KEY ("id") REFERENCES "users" ("id")
      );`;

    return query;
  },
  dropTable(){
    const query=`DROP TABLE IF EXISTS "profiles" CASCADE;`

    return query;
  }
}