# MonoShopping

this project is considered the first part of an educational series to create ecommerce using expressjs and mongoo then converting to microservices, so this is the first part which represents the monolithic project that we want to convert to microservices. it is the monolothic version of our ecommerce project including the followinng bussiness functrions:

- customer
- shoppping
- products

in this project we will crteate it from empty folder to full monolithic ecommerce project based express and we will use mongo nosql as our database.
used design pattern will be

- api: for requests validation and middelware
- service: for busness logics
- repository: for datyabase that will include object data mapping (ODM)
- util folder for shaered and global methods/functions
- testing: for testing our logics

## First: Structuring our project and install dependancies

1. we will begin by structuring our project according to our mentioned design pattern as follows:

```sh
mkdir src
mkdir src/api
mkdir src/api/middlewares
mkdir src/services
mkdir src/database
mkdir src/database/models
mkdir src/database/repository
mkdir src/config
mkdir src/utils
```

2. setting index for easy require module or import as follows:

```sh
touch src/index.js
touch src/api/index.js
touch src/api/middlewares/index.js
touch src/services/index.js
touch src/database/index.js
touch src/database/models/index.js
touch src/database/repository/index.js
touch src/config/index.js
touch src/utils/index.js
```

3. touch our prod, dev enviroment files for saving required secrets and variables in production ,testing, and development

```sh
touch .env
touch .env.dev
touch .env.prod
```

4. initiate the package.json and install dependencies

```sh
npm init --y
npm i bcrypt cors dotenv express jsonwebtoken mongoose uuid winston
npm i -D nodemon cross-env
```

### Dependencies

| Package                                                           | Usage/need                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)       | A library to help you hash passwords                                                                                                                                                                                                                                                                                                                                                                                                               |
| [cors](https://github.com/expressjs/cors#readme)                  | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable Cross-origin resource sharing with various options                                                                                                                                                                                                                                                                                                 |
| [dotenv](https://github.com/motdotla/dotenv#readme)               | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env                                                                                                                                                                                                                                                                                                                                              |
| [express](https://expressjs.com/)                                 | Fast, unopinionated, minimalist web framework for Node.js                                                                                                                                                                                                                                                                                                                                                                                          |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) | signing and tokens, JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted |
| [mongoose](https://mongoosejs.com/)                               | Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box                                                                                                                                                                                                                                           |
| [uuid](https://github.com/uuidjs/uuid#readme)                     | Generating Cryptographically-strong random values                                                                                                                                                                                                                                                                                                                                                                                                  |
| [winston](https://github.com/winstonjs/winston#readme)            | winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each winston logger can have multiple transports (see: Transports) configured at different levels (see: Logging levels). For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file |

### Dev dependencies

| Package                                                     | Usage/need                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cross-env](https://github.com/kentcdodds/cross-env#readme) | Most Windows command prompts will choke when you set environment variables with NODE_ENV=production like that. (The exception is Bash on Windows, which uses native Bash.) Similarly, there's a difference in how windows and POSIX commands utilize environment variables. With POSIX, you use: $ENV_VAR and on windows you use %ENV_VAR%.cross-env makes it so you can have a single command without worrying about setting or using the environment variable properly for the platform. Just set it like you would if it's running on a POSIX system, and cross-env will take care of setting it properly |
| [nodemon](https://nodemon.io/)                              | Nodemon is a utility depended on about 3 million projects, that will monitor for any changes in your source and automatically restart your server. Perfect for development. Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes.                                                                                                                                                                                                                                                                                                           |

5. we need to touch .gitignore to not sync all installed file to github repo

```sh
cat > .gitignore << EOL
.DS_Store
**/.env
**/.DS_Store
**/node_modules
EOL
```

6. installing mongodb
   1. install it locally accrding to your local machine very forward and then you do not need to credintials for logging but all what you need is to open the mongo `compass`, connect then copy the connection string that will need to connect and it is often `mongodb://localhost:27017/`
   2. do not forget to install `mongosh` that allows you to connect through command shell
   3. you may need to create an account on `mongo atlas` and chose your plan then keep then select the required connection which will be using node then save the connection string with the password and login name to be use through .env file later and this step for this project is optional.
7. create the required scripts for your project by editing `package.json` and add the following scripts to be used later as follows:
   1. dev
   2. prod
   3. start

```sh
"scripts": {
    "start": "nodemon src/index.js",
    "dev": "cross-env NODE_ENV=dev nodemon src/index.js",
    "prod": "cross-env NODE_ENV=prod nodemon src/index.js"
   },
```

where `cross-env` is cross compiler/ enviroment that allow us to avoide writing deferent syntax for windows or linux , and we only write as if our os is linux even if we use windows. we installed `cross-env` in development where the real servers will be linux and if we gonna use these scripts when deploying we should remove it from the begining of the script and just for knowledge if the above script is written for windows it will be something like `SET NODE_ENV=dev && nodemon src/index.js` where in linux `NODE_ENV=dev nodemon src/index.js`. and this script simply sets the `process.env` varaible called `NODE_DEV` to equal dev then run node monitor to run and watch our server.

### Dificulties that you may face especially for Windows Developers

1. in this project our methodology is that when we run dev script it uploads dev .env variables and if other script it changes the .env used by another so in the script before running the code we set process.env.NODE_DEV to value and in the configuration we check it then upload right .env to the configuration. upon this explaination if the .env according to operating system not loaded, then all var will be undefined so using `cross-env` will solve this problem, second review the path to the new .env that you need to upload.
