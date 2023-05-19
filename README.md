# Recipes-Club
Find your recipes

And make delicious food


# Database Schema
![Database Schema](https://github.com/basriibrahim1/recipe-backend/blob/main/src/ss/schema.PNG)

## Built with

- NodeJS
- ExpressJS
- PostgreSQL

## Packages used

- argon2: ^0.30.3
- body-parser: ^1.20.1
- cloudinary: ^1.35.0
- cookie-parser: ^1.4.6
- cors: ^2.8.5
- dotenv: ^16.0.3
- express: ^4.18.2
- express-session: ^1.17.3
- jsonwebtoken: ^9.0.0
- mime-types: ^2.1.35
- morgan: ^1.10.0
- multer: ^1.4.5-lts.1
- nodemailer: ^6.9.1
- nodemon: ^2.0.21
- pg: ^8.9.0
- redis: ^4.6.5
- uuid: ^9.0.0
- xss-clean: ^0.1.1

# ENV Keys
```bash
DB_USER = 
DB_NAME = 
DB_PASS = 
DB_PORT = 
DB_HOST = 

JWT_TOKEN = 
BASE_URL = 

EMAIL_NAME = 
EMAIL_PASS = 

CLOUD_NAME = 
CLOUD_KEY = 
CLOUD_SECRET = 
```

# Installation
Clone the project

```bash
  git clone https://github.com/basriibrahim1/recipe-backend.git
```

Go to the project directory

```bash
  cd recipe-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```

# Api documentation
users
recipes
category

---
### Register users
```http
  POST /auth/register
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `password` | **Required**. password |


---

### OTP Verification users
```http
  POST /auth/otp/:id/:code
```
Req Query Form: 
| Key | Value |
| :-------- |:------------------------- |
| `id` | **Required**. id |
| `code` | **Required**. code |

---

### Login
```http
  POST /auth/login
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |


---
### Get all Recipes + Query

```http
  GET /recipes?search=''&searchBy=name&sortBy=created_at&sort=ASC
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query  |null
| `searchBy` | search category |name
| `sortBy`| sort category |created_at
| `sort`| sort query |asc

---

### Get recipes by Id

```http
  GET /recipes/:id
```


---

### Get recipes by Name

```http
  GET /recipes/name/:title
```

---

### Get Recipes Payload

```http
  GET /recipes/user-recipes/recipes
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---


### Input Recipes 

```http
  POST /recipes/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `title` | Burger  | ''
| `Ingredients` | Patty, Meat | ''
| `category_id`| 1 | ''
| `photo`| New Photo | ''
| `users_id`| Payload Bearer token | ''
---


### Update Recipes 

```http
  PUT /recipes/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |
Req Form-Data:
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `title` | Burger  | Previous Value
| `Ingredients` | Patty, Meat | Previous Value
| `category_id`| 1 | Previous Value
| `photo`| New Photo | Previous Value
| `users_id`| Payload Bearer token | Previous Value

---


### Delete Recipes

```http
  DELETE /recipes/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Get Users Payload

```http
  GET /users/users
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Update Users
```http
  PUT /users/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `name` | Nama|
| `email` | Nama@email |
| `phone` | 0812 |
| `photo` | image jpeg/png|

---


### Get Category

```http
  GET /category
```


---
### Get Category Id

```http
  GET /category/:id
```

---