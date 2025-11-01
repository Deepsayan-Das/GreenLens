'use client';
import { motion } from 'framer-motion';
import { ShoppingCart, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function PurchaseForm() {
  const [purchaseType, setPurchaseType] = useState('');
  const [formData, setFormData] = useState({
    // Solar Panel fields
    solarCompany: '',
    panelCapacity: '',
    numberOfPanels: '',
    installationDate: '',
    
    // EV fields
    evBrand: '',
    evModel: '',
    batteryCapacity: '',
    purchaseDate: '',
    vehicleNumber: '',
    
    // Common
    invoiceFile: null,
    proofFile: null
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e, fileType) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [fileType]: e.target.files[0] });
    }
  };

  const handleSubmit = () => {
    console.log('Purchase Data Submitted:', { purchaseType, ...formData });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-200 py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-purple-900">Eco Purchase</h1>
            <p className="text-purple-700">Earn tokens for sustainable purchases</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Purchase Type Selection */}
          <div>
            <label className="block text-sm font-medium text-purple-900 mb-3">
              Purchase Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPurchaseType('solar')}
                className={`py-4 rounded-xl font-medium transition-all ${
                  purchaseType === 'solar'
                    ? 'bg-purple-700 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                ☀️ Solar Panel
              </button>
              <button
                type="button"
                onClick={() => setPurchaseType('ev')}
                className={`py-4 rounded-xl font-medium transition-all ${
                  purchaseType === 'ev'
                    ? 'bg-purple-700 text-white shadow-lg'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
              >
                🚗 Electric Vehicle
              </button>
            </div>
          </div>

          {/* Solar Panel Form */}
          {purchaseType === 'solar' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Solar Company/Brand *
                </label>
                <input
                  type="text"
                  required
                  value={formData.solarCompany}
                  onChange={(e) => setFormData({ ...formData, solarCompany: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                  placeholder="e.g., Tata Solar, Adani Solar"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Panel Capacity (kW) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.1"
                    value={formData.panelCapacity}
                    onChange={(e) => setFormData({ ...formData, panelCapacity: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                    placeholder="e.g., 5.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Number of Panels *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.numberOfPanels}
                    onChange={(e) => setFormData({ ...formData, numberOfPanels: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                    placeholder="e.g., 12"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Installation Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.installationDate}
                  onChange={(e) => setFormData({ ...formData, installationDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* EV Form */}
          {purchaseType === 'ev' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    EV Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.evBrand}
                    onChange={(e) => setFormData({ ...formData, evBrand: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                    placeholder="e.g., Tesla, Tata"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Model *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.evModel}
                    onChange={(e) => setFormData({ ...formData, evModel: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                    placeholder="e.g., Model 3, Nexon EV"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Battery Capacity (kWh) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.1"
                  value={formData.batteryCapacity}
                  onChange={(e) => setFormData({ ...formData, batteryCapacity: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                  placeholder="e.g., 40.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                  placeholder="e.g., MH12AB1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Purchase Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-700 transition-colors"
                />
              </div>
            </motion.div>
          )}

          {/* Common File Uploads */}
          {purchaseType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Upload Invoice/Bill *
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'invoiceFile')}
                  className="hidden"
                  id="invoice-upload"
                />
                <label
                  htmlFor="invoice-upload"
                  className="w-full px-4 py-6 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-700 transition-colors"
                >
                  <Upload className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm text-purple-700">
                    {formData.invoiceFile ? formData.invoiceFile.name : 'Click to upload invoice (PDF, JPG, PNG)'}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Upload Proof Photo *
                </label>
                <input
                  type="file"
                  required
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, 'proofFile')}
                  className="hidden"
                  id="proof-upload"
                />
                <label
                  htmlFor="proof-upload"
                  className="w-full px-4 py-6 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-700 transition-colors"
                >
                  <Upload className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm text-purple-700">
                    {formData.proofFile ? formData.proofFile.name : 'Click to upload proof photo (JPG, PNG)'}
                  </span>
                  <span className="text-xs text-purple-600 mt-1">
                    {purchaseType === 'solar' ? 'Photo of installed solar panels' : 'Photo of your EV'}
                  </span>
                </label>
              </div>
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!purchaseType}
            whileHover={{ scale: purchaseType ? 1.02 : 1 }}
            whileTap={{ scale: purchaseType ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all ${
              purchaseType
                ? 'bg-gradient-to-r from-purple-700 to-indigo-800 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {submitted ? (
              <>
                <CheckCircle className="w-5 h-5" />
                Submitted Successfully!
              </>
            ) : (
              'Submit & Earn Tokens'
            )}
          </motion.button>
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-xl">
          <p className="text-sm text-purple-900">
            🎁 <strong>Token Reward:</strong> Earn significant bonus tokens for investing in sustainable technology!
          </p>
        </div>
      </motion.div>
    </div>
  );
}