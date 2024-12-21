import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

console.log({
    ENV: process.env.NODE_ENV,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
})
//inicializa o express
const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);
app.use('/categories', categoryRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));



export default app;
