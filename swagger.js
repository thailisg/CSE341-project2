const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Egyptian Predynastic',
    description: 'API for figures from the Egyptian Predynastic period'
  },
  host: 'localhost:3000',
  schemas: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);