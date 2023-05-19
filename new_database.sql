-- Active: 1677393302853@@149.129.241.190@5432@basri01@public





/* creating table */

CREATE TABLE users(id SERIAL, name VARCHAR);

ALTER TABLE category ADD PRIMARY KEY(id);


CREATE TABLE food_recipes(
    id SERIAL, 
    title VARCHAR NOT NULL, 
    ingredients TEXT NOT NULL, 
    photo VARCHAR, 
    created_at TIMESTAMP NOT NULL, 
    users_id INT REFERENCES users(id)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    title VARCHAR NOT NULL
);


CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  fullname VARCHAR,
  photo VARCHAR,
  verif INT DEFAULT 0,
  otp VARCHAR,
  created_at TIMESTAMP
);



/* untuk table */


UPDATE users SET deleted_at = NULL;

SELECT * FROM food_recipes;

INSERT INTO food_recipes(ingredients,title,created_at,photo,users_id) VALUES('mie instan ','mie rebus','2023-02-16 00:00:00','img.png',1);

INSERT INTO food_recipes(title,ingredients,photo,users_id,category_id,created_at) VALUES ('ice cream', 'ice dan cream', 'img.png', 31, 2, '2023-05-22 10:23:25');


UPDATE food_recipes SET
  food_recipes.id = id,
  title = 'kacang hijau', 
  ingredients = 'kacang, santan dan roti',
  category_id = 2
WHERE id = 4;



UPDATE food_recipes
SET category_id = category.id
FROM category
WHERE food_recipes.category_id = category.id;


UPDATE food_recipes
SET category_id = 1;


SELECT 
    food_recipes.id, 
    food_recipes.title, 
    users.name AS creator, 
    category.title AS category 
    FROM food_recipes 
    JOIN category ON food_recipes.category_id = category.id 
    JOIN users ON food_recipes.users_id = users.id 
    WHERE 
        food_recipes.deleted_at IS NULL AND 
        food_recipes.id = 4;

SELECT 
        food_recipes.title, 
        users.name AS creator, 
        category.title AS category 
FROM food_recipes 
JOIN category ON food_recipes.category_id = category.id 
JOIN users ON food_recipes.users_id = users.id 
WHERE 
        food_recipes.deleted_at IS NULL AND 
        food_recipes.id = 4;



SELECT title, TO_CHAR(created_at, 'DD-MM-YYYY HH24:MI:SS') AS created_at_formatted FROM food_recipes;


SELECT * FROM food_recipes WHERE users_id = users_id;

INSERT INTO category(title) VALUES('dessert');


/* untuk menambahkan sebuah kolom baru bernama category_id pada tabel food_recipes. Kolom tersebut memiliki tipe data INT, yang biasanya digunakan untuk menyimpan nilai bilangan bulat. */
ALTER TABLE users ADD roles VARCHAR NOT NULL DEFAULT 'customer';


/* adalah perintah SQL untuk menambahkan sebuah foreign key pada tabel food_recipes yang merujuk ke kolom id pada tabel category. Artinya, setiap nilai pada kolom category_id pada tabel food_recipes harus ada di kolom id pada tabel category. */

ALTER TABLE food_recipes ADD FOREIGN KEY(users_id) REFERENCES users(id);

ALTER TABLE food_recipes ADD users_id VARCHAR;

SELECT * FROM food_recipes JOIN category ON food_recipes.category_id=category.id;

SELECT food_recipes.title, users.name FROM food_recipes JOIN users ON food_recipes.users_id = users.id WHERE food_recipes.title ILIKE '%baso%';

/*
SELECT recipes.title,recipes.ingredients,recipes.created_at as posttime, users.name as creator, category.name as category: Memilih beberapa kolom dari tabel recipes, users, dan category untuk ditampilkan dalam hasil query
FROM recipes JOIN category ON recipes.category_id=category.id JOIN users ON users_id=users.id: Mengambil data dari tabel recipes, category, dan users dan melakukan JOIN antar tabel tersebut.
WHERE recipes.deleted_at IS NULL AND recipes.title ILIKE '%goreng%': Menerapkan kondisi pada hasil query.
ORDER BY recipes.created_at DESC: Mengurutkan hasil query berdasarkan kolom created_at pada tabel recipes secara descending (DESC).
 */



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
  food_recipes.deleted_at IS NULL AND 
  food_recipes.title ILIKE '%kacang%'  
ORDER BY 
  food_recipes.created_at DESC;





 UPDATE food_recipes SET
            title = ''
            ingredients = '${ingredients}'
            category = '${category}'
WHERE id = ${id}


/* FOR CATEGORY */


SELECT users.name as creator, food_recipes.title AS food, category.title AS category
FROM category
JOIN food_recipes ON category.id = food_recipes.category_id
JOIN users ON food_recipes.users_id = users.id
WHERE food_recipes.deleted_at IS NULL
ORDER BY category.title DESC;


SELECT category.title AS category, food_recipes.title AS food, users.name AS creator
FROM category 
JOIN food_recipes ON category.id = food_recipes.category_id
JOIN users ON food_recipes.users_id = users.id
WHERE food_recipes.deleted_at IS NULL AND category.id = 2;


SELECT category.title FROM category 
WHERE 
category.${searchBy} ILIKE '%${search}%' 
ORDER BY 
category.${sortBy} ${sort} 
OFFSET
${offset}
LIMIT 
${limit};


INSERT INTO category(title) VALUES('minuman');


DELETE FROM category WHERE id = 8;


SELECT * FROM CATEGORY;


UPDATE category SET deleted_at = NULL WHERE id = 1;


UPDATE category SET title='' WHERE id='id';

ALTER TABLE users ADD deleted_at TIMESTAMP DEFAULT NULL;


/* untuk users */



SELECT * FROM users;


UPDATE users SET name='basri' WHERE name='justin';


DELETE FROM users WHERE name='undefined';



SELECT * FROM users WHERE users.deleted_at IS NULL AND name = 'otan';


SELECT users.name as creator, food_recipes.title 
FROM users
JOIN food_recipes ON users.id = food_recipes.users_id
ORDER BY users.name DESC;






SELECT users.name, food_recipes.title FROM users JOIN food_recipes ON users.id = food_recipes.users_id WHERE users.id = 1;


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
  users.deleted_at IS NULL 
ORDER BY 
  users.name DESC 
OFFSET 
  0
LIMIT 
  100;


SELECT 
        users.name AS user_name,
        food_recipes.title AS title,
        category.title AS category_title,
        category.id AS category_id
    FROM 
        users
    JOIN 
        food_recipes ON users.id = food_recipes.users_id AND food_recipes.deleted_at IS NULL
    JOIN 
        category ON food_recipes.category_id = category.id
    WHERE 
        users.deleted_at IS NULL AND users.name ILIKE '%a%'
    ORDER BY 
        users.name ASC 
    OFFSET 
        0
    LIMIT 
        100;



SELECT users.name as creator, food_recipes.title FROM users JOIN food_recipes ON users.id = food_recipes.users_id WHERE users.deleted_at IS NULL ORDER BY users.name DESC ;


SELECT users.name as creator, food_recipes.title 
FROM users
INNER JOIN food_recipes ON users.id = food_recipes.users_id 
WHERE users.${by} = ${data}
AND users.deleted_at IS NULL;




CREATE POLICY admin_policy ON users
  USING (roles = 'admin')
  WITH CHECK (roles = 'admin')
  FOR SELECT, INSERT, UPDATE, DELETE
  TO admin;


CREATE POLICY admin_policy ON users
USING (roles = 'admin')
WITH CHECK (roles = 'admin')
FOR SELECT, INSERT, UPDATE, DELETE
TO admin;