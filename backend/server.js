require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users')
const emailRoutes = require('./routes/emails')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/emails', emailRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
