const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config();
const upload = require('express-fileupload');

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "https://blog1-frontend.vercel.app" }));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT || 1000, () => console.log(`Server running on port ${process.env.PORT || 1000}`)))
  .catch(error => { console.log(error); });
