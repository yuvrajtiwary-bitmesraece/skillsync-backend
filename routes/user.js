const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, skills } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, skills },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ msg: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add Skill
router.post('/skills', verifyToken, async (req, res) => {
  try {
    const { skill } = req.body;
    if (!skill) return res.status(400).json({ msg: 'Skill is required' });

    const user = await User.findById(req.user.id);
    if (!user.skills.includes(skill)) {
      user.skills.push(skill);
      await user.save();
    }

    res.json({ msg: 'Skill added', skills: user.skills });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Skill
router.delete('/skills/:skillName', verifyToken, async (req, res) => {
  try {
    const skillToRemove = req.params.skillName;

    const user = await User.findById(req.user.id);
    user.skills = user.skills.filter(skill => skill !== skillToRemove);
    await user.save();

    res.json({ msg: 'Skill removed', skills: user.skills });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get All Skills
router.get('/skills', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('skills');
    res.json({ skills: user.skills });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all registered users
router.get('/all', verifyToken, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all skills with users who know them
router.get('/skills/stats', verifyToken, async (req, res) => {
  try {
    const users = await User.find().select('name skills');
    const skillStats = {};
    
    users.forEach(user => {
      user.skills.forEach(skill => {
        if (!skillStats[skill]) {
          skillStats[skill] = { count: 0, users: [] };
        }
        skillStats[skill].count++;
        skillStats[skill].users.push(user.name);
      });
    });
    
    res.json({ skillStats });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
