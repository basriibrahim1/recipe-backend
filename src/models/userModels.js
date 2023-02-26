const pool = require("../config/db");

const selectUser = () => {
    return pool.query("SELECT * from users");
};

const checkUserById = (id) => {
    return pool.query(`SELECT * FROM users WHERE users.id = '${id}';`);
};

const userQuery = (data) => {
    let { searchBy, search, sortBy, sort, offset, limit } = data;
    return pool.query(`
    SELECT 
        *
    FROM 
        users
    WHERE 
       users.${searchBy} ILIKE '%${search}%'
    ORDER BY 
        users.${sortBy} ${sort} 
    OFFSET 
        ${offset}
    LIMIT 
        ${limit};
        
    `);
};

const updateUser = (data, id) => {
    let {email, password, fullname, photo} = data

    return pool.query(`UPDATE users SET email= '${email}',password = '${password}',fullname = '${fullname}', photo = '${photo}' WHERE users.id='${id}';`);
};


const createUser = (data) => {
    const {id, email, fullname, password, otp, roles} = data;
    return new Promise((resolve, reject) => pool.query(`INSERT INTO users(id, email, fullname, password, otp, roles) VALUES('${id}', '${email}', '${fullname}', '${password}', ${otp}, '${roles}')`, 
            (err, res) => {
                if(!err){
                    resolve(res);
                } else {
                    reject(err.message);
                }
            })
    );
};


const verifyUser = (id) => {
    return pool.query(`UPDATE users SET verif=1 WHERE users.id='${id}';`);
};


const deleteUser = (id) => {
    const currentTime = new Date().toISOString();
    return pool.query(`
        UPDATE users SET deleted_at = '${currentTime}' WHERE users.id = '${id}'
    `)
};

module.exports = { selectUser, updateUser, checkUserById, userQuery, createUser, verifyUser, deleteUser};
