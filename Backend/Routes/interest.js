const mongoose = require('mongoose');

// Assuming you have a User model with an interests field

const getFeeds = async (req, res) => {
  const investor = req.user; // Get the logged-in investor from the request

  try {
    const feeds = await Feed.find({
      interests: { $in: investor.interests } // Filter feeds where interests match the investor's interests
    });
    res.json(feeds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving feeds' });
  }
};