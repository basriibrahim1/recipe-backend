const pool = require("../config/db");

const insertRecipes = (data) => {
  let { ingredients, title, photo, users_id, category_id } = data;

  let Newtime = new Date().toISOString();

  return pool.query(`INSERT INTO food_recipes(title,ingredients,photo,users_id,category_id,created_at) 
  VALUES ('${title}', '${ingredients}', '${photo}', ${users_id}, ${category_id}, '${Newtime}');`);
};

const getAllDataSorted = () => {
  return pool.query(`
        SELECT
            food_recipes.title,
            food_recipes.ingredients,
            TO_CHAR(food_recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime,
            users.name AS creator,
            category.title AS category
        FROM
            food_recipes
            JOIN category ON food_recipes.category_id=category.id
            JOIN users ON users_id=users.id
        WHERE
            food_recipes.deleted_at IS NULL;
    `);
};

const getRecipesByQuery = (data) => {
  let { sort, search, searchBy, sortBy, offset, limit } = data;
  return pool.query(
    `SELECT 
        food_recipes.title, 
        food_recipes.ingredients, 
        TO_CHAR(food_recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime,
        users.name AS creator, 
        category.title AS category
    FROM food_recipes 
    INNER JOIN 
        category ON food_recipes.category_id = category.id 
    INNER JOIN 
        users ON food_recipes.users_id = users.id 
    WHERE 
        food_recipes.deleted_at IS NULL 
        AND users.deleted_at IS NULL 
        AND food_recipes.${searchBy} ILIKE '%${search}%' 
    ORDER BY 
        food_recipes.${sortBy} ${sort} 
    OFFSET 
        ${offset} 
    LIMIT 
        ${limit};
        `
  );
};

const getRecipesName = (data) => {
  let { title } = data;
  return pool.query(`
      SELECT 
          food_recipes.title, 
          users.name AS creator, 
          category.title AS category 
      FROM 
          food_recipes 
          JOIN category ON food_recipes.category_id = category.id 
          JOIN users ON food_recipes.users_id = users.id 
      WHERE 
          food_recipes.deleted_at IS NULL AND 
          (food_recipes.title ILIKE '%${title}%')
      LIMIT 3 
      OFFSET 0;
    `);
};

const selectRecipesById = (data) => {
  return pool.query(`
      SELECT 
        food_recipes.id, 
        food_recipes.title, 
        users.name AS creator, 
        food_recipes.ingredients,
        food_recipes.photo,
        category.title AS category_title, 
        category.id AS category_id
      FROM food_recipes 
      INNER JOIN category ON food_recipes.category_id = category.id 
      INNER JOIN users ON food_recipes.users_id = users.id 
      WHERE food_recipes.deleted_at IS NULL AND food_recipes.id = ${data}
    `);
};

const updateRecipes = (data, id) => {
  let { title, category_id, photo, ingredients } = data;

  let query = `
    UPDATE food_recipes SET
        title = '${title}', 
        category_id = ${category_id},
        photo = '${photo}',
        ingredients = '${ingredients}'
    WHERE food_recipes.deleted_at IS NULL AND id = ${id};
`;

  return pool.query(query);
};

const deleteRecipes = (id) => {
  const currentTime = new Date().toISOString();

  return pool.query(`
    UPDATE food_recipes SET deleted_at = '${currentTime}' WHERE id = ${id}
    `);
};

module.exports = { insertRecipes, getRecipesByQuery, getRecipesName, selectRecipesById, updateRecipes, deleteRecipes, getAllDataSorted };
