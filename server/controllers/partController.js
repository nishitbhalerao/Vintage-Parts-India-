const { validationResult } = require('express-validator');
const Part = require('../models/Part');

// Get all parts with filtering
const getParts = async (req, res) => {
  try {
    const {
      category,
      search,
      make,
      partCategory,
      condition,
      page = 1,
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };

    if (category) {
      filter.vehicleCategory = category;
    }

    if (make) {
      filter.vehicleMake = new RegExp(make, 'i');
    }

    if (partCategory) {
      filter.partCategory = partCategory;
    }

    if (condition) {
      filter.condition = condition;
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const parts = await Part.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('seller', 'name');

    // Get total count for pagination
    const total = await Part.countDocuments(filter);

    res.json({
      parts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalParts: total,
        hasNext: skip + parts.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get parts error:', error);
    res.status(500).json({ message: 'Server error while fetching parts' });
  }
};

// Get single part by ID
const getPartById = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id).populate('seller', 'name email');
    
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    // Increment view count
    part.views += 1;
    await part.save();

    res.json(part);
  } catch (error) {
    console.error('Get part error:', error);
    res.status(500).json({ message: 'Server error while fetching part' });
  }
};

// Create new part
const createPart = async (req, res) => {
  try {
    console.log('Create part request body:', req.body);
    console.log('Create part files:', req.files);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const {
      title,
      description,
      vehicleCategory,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      partCategory,
      partNumber,
      condition,
      price,
      negotiable,
      sellerName,
      sellerPhone,
      sellerAddress
    } = req.body;

    // Handle uploaded images
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const part = new Part({
      title,
      description,
      vehicleCategory,
      vehicleMake,
      vehicleModel,
      vehicleYear: vehicleYear ? parseInt(vehicleYear) : undefined,
      partCategory,
      partNumber,
      condition,
      price: parseFloat(price),
      negotiable: negotiable === 'true' || negotiable === true,
      images,
      sellerName,
      sellerPhone,
      sellerAddress,
      seller: req.user._id
    });

    console.log('Part object before save:', part);

    await part.save();

    res.status(201).json({
      message: 'Part listed successfully',
      part
    });
  } catch (error) {
    console.error('Create part error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ message: 'Server error while creating part' });
  }
};

// Update part
const updatePart = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    // Check if user owns the part
    if (part.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this part' });
    }

    const updates = req.body;
    
    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => `/uploads/${file.filename}`);
      updates.images = [...(part.images || []), ...newImages];
    }

    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Part updated successfully',
      part: updatedPart
    });
  } catch (error) {
    console.error('Update part error:', error);
    res.status(500).json({ message: 'Server error while updating part' });
  }
};

// Delete part
const deletePart = async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    // Check if user owns the part
    if (part.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this part' });
    }

    await Part.findByIdAndDelete(req.params.id);

    res.json({ message: 'Part deleted successfully' });
  } catch (error) {
    console.error('Delete part error:', error);
    res.status(500).json({ message: 'Server error while deleting part' });
  }
};

// Get user's listings
const getMyListings = async (req, res) => {
  try {
    const parts = await Part.find({ seller: req.user._id })
      .sort({ createdAt: -1 });

    res.json(parts);
  } catch (error) {
    console.error('Get my listings error:', error);
    res.status(500).json({ message: 'Server error while fetching listings' });
  }
};

module.exports = {
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart,
  getMyListings
};