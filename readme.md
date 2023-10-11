# MonoShopping

it is the monolothic version of our ecommerce project including the followinng bussiness functrions:

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

we will begin by structuring our project according to our mentioned design pattern as follows:

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

setting index for easy require module or import as follows:

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
