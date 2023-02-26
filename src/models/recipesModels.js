const pool = require("../config/db");

const selectInsertRecipes = (data, users_id) => {
    let { ingredients, title, photo, category_id } = data;

    let Newtime = new Date().toISOString();

    return pool.query(`INSERT INTO food_recipes(title, ingredients, photo, users_id, category_id, created_at) 
     VALUES ('${title}', '${ingredients}', '${photo}', '${users_id}', ${category_id}, '${Newtime}');`);
};

const selectAllRecipes = () => {
    return pool.query(`
        SELECT food_recipes.id, users.fullname as creator, food_recipes.title, food_recipes.ingredients, TO_CHAR(food_recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime, category.title AS category
        FROM food_recipes
        JOIN category ON food_recipes.category_id = category.id
        JOIN users ON food_recipes.users_id = users.id
        WHERE food_recipes.deleted_at IS NULL;
    `);
};

const selectRecipesQuery = (data) => {
    let { sort, search, searchBy, sortBy, offset, limit } = data;
    return pool.query(
        `SELECT food_recipes.title, food_recipes.ingredients, TO_CHAR(food_recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime, category.title AS category
        FROM food_recipes 
        INNER JOIN category ON food_recipes.category_id = category.id 
        WHERE food_recipes.deleted_at IS NULL AND food_recipes.${searchBy} ILIKE '%${search}%' 
        ORDER BY food_recipes.${sortBy} ${sort} 
        OFFSET ${offset} 
        LIMIT ${limit}; `
    );
};

const selectRecipesName = (title) => {
    return pool.query(`
    SELECT food_recipes.title, users.fullname AS creator, food_recipes.ingredients AS ingredients, category.title AS category 
    FROM food_recipes 
    JOIN category ON food_recipes.category_id = category.id 
    JOIN users ON food_recipes.users_id = users.id 
    WHERE food_recipes.deleted_at IS NULL AND food_recipes.title ILIKE '%${title}%'
    `);
};


const selectRecipesId = (id) => {
    return pool.query(`
        SELECT food_recipes.id AS id, users_id AS users_id, users.fullname AS creator, food_recipes.title, food_recipes.ingredients, food_recipes.photo, category.title AS category_title, category.id AS category_id
      FROM food_recipes 
      INNER JOIN category ON food_recipes.category_id = category.id 
      INNER JOIN users ON food_recipes.users_id = users.id
      WHERE food_recipes.deleted_at IS NULL AND food_recipes.id = ${id}
    `);
};


const selectRecipesPayloadId = (id) => {
    return pool.query(`
    SELECT users_id AS Users, food_recipes.title, food_recipes.ingredients, food_recipes.photo, category.title AS category_title, category.id AS category_id
      FROM food_recipes 
      INNER JOIN category ON food_recipes.category_id = category.id 
      INNER JOIN users ON food_recipes.users_id = users.id
      WHERE food_recipes.deleted_at IS NULL AND food_recipes.users_id = '${id}'
    `);
};


const selectUpdateRecipes = (data, id) => {
    let { title, ingredients, category_id, photo, users_id} = data;

    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE food_recipes SET 
          title = '${title}',
          ingredients = '${ingredients}',
          category_id = ${category_id}, 
          photo = '${photo}'
        WHERE id = ${id} AND users_id = '${users_id}' AND deleted_at IS NULL RETURNING *`,
        (error, result) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(result.rows[0]);
          }
        }
      );
    });
};

const selectDeleteRecipes = (id, users_id) => {
    const currentTime = new Date().toISOString();

    return pool.query(`
    UPDATE food_recipes SET deleted_at = '${currentTime}' WHERE id = ${id} AND users_id = '${users_id}'`);
};

module.exports = { selectInsertRecipes, selectAllRecipes, selectRecipesQuery ,selectRecipesName, selectRecipesId, selectUpdateRecipes, selectDeleteRecipes, selectRecipesPayloadId};
