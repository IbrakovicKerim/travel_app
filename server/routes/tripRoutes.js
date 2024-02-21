const express = require('express');
const router = express.Router();
const {
  createTrip,
  updateTrip,
  deleteTrip,
  getTrips
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

// Pretpostavka je da su putovanja javno dostupna, pa za dohvatanje putovanja ne zahtijevamo autentifikaciju
router.get('/', getTrips);

// Za kreiranje, ažuriranje i brisanje putovanja zahtijevamo autentifikaciju
router.post('/', protect, createTrip);
router.put('/:id', protect, updateTrip);
router.delete('/:id', protect, deleteTrip);

module.exports = router;
