// const REDIS_PORT = 6379;

// const redis = require("redis");
// const client = redis.createClient(REDIS_PORT);


// const redisMiddleware = (req, res, next) => {
//     const key = req.originalUrl;
//     client.get(key, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).send(err);
//         }
//         if (data !== null) {
//             res.send(JSON.parse(data));
//         } else {
//             next();
//         }
//     });
// };


// module.exports = redisMiddleware;