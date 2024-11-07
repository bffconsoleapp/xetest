import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';
import swaggerDocs from './config/swagger.js';
import routes from './routes/app.route.js'; // Importing routes
import { ApolloServer } from 'apollo-server-express'; // Import from apollo-server-express

// Import GraphQL type definitions and resolvers
import demotypeDefs from './graphql/demo.js' // Import GraphQL type definitions
import demoresolver from './graphql/demoresolver.js'; // Import GraphQL resolvers

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Handle URL-encoded payloads
app.use(cors());

const typeDefs = [
    demotypeDefs
  ];

const resolvers = [
    demoresolver
  ];

// Initialize Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // You can add more Apollo Server options here if needed
});

// Start Apollo Server and apply middleware
const startServer = async () => {
    try {
        // Start Apollo Server
        await server.start();
        server.applyMiddleware({ app });

        // Register routes for REST APIs
        routes(app); 

        // Set Mongoose strictQuery option
        mongoose.set('strictQuery', false); // Adjust as per your preference

        // Connect to MongoDB
        await mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to the database");

        // Start Express server
        app.listen(config.port, () => {
            console.log(`Server is running on http://localhost:${config.port}`);
            console.log(`GraphQL playground available at http://localhost:${config.port}${server.graphqlPath}`);
            swaggerDocs(app, config.port);
        });
    } catch (err) {
        console.error('Error occurred:', err);
        process.exit(1); // Exit process with failure code
    }
};

startServer();
