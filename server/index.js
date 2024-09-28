// const express = require('express');
// const cors = require('cors');
// const { connect } = require('mongoose');
// require('dotenv').config();
// const upload = require('express-fileupload');

// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// const app = express();
// app.use(express.json({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(cors({ credentials: true, origin: "https://blog1-frontend.vercel.app" }));
// app.use(upload());
// app.use('/uploads', express.static(__dirname + '/uploads'));

// // Root route
// app.get('/', (req, res) => {
//   res.send('Welcome to the API!');
// });

// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);

// app.use(notFound);
// app.use(errorHandler);

// connect(process.env.MONGO_URI)
//   .then(() => app.listen(process.env.PORT || 1000, () => console.log(`Server running on port ${process.env.PORT || 1000}`)))
//   .catch(error => { console.log(error); });

const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');
require('dotenv').config(); // Ensure .env file is in the root directory
const upload = require('express-fileupload');
const path = require('path');

// Importing routes and middleware
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Initialize Express app
const app = express();

// Middleware Configuration
app.use(express.json()); // To parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// CORS Configuration
app.use(cors({
  credentials: true,
  origin: "https://blog-horizon-frontend.vercel.app", // Ensure this matches your frontend URL
}));

// File Upload Middleware Configuration
app.use(upload({
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit, adjust as needed
}));

// Serving static files from /uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// User and Post Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Custom Error Handlers (404 and others)
app.use(notFound);
app.use(errorHandler);

// MongoDB Connection and Server Initialization
connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 1000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  });
