const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'API documentation for the E-commerce application',
    },
    host: 'cse341-final-project-365b.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);