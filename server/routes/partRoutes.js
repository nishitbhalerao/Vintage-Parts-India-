const express = require('express');
const { body } = require('express-validator');
const {
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  getMyListings
} = require('../controllers/partController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Get all parts (public)
router.get('/', getParts);

// Get single part (public)
router.get('/:id', getPartById);

// Create new part (protected)
router.post('/', authMiddleware, upload.array('images', 5), [
  body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
  body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
  body('vehicleCategory').isIn(['bike', 'car']).withMessage('Vehicle category must be bike or car'),
  body('vehicleMake').trim().isLength({ min: 2 }).withMessage('Vehicle make is required'),
  body('vehicleModel').trim().isLength({ min: 2 }).withMessage('Vehicle model is required'),
  body('partCategory').isIn(['Engine', 'Electrical', 'Filters', 'Body', 'Brakes', 'Suspension', 'Transmission', 'Other']).withMessage('Invalid part category'),
  body('condition').isIn(['new', 'used', 'refurbished']).withMessage('Invalid condition'),
  body('price').isNumeric().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('sellerName').trim().isLength({ min: 2 }).withMessage('Seller name is required'),
  body('sellerPhone').matches(/^\d{10}$/).withMessage('Seller phone must be 10 digits'),
  body('sellerAddress').trim().isLength({ min: 10 }).withMessage('Seller address is required')
], createPart);

// Update part (protected)
router.put('/:id', authMiddleware, upload.array('images', 5), updatePart);

// Delete part (protected)
router.delete('/:id', authMiddleware, deletePart);

// Get user's listings (protected)
router.get('/my/listings', authMiddleware, getMyListings);

module.exports = router;