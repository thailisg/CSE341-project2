const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API Egyptian Predynastic',
    description: 'API for figures from the Egyptian Predynastic period'
  },
  host: process.env.NODE_ENV === 'production' ? 'cse341-project2-o7gl.onrender.com' : 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);