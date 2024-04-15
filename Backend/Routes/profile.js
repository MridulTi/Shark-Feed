const express = require('express');
const Profile = require('./Db/db'); // Assuming Profile model file path

const router = express.Router();

// Route to fetch profile info by email or username
router.get('/profile/:query', async (req, res) => {
  const query = req.params.query;

  try {
    // Query for profile information using email or username
    const profile = await Profile.findOne({ $or: [{ email: query }, { username: query }] });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/update-profile/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update profile information based on request body
      user.name = req.body.name;
      user.companyName = req.body.companyName;
      user.profileType = req.body.profileType;
      user.bio = req.body.bio;
      // Add additional profile data to the user object
      user.currentInvestors = req.body.currentInvestors;
      user.connections = req.body.connections;
      user.numberOfInvestors = req.body.numberOfInvestors;
      user.stats = req.body.stats;
      user.activity = req.body.activity;
      user.products = req.body.products;
  
      // Save the updated user object
      const updatedUser = await user.save();
  
      res.status(200).json({ updatedUser });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
module.exports = router;
