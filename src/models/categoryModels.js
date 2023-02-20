const pool = require("../config/db");

const getCategory = () => {
  return pool.query(`
      SELECT category.title AS category
      FROM category
      ORDER BY category.title DESC;
    `);
};

const getCategoryById = (id) => {
  return pool.query(`
    SELECT category.title AS category
    FROM category 
    WHERE category.deleted_at IS NULL AND category.id = ${id};
    `);
};

const postCategory = (title) => {
  return pool.query(`
    INSERT INTO category(title) VALUES('${title}');
  `);
};

const categoryQuery = (data) => {
  let { searchBy, search, sortBy, sort } = data;

  return pool.query(
    `SELECT category.title FROM category 
  WHERE category.${searchBy} ILIKE '%${search}%' 
  ORDER BY category.${sortBy} ${sort}`
  );
};

const updateCategory = (title, id) => {
  return pool.query(
    `
    UPDATE category SET title='${title.category}' WHERE category.id='${id}';
    `
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
