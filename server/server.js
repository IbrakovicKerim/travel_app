const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Importovanje connectDB funkcije

dotenv.config();

// Povezivanje sa bazom podataka
connectDB();

const app = express();

// Middleware za parsiranje JSON podataka
app.use(express.json());

// Importovanje ruta
const userRoutes = require('./routes/userRoutes');
const tripRoutes = require('./routes/tripRoutes');

// Povezivanje ruta
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);

// Osnovna ruta za testiranje
app.get('/', (req, res) => {
  res.send('Web Travel');
});

// Pokretanje servera
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
