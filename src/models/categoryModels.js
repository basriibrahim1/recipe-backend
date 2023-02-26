const pool = require("../config/db");

const getCategory = () => {
    return pool.query(`
      SELECT category.id, category.name FROM category;
    `);
};

const getCategoryById = (id) => {
    return pool.query(`
    SELECT category.id, category.name FROM category WHERE category.deleted_at IS NULL AND category.id = ${id};
    `);
};

const postCategory = (name) => {
    return pool.query(`
    INSERT INTO category(name) VALUES('${name}');
  `);
};

const categoryQuery = (data) => {
    let { searchBy, search, sortBy, sort } = data;

    return pool.query(
        `SELECT category.name FROM category WHERE category.${searchBy} ILIKE '%${search}%' ORDER BY category.${sortBy} ${sort}`
    );
};

const updateCategory = (name, id) => {
    return pool.query(
        `
    UPDATE category SET name='${name}' WHERE category.id='${id}';`
    );
};

const softDeleteCategory = (id) => {
    const currentTime = new Date().toISOString();
    const query = {
        text: "UPDATE category SET deleted_at = $1 WHERE category.deleted_at IS NULL AND category.id = $2",
        values: [currentTime, id],
    };

    return pool.query(query);
};

module.exports = { getCategory, getCategoryById, postCategory, categoryQuery, updateCategory, softDeleteCategory };
