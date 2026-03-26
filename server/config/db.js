const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.log('\n📋 Troubleshooting:');
    console.log('1. Ensure MongoDB service is running: net start MongoDB');
    console.log('2. Check if port 27017 is available');
    console.log('3. Verify MONGODB_URI in .env file');
    // Don't exit, let the app run without database for now
    console.log('⚠️  Running without database connection...');
  }
};

module.exports = connectDB;