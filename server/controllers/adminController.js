const User = require('../models/User');
const Part = require('../models/Part');

// Get admin dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalParts = await Part.countDocuments();
    const activeParts = await Part.countDocuments({ isAvailable: true });
    const featuredParts = await Part.countDocuments({ isFeatured: true });
    const pendingParts = await Part.countDocuments({ verificationStatus: 'pending' });
    const verifiedParts = await Part.countDocuments({ verificationStatus: 'verified' });
    
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const partsByCategory = await Part.aggregate([
      { $group: { _id: '$vehicleCategory', count: { $sum: 1 } } }
    ]);

    const recentUsers = await User.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentParts = await Part.find()
      .populate('seller', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalUsers,
        totalParts,
        activeParts,
        featuredParts,
        pendingParts,
        verifiedParts
      },
      usersByRole,
      partsByCategory,
      recentUsers,
      recentParts
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
};

// Get all users with pagination and search
const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      role = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    if (role && role !== 'all') {
      filter.role = role;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const users = await User.find(filter)
      .select('-passwordHash')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    // Get user stats (parts count for each user)
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const partsCount = await Part.countDocuments({ seller: user._id });
        const activePartsCount = await Part.countDocuments({ 
          seller: user._id, 
          isAvailable: true 
        });
        return {
          ...user.toObject(),
          partsCount,
          activePartsCount
        };
      })
    );

    res.json({
      users: usersWithStats,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalUsers: total,
        hasNext: skip + users.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Get all parts with admin features
const getAllParts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      category = '',
      status = '',
      verification = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { vehicleMake: { $regex: search, $options: 'i' } },
        { vehicleModel: { $regex: search, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      filter.vehicleCategory = category;
    }

    if (status === 'available') {
      filter.isAvailable = true;
    } else if (status === 'sold') {
      filter.isAvailable = false;
    }

    if (verification && verification !== 'all') {
      filter.verificationStatus = verification;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const parts = await Part.find(filter)
      .populate('seller', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

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
    res.status(500).json({ message: 'Server error fetching parts' });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all parts by this user
    await Part.deleteMany({ seller: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res.json({ 
      message: 'User and all associated parts deleted successfully',
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

// Delete part (admin only)
const deletePart = async (req, res) => {
  try {
    const { partId } = req.params;

    const part = await Part.findById(partId).populate('seller', 'name email');
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    await Part.findByIdAndDelete(partId);

    res.json({ 
      message: 'Part deleted successfully',
      deletedPart: {
        id: part._id,
        title: part.title,
        seller: part.seller.name
      }
    });
  } catch (error) {
    console.error('Delete part error:', error);
    res.status(500).json({ message: 'Server error deleting part' });
  }
};

// Toggle part featured status
const togglePartFeatured = async (req, res) => {
  try {
    const { partId } = req.params;

    const part = await Part.findById(partId);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    part.isFeatured = !part.isFeatured;
    await part.save();

    res.json({ 
      message: `Part ${part.isFeatured ? 'featured' : 'unfeatured'} successfully`,
      part: {
        id: part._id,
        title: part.title,
        isFeatured: part.isFeatured
      }
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ message: 'Server error updating part' });
  }
};

// Update part verification status
const updatePartVerification = async (req, res) => {
  try {
    const { partId } = req.params;
    const { verificationStatus, adminNotes } = req.body;

    if (!['pending', 'verified', 'rejected'].includes(verificationStatus)) {
      return res.status(400).json({ message: 'Invalid verification status' });
    }

    const part = await Part.findById(partId);
    if (!part) {
      return res.status(404).json({ message: 'Part not found' });
    }

    part.verificationStatus = verificationStatus;
    if (adminNotes) {
      part.adminNotes = adminNotes;
    }
    await part.save();

    res.json({ 
      message: 'Part verification status updated successfully',
      part: {
        id: part._id,
        title: part.title,
        verificationStatus: part.verificationStatus,
        adminNotes: part.adminNotes
      }
    });
  } catch (error) {
    console.error('Update verification error:', error);
    res.status(500).json({ message: 'Server error updating verification' });
  }
};

// Get user details with all their parts
const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const parts = await Part.find({ seller: userId }).sort({ createdAt: -1 });
    
    const userStats = {
      totalParts: parts.length,
      activeParts: parts.filter(p => p.isAvailable).length,
      featuredParts: parts.filter(p => p.isFeatured).length,
      totalViews: parts.reduce((sum, p) => sum + p.views, 0),
      verifiedParts: parts.filter(p => p.verificationStatus === 'verified').length
    };

    res.json({
      user,
      parts,
      stats: userStats
    });
  } catch (error) {
    console.error('Get user details error:', error);
    res.status(500).json({ message: 'Server error fetching user details' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllParts,
  deleteUser,
  deletePart,
  togglePartFeatured,
  updatePartVerification,
  getUserDetails
};