const dotEnv = require("dotenv");
dotEnv.config();
console.log(process.env.PORT);
module.exports={
    DB_URI : process.env.MONGODB_URI
}
