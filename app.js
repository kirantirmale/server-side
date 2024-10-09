require('./config/db')
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const router = require('./router/index');
const { errorHandler } = require('./utils/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swag.json');
const cors = require('cors');

// app.use('/public',express.static('public'))
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
