const pool = require("../config/db");

const selectUser = () => {
  return pool.query(`SELECT users.name as creator, food_recipes.title FROM users JOIN food_recipes ON users.id = food_recipes.users_id WHERE users.deleted_at IS NULL ORDER BY users.name DESC`);
};

const insertUser = (data) => {
  return pool.query(`INSERT INTO users(name) VALUES('${data}')`);
};

const checkUserById = (by, data) => {
  return pool.query(`SELECT users.name as creator, food_recipes.title 
  FROM users
  INNER JOIN food_recipes ON users.id = food_recipes.users_id 
  WHERE users.${by} = ${data}
  AND users.deleted_at IS NULL;`);
};

const checkDataByName = (by, data) => {
  return pool.query(`SELECT * FROM users WHERE users.deleted_at IS NULL AND users.${by} = '${data}'`);
};

const userQuery = (data) => {
  let { searchBy, search, sortBy, sort, offset, limit } = data;
  return pool.query(`
    SELECT 
        users.name AS user_name,
        food_recipes.title,
        category.title AS category_title
    FROM 
        users
    JOIN 
        food_recipes ON users.id = food_recipes.users_id AND food_recipes.deleted_at IS NULL
    JOIN 
        category ON food_recipes.category_id = category.id
    WHERE 
        users.deleted_at IS NULL AND users.${searchBy} ILIKE '%${search}%'
    ORDER BY 
        users.${sortBy} ${sort} 
    OFFSET 
        ${offset}
    LIMIT 
        ${limit};
        
    `);
};

const updateUser = (id, data) => {
  return pool.query(`UPDATE users SET name='${data}'WHERE users.deleted_at IS NULL AND users.id='${id}';`);
};

const deleteUser = (id) => {
  const currentTime = new Date().toISOString();
  const query = {
    text: "UPDATE users SET deleted_at = $1 WHERE users.deleted_at IS NULL AND users.id = $2",
    values: [currentTime, id],
  };
  return pool.query(query);
};

module.exports = { selectUser, insertUser, checkDataByName, updateUser, deleteUser, checkUserById, userQuery };
