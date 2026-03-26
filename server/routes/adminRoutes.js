const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  getAllParts,
  deleteUser,
  deletePart,
  togglePartFeatured,
  updatePartVerification,
  getUserDetails
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard stats
router.get('/dashboard', getDashboardStats);

// User management
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.delete('/users/:userId', deleteUser);

// Part management
router.get('/parts', getAllParts);
router.delete('/parts/:partId', deletePart);
router.patch('/parts/:partId/featured', togglePartFeatured);
router.patch('/parts/:partId/verification', updatePartVerification);

module.exports = router;