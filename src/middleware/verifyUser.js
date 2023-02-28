const pool = require("../config/db");


const findUser = (email) => {
    return new Promise((resolve, reject) => 
        pool.query(`SELECT * FROM users WHERE users.email = '${email}'`, 
            (err, res) => {
                if(!err){
                    resolve(res);
                } else {
                    reject(err.message);
                }
            }) 
    );
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => 
        pool.query(`SELECT * FROM users WHERE users.id = '${id}'`, 
            (err, res) => {
                if(!err){
                    resolve(res);
                } else {
                    reject(err.message);
                }
            }) 
    );
};


const findFoodRecipesById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM recipes WHERE id = ${id}`, (err, res) => {
            if (err) {
                reject(err.message);
            } else if (res.rows.length === 0) {
                reject(`Food recipe with id ${id} not found`);
            } else {
                resolve(res);
            }
        });
    });
};
  


module.exports = {findUser, findFoodRecipesById, findUserById};