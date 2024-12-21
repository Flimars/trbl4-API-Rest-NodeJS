import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API TODO List',
        version: '1.0.0',
        description: 'Documentação interativa da API TODO List',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor Local',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ['./src/routes/*.js'], // Caminho para os arquivos de rotas documentados
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  export default swaggerSpec;
