module.exports ={
  createTable(){
    const query=`
    CREATE TABLE IF NOT EXISTS "cities" (
      "id" serial PRIMARY KEY,
      "name" VARCHAR(255) NOT NULL
      );`;

    return query;
  },
  dropTable(){
    const query=`DROP TABLE IF EXISTS "cities" CASCADE;`

    return query;
  }
}