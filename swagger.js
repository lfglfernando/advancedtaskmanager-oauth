const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
    },
    servers: [{ url: 'https://your-app-name.onrender.com' }],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/swagger.json', (req, res) => res.json(swaggerSpec));
  console.log('Swagger docs available at /api-docs');
}

module.exports = swaggerDocs;
