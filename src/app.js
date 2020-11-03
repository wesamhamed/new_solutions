const express = require("express");
const indexRouter =require("./routes/index.js");
const profilesRouter =require("./routes/profiles.js");
const companiesRouter =require("./routes/companies.js");
const addressesRouter =require("./routes/addresses.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", indexRouter);
app.use("/api/v1/profiles",profilesRouter);
app.use("/api/v1/companies",companiesRouter);
app.use("/api/v1/addresses",addressesRouter);

module.exports = app;