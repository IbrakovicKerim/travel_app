const Trip = require('../models/Trip');

// Dohvatanje svih putovanja
exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dodavanje novog putovanja
exports.createTrip = async (req, res) => {
  const { title, description, price, dates, category } = req.body;
  try {
    const trip = new Trip({
      title,
      description,
      price,
      dates,
      category,
      createdBy: req.user._id,
    });
    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Ažuriranje postojećeg putovanja
exports.updateTrip = async (req, res) => {
  const { title, description, price, dates, category } = req.body;
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip) {
      trip.title = title;
      trip.description = description;
      trip.price = price;
      trip.dates = dates;
      trip.category = category;

      const updatedTrip = await trip.save();
      res.json(updatedTrip);
    } else {
      res.status(404).json({ message: 'Putovanje nije pronađeno' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Brisanje putovanja
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if(trip) {
      await trip.remove();
      res.json({ message: 'Putovanje je obrisano.' });
      } else {
      res.status(404).json({ message: 'Putovanje nije pronađeno.' });
      }
      } catch (error) {
      res.status(500).json({ message: 'Došlo je do greške pri brisanju putovanja.' });
      }
      };
