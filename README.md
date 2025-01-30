# NODE EXPRESS TYPESCRIPT MONGODB MONGOOSE TEMPLATE
*Features:*
- JWT Authentication.
- Role based Authorization
- Advanced search filters and pagination.
- File upload with multer to cloudinary .

## Built With
- Node
- Express
- MongoDB
- Mongoose
- Typescript
- Multer

## Quick Start

Clone the parent repo:

```bash
git clone https://github.com/Aphatheology/node-express-typescript-mongodb-mongoose.git your-project-name
cd your-project-name
```

Install the dependencies:

```bash
yarn install
```

Set the environment variables:

```bash
cp .envExample .env

# open .env and modify the environment variables 
```

To run the project:

```bash
yarn run dev
# will run the server and watch for changes

npm run start
# will run the server without watching for changes
```

You can delete the example-module directory in the src, it is a directory just showing how things are implemented
E.g, how the pagination filter are implemented at the model level and how they are used at the service
Though it is excluded in the tsconfig file, so it won't affect the behavior of the project itself.

Thanks