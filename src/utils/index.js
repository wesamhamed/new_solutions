const { hashPassword, comparePassword } = require("./password.js");

const getInsertStringFromData = (data, initialIndex = 0) => {
    const columns = Object.keys(data);
    const columnsString = columns.map((col) => `"${col}"`).join(', ');
    const valuesString = columns
        .map((_, index) => `$${index + 1 + initialIndex}`)
        .join(', ');

    return `(${columnsString}) VALUES(${valuesString})`;
};

const getUpdateStringFromData = (data, initialIndex = 0) => {
    const columns = Object.keys(data);
    return columns
        .map((col, index) => `"${col}" = ($${index + 1 + initialIndex})`)
        .join(', ');
};

module.exports = {
    getInsertStringFromData,
    getUpdateStringFromData,
    hashPassword,
    comparePassword
};