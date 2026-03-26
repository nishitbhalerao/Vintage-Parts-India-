import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { partsAPI } from '../services/api';
import VehicleSelector from '../components/VehicleSelector';

const AddPart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [formData, setFormData] = useState({
    // Step 1 - Vehicle Info
    vehicleCategory: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    
    // Step 2 - Part Info
    title: '',
    partCategory: '',
    partNumber: '',
    condition: '',
    description: '',
    
    // Step 3 - Price & Contact
    price: '',
    negotiable: true,
    sellerName: user?.name || '',
    sellerPhone: user?.phone || '',
    sellerAddress: user?.address || ''
  });

  const partCategories = [
    'Engine', 'Electrical', 'Filters', 'Body', 'Brakes', 'Suspension', 'Transmission', 'Other'
  ];

  const conditions = [
    { value: 'new', label: 'New', description: 'Brand new, unused part' },
    { value: 'used', label: 'Used', description: 'Previously used, good condition' },
    { value: 'refurbished', label: 'Refurbished', description: 'Restored to working condition' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setImages(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.vehicleCategory && formData.vehicleMake && formData.vehicleModel;
      case 2:
        return formData.title && formData.partCategory && formData.condition && formData.description;
      case 3:
        return formData.price && formData.sellerName && formData.sellerPhone && formData.sellerAddress;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setError('');
    } else {
      setError('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Append images
      images.forEach(image => {
        formDataToSend.append('images', image);
      });

      const response = await partsAPI.createPart(formDataToSend);
      navigate(`/parts/${response.data.part._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create listing');
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display font-semibold text-xl text-text-navy mb-4">
          Vehicle Information
        </h3>
        <p className="text-text-muted mb-6">
          Tell us about the vehicle this part belongs to
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-navy mb-3">
          Vehicle Category *
        </label>
        <VehicleSelector
          selectedCategory={formData.vehicleCategory}
          onCategoryChange={(category) => setFormData(prev => ({ ...prev, vehicleCategory: category }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="vehicleMake" className="block text-sm font-medium text-text-navy mb-2">
            Vehicle Make *
          </label>
          <input
            id="vehicleMake"
            name="vehicleMake"
            type="text"
            required
            value={formData.vehicleMake}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., Hero Honda, Maruti"
          />
        </div>

        <div>
          <label htmlFor="vehicleModel" className="block text-sm font-medium text-text-navy mb-2">
            Vehicle Model *
          </label>
          <input
            id="vehicleModel"
            name="vehicleModel"
            type="text"
            required
            value={formData.vehicleModel}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., CD100, Maruti 800"
          />
        </div>
      </div>

      <div>
        <label htmlFor="vehicleYear" className="block text-sm font-medium text-text-navy mb-2">
          Year of Vehicle (Optional)
        </label>
        <input
          id="vehicleYear"
          name="vehicleYear"
          type="number"
          min="1950"
          max={new Date().getFullYear()}
          value={formData.vehicleYear}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., 1995"
        />
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display font-semibold text-xl text-text-navy mb-4">
          Part Information
        </h3>
        <p className="text-text-muted mb-6">
          Provide details about the part you're selling
        </p>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-text-navy mb-2">
          Part Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Oil Filter for Hero Honda CD100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="partCategory" className="block text-sm font-medium text-text-navy mb-2">
            Part Category *
          </label>
          <select
            id="partCategory"
            name="partCategory"
            required
            value={formData.partCategory}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select Category</option>
            {partCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="partNumber" className="block text-sm font-medium text-text-navy mb-2">
            Part Number / OEM Code (Optional)
          </label>
          <input
            id="partNumber"
            name="partNumber"
            type="text"
            value={formData.partNumber}
            onChange={handleChange}
            className="input-field"
            placeholder="e.g., 15400-KCY-671"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-navy mb-3">
          Condition *
        </label>
        <div className="grid grid-cols-1 gap-3">
          {conditions.map((condition) => (
            <label
              key={condition.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                formData.condition === condition.value
                  ? 'border-primary-blue bg-primary-light'
                  : 'border-border-light hover:border-primary-blue'
              }`}
            >
              <input
                type="radio"
                name="condition"
                value={condition.value}
                checked={formData.condition === condition.value}
                onChange={handleChange}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-text-navy">{condition.label}</div>
                <div className="text-sm text-text-muted">{condition.description}</div>
              </div>
              {formData.condition === condition.value && (
                <div className="w-5 h-5 bg-primary-blue rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-text-navy mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="input-field resize-none"
          placeholder="Describe the part condition, compatibility, and any other relevant details..."
        />
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-display font-semibold text-xl text-text-navy mb-4">
          Price & Contact Information
        </h3>
        <p className="text-text-muted mb-6">
          Set your price and contact details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-text-navy mb-2">
            Price (₹) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            required
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter price in rupees"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="negotiable"
              checked={formData.negotiable}
              onChange={handleChange}
              className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-border-light rounded"
            />
            <span className="ml-2 text-sm text-text-navy">Price is negotiable</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sellerName" className="block text-sm font-medium text-text-navy mb-2">
            Your Name *
          </label>
          <input
            id="sellerName"
            name="sellerName"
            type="text"
            required
            value={formData.sellerName}
            onChange={handleChange}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="sellerPhone" className="block text-sm font-medium text-text-navy mb-2">
            Phone Number *
          </label>
          <input
            id="sellerPhone"
            name="sellerPhone"
            type="tel"
            required
            value={formData.sellerPhone}
            onChange={handleChange}
            className="input-field"
            placeholder="10-digit phone number"
            maxLength="10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sellerAddress" className="block text-sm font-medium text-text-navy mb-2">
          Address *
        </label>
        <textarea
          id="sellerAddress"
          name="sellerAddress"
          required
          value={formData.sellerAddress}
          onChange={handleChange}
          rows="3"
          className="input-field resize-none"
          placeholder="Enter your complete address"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-text-navy mb-2">
          Photos (Optional, max 5)
        </label>
        <div className="border-2 border-dashed border-border-light rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-text-muted">
              Click to upload images or drag and drop
            </p>
            <p className="text-sm text-text-muted mt-1">
              PNG, JPG up to 5MB each
            </p>
          </label>
        </div>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background-offWhite py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text-navy mb-4">
            List a Part
          </h1>
          <p className="text-text-muted text-lg">
            Add your part to our marketplace in 3 simple steps
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-200 ${
                    step <= currentStep
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-200 text-text-muted'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-200 ${
                      step < currentStep ? 'bg-primary-blue' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-text-muted">
              Step {currentStep} of 3
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-8"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Listing...' : 'Create Listing'}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddPart;