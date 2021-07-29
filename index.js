require('dotenv').config();
require('./db-connection');

const express = require('express');

const baseRoutes = require('./routes');
const userRoutes = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use('/api', baseRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, _ => console.log(`App listening on port ${PORT}`));
