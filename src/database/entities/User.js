module.exports ={
  createTable(){
    const query=`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY,
      "firstName" VARCHAR(255) NOT NULL,
      "lastName" VARCHAR(255) NOT NULL,
      "email" VARCHAR(255) UNIQUE NOT NULL,
      "password"  VARCHAR (255) NOT NULL
      );`;

    return query;
  },
  dropTable(){
    const query=`DROP TABLE IF EXISTS "users" CASCADE;`

    return query;
  }
}