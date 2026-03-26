const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Part title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  vehicleCategory: {
    type: String,
    enum: ['bike', 'car'],
    required: [true, 'Vehicle category is required']
  },
  vehicleMake: {
    type: String,
    required: [true, 'Vehicle make is required'],
    trim: true
  },
  vehicleModel: {
    type: String,
    required: [true, 'Vehicle model is required'],
    trim: true
  },
  vehicleYear: {
    type: Number,
    min: 1950,
    max: new Date().getFullYear()
  },
  partCategory: {
    type: String,
    required: [true, 'Part category is required'],
    enum: ['Engine', 'Electrical', 'Filters', 'Body', 'Brakes', 'Suspension', 'Transmission', 'Other']
  },
  partNumber: {
    type: String,
    trim: true
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished'],
    required: [true, 'Condition is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  negotiable: {
    type: Boolean,
    default: true
  },
  images: [{
    type: String
  }],
  sellerName: {
    type: String,
    required: [true, 'Seller name is required']
  },
  sellerPhone: {
    type: String,
    required: [true, 'Seller phone is required']
  },
  sellerAddress: {
    type: String,
    required: [true, 'Seller address is required']
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String,
    default: ''
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search functionality
partSchema.index({ title: 'text', description: 'text', vehicleMake: 'text', vehicleModel: 'text' });

module.exports = mongoose.model('Part', partSchema);