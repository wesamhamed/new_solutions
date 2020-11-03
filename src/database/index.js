/**
 * database folder interface
 */

require('dotenv').config();
const { Pool } = require('pg');
const envConfig = require('./config');
const { getInsertStringFromData, getUpdateStringFromData } = require('../utils');

/**
 * database tables
 */
const { User, Address, Profile, Company, City, Country } = require('./entities');

/**
 * get the appropriate database URL (connectionString) based on the node environment (test, dev, prod)
 */
const env = process.env.NODE_ENV || 'development';
const connectionString = envConfig[env].connectionString;
const pool = new Pool({ connectionString });

pool.on('connect', () => {
    if (process.env.NODE_ENV === 'development')
        console.log('connected to the database');
});

pool.on('error', (err, client) => {
    if (process.env.NODE_ENV === 'development') console.error('Error:', err);
});

pool.on('remove', () => {
    if (process.env.NODE_ENV === 'development') console.log('client removed');
});

/**
 * create all database tables in sequence of their relations
 */
const createAllTables = async() => {
    const query = `
    ${City.createTable()}
    ${Country.createTable()}
    ${Address.createTable()}
    ${User.createTable()}
    ${Profile.createTable()}
    ${Company.createTable()}
    
  `;

    await pool.query(query);
};
const createAllTablesScript = async() => {
    await createAllTables();
    await end();
};
/**
 * drop all database tables in sequence of their relations
 */
const dropAllTables = async() => {
    const query = `
    ${City.dropTable()}
    ${Country.dropTable()}
    ${Address.dropTable()}
    ${User.dropTable()}
    ${Profile.dropTable()}
    ${Company.dropTable()}
  `;

    await pool.query(query);
};

const dropAllTablesScript = async() => {
    await dropAllTables();
    await end();
};

/**
 * inset a data into a table in the database
 * the data object keys must match their respective column name in the table
 * the data object values must match the datatype of their respective column datatype
 * @param {string} tableName - table name to insert the data in
 * @param {Object} data - data object to insert it into the table
 * @param {string} outputExpression - an SQL output expression to append to the insert query
 * @returns {Promise<QueryResult<any>>}
 */
const insert = async(tableName, data, outputExpression) => {
    const insertString = getInsertStringFromData(data);

    let insertQuery = `INSERT INTO "${tableName}" ${insertString}`;

    insertQuery += outputExpression ? ` ${outputExpression};` : ';';

    const query = {
        text: insertQuery,
        values: Object.values(data),
    };
    if (process.env.NODE_ENV === 'development')
        console.log('insert -> query', query);

    return pool.query(query);
};


/**
 * read data from a table
 * the columns could be a single column name or an arry of column names to select from the table
 * @param {string | string[]} columns - column name or array of columns names
 * @param {string} tableName - table name to select the data from
 * @param {string} clause - an SQL clause or condition to append to the SQL query statement
 * @returns {Promise<QueryResult<any>>}
 */
const select = async(columns, tableName, clause) => {
    const columnsString =
        typeof columns === 'string' ?
        columns :
        columns.map((col) => `"${col}"`).join(', ');

    let selectQuery = `SELECT ${columnsString} FROM "${tableName}"`;

    selectQuery += clause ? ` ${clause};` : ';';

    if (process.env.NODE_ENV === 'development')
        console.log('select -> selectQuery', selectQuery);

    return pool.query(selectQuery);
};
/**
 * update data in a table in the database
 * the data object keys must match their respective column name in the table
 * the data object values must match the datatype of their respective column datatype
 * @param {string} tableName - table name to update the data from
 * @param {Object} data - data object to be updated in the table
 * @param {string} clause - an SQL clause or condition to append to the SQL query statement
 * @returns {Promise<QueryResult<any>>}
 */
const update = async(tableName, data, clause) => {
    const updateString = getUpdateStringFromData(data);

    let updateQuery = `UPDATE "${tableName}" SET ${updateString}`;
    updateQuery += clause ? ` ${clause};` : ';';

    const query = {
        text: updateQuery,
        values: Object.values(data),
    };
    if (process.env.NODE_ENV === 'development')
        console.log('update -> query', query);

    return pool.query(query);
};
/**
 * remove data from a table
 * the columns could be a single column name or an arry of column names to select from the table
 * @param {string} tableName - table name to select the data from
 * @param {string} clause - an SQL clause or condition to append to the SQL query statement
 * @returns {Promise<QueryResult<any>>}
 */
const remove = async(tableName, clause) => {

    let deleteQuery = `DELETE FROM "${tableName}"`;

    deleteQuery += clause ? ` ${clause};` : ';';

    if (process.env.NODE_ENV === 'development')
        console.log('delete -> deleteQuery', deleteQuery);

    return pool.query(deleteQuery);
};
const query = async(query) => {
    return pool.query(query);
};
/**
 * end the pool connection to the database
 * @returns {Promise<void>}
 */
const end = async() => {
    return pool.end();
};

/**
 * @constant DATABASE
 */
module.exports = {
    createAllTablesScript,
    dropAllTablesScript,
    createAllTables,
    dropAllTables,
    insert,
    select,
    update,
    remove,
    query,
    end,
};

require('make-runnable');