const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API documentation for the E-commerce application',
    },
    host: 'localhost:4000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);