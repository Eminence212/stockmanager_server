require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Stock Manager API',
      description: 'Stock Manager API description',
      contact: {
        email: 'mulemanowa@gmail.com',
      },
      version: '1.0.0',
      servers: ['http://localhost:5000'],
    },
  },
  //['.routes/*.js']
  apis: ['server.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
//API documentation
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * definitions:
 *   Script:
 *     type: object
 *     properties:
 *      script:
 *        type: string
 *        description: SQL scripting for postgresql
 *        example: CREATE TABLE action_participant_custom_data_values...
 */
//Tags
/**
 *@swagger
 * tags:
 * - name: "User"
 *   description: "Everything about the user"
 * - name: "Customer"
 *   description: "Everything about the customer"
 */

// Routes
app.use('/user', require('./routes/userRoute')); //Utilisateur
/**
 *@swagger
 * paths:
 *  /user/register:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Add a new user to the data base
 *       description: ''
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "User object that needs to be added to the data base"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              description : "User name of the user"
 *            password:
 *              type: string
 *              description : "Password name of the user"
 *            role:
 *              type: integer
 *              description : "Role of the user"
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /user/login:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Login
 *       description: ''
 *       consumes:
 *       - "application/json"
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "User object that needs to be login to the data base"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              description : "User name of the user"
 *            password:
 *              type: string
 *              description : "Password of the user"
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /user/activation:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Active the token
 *       description: ''
 *       parameters:
 *       - in: "body"
 *         name: "activation_token"
 *         description: "Token"
 *         required: true
 *         schema:
 *           type: string
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /user/refresh_token:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Refresh the token
 *       description: ''
 *       parameters:
 *       - in: "body"
 *         name: "refresh_token"
 *         description: "Refresh the token"
 *         required: true
 *         schema:
 *           type: string
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 *  /user/forgot:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Forgot password
 *       description: ''
 *       parameters:
 *       - in: "body"
 *         name: "name"
 *         description: "User name"
 *         required: true
 *         schema:
 *           type: string
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
  *  /user/reset:
 *    post:
 *       tags:
 *       - "User"
 *       summary: Reset the password
 *       description: ''
 *       parameters:
 *       - in: "body"
 *         name: "body"
 *         description: "User object that needs to be reset the password"
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            id:
 *              type: integer
 *              description : "ID"
 *            password:
 *              type: string
 *              description : "Password"
 *       responses :
 *          200:
 *             description: A successful response
 *          500:
 *            description: Failure of response
 */
app.use('/customer', require('./routes/customerRoute')); //client
app.use('/family', require('./routes/familyRoute')); //Famille
app.use('/supplier', require('./routes/supplierRoute')); //Fournisseur
app.use('/settlement', require('./routes/settlementRoute')); //Mode règlement
app.use('/currencie', require('./routes/currencieRoute')); //Monnaie
app.use('/status', require('./routes/statusRoute')); //status de la commande
app.use('/unit', require('./routes/unitRoute')); // Unité de stockage
app.use('/article', require('./routes/articleRoute')); //Article
app.use('/command', require('./routes/commandRoute')); //Commande / Vente
app.use('/rate', require('./routes/rateRoute')); //Taux
app.use('/procurement', require('./routes/procurementRoute')); //Approvisionnement ou Entrée
app.use('/distribution', require('./routes/distributionRoute')); //Distribution ou Sortie
app.use('/invoice', require('./routes/invoiceRoute')); //Facture
app.use('/stock', require('./routes/stockRoute')); //Stock

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
