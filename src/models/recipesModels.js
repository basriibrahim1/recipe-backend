const pool = require("../config/db");

const selectInsertRecipes = (data) => {
    let { title, ingredients, photo, users_id, category_id } = data;

    let Newtime = new Date().toISOString();

    return pool.query(`INSERT INTO recipes(title, ingredients, photo, users_id, category_id, created_at) 
     VALUES ('${title}','${ingredients}', '${photo}', '${users_id}',  ${category_id}, '${Newtime}');`);
};

const selectAllRecipes = (sort, search) => {
    return pool.query(`
        SELECT recipes.id, recipes.photo, users.fullname as creator, recipes.title, recipes.ingredients, TO_CHAR(recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime, category.name AS category
        FROM recipes
        JOIN category ON recipes.category_id = category.id
        JOIN users ON recipes.users_id = users.id
        WHERE recipes.deleted_at IS NULL AND recipes.title ILIKE '%${search}%' 
        ORDER BY recipes.title ${sort}

    `);
};

const selectRecipesQuery = (data) => {
    let { sort, search, searchBy, sortBy, limit, offset} = data;
    return pool.query(
        `SELECT recipes.title, recipes.ingredients, recipes.photo, TO_CHAR(recipes.created_at, 'DD-MM-YYYY HH24:MI:SS') AS posttime, category.name AS category FROM recipes 
        INNER JOIN category ON recipes.category_id = category.id 
        WHERE recipes.deleted_at IS NULL AND recipes.${searchBy} ILIKE '%${search}%' 
        ORDER BY recipes.${sortBy} ${sort}
        OFFSET ${offset}
        LIMIT ${limit};`
    );
};

const selectRecipesName = (title) => {
    return pool.query(`
    SELECT recipes.title, users.fullname AS creator, recipes.photo, recipes.ingredients AS ingredients, category.name AS category 
    FROM recipes 
    JOIN category ON recipes.category_id = category.id 
    JOIN users ON recipes.users_id = users.id 
    WHERE recipes.deleted_at IS NULL AND recipes.title ILIKE '%${title}%'
    `);
};


const selectRecipesId = (id) => {
    return pool.query(`
        SELECT recipes.id AS id, users_id, users.fullname AS creator, recipes.title, recipes.ingredients, recipes.photo, category.name AS category_title, category.id AS category_id
      FROM recipes 
      INNER JOIN category ON recipes.category_id = category.id 
      INNER JOIN users ON recipes.users_id = users.id
      WHERE recipes.deleted_at IS NULL AND recipes.id = ${id}
    `);
};


const selectRecipesPayloadId = (id) => {
    return pool.query(`
    SELECT recipes.id, users_id AS Users, recipes.title, recipes.ingredients, recipes.photo, category.name AS category_title, category.id AS category_id
      FROM recipes 
      INNER JOIN category ON recipes.category_id = category.id 
      INNER JOIN users ON recipes.users_id = users.id
      WHERE recipes.deleted_at IS NULL AND recipes.users_id = '${id}'
    `);
};


const selectUpdateRecipes = (data, id) => {
    let { title, ingredients, category_id, photo, users_id} = data;

    return new Promise((resolve, reject) => {
        pool.query(
            `UPDATE recipes SET title='${title}', ingredients='${ingredients}', category_id=${category_id}, photo='${photo}', users_id = '${users_id}'
            WHERE id = ${id} AND deleted_at IS NULL`,
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
    UPDATE recipes SET deleted_at = '${currentTime}' WHERE id = ${id} AND users_id = '${users_id}'`);
};

module.exports = { selectInsertRecipes, selectAllRecipes, selectRecipesQuery ,selectRecipesName, selectRecipesId, selectUpdateRecipes, selectDeleteRecipes, selectRecipesPayloadId};
