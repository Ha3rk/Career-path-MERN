const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const PORT = process.env.NODE_LOCAL_PORT || 8080;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const DB_URL = `mongodb://${process.env.DB_USER || process.env.MONGODB_USER}:${
  process.env.DB_PASSWORD || process.env.MONGODB_PASSWORD
}@${process.env.DB_HOST || '127.0.0.1'}:${
  process.env.DB_PORT || process.env.MONGODB_DOCKER_PORT
}/${process.env.DB_NAME || process.env.MONGODB_DATABASE}?authSource=admin`;
console.log('DB_URL', DB_URL);
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.use(routes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
