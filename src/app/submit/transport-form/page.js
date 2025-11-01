'use client';
import { motion } from 'framer-motion';
import { Car, Bike, Bus, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function TransportForm() {
  const [isEV, setIsEV] = useState(null);
  const [vehicleType, setVehicleType] = useState('');
  const [formData, setFormData] = useState({
    evCapacity: '',
    odometerReading: '',
    vehicleModel: '',
    vehicleNumber: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const submitData = {
      isEV,
      vehicleType,
      ...formData,
      odometerReading: ['cycle', 'public'].includes(vehicleType) ? null : formData.odometerReading
    };
    console.log('Transport Data Submitted:', submitData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-200 py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Transport Mode</h1>
            <p className="text-blue-700">Earn tokens for sustainable commuting</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* EV or Not */}
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-3">
              Is your vehicle Electric? *
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsEV(true)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  isEV === true
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Yes, EV
              </button>
              <button
                type="button"
                onClick={() => setIsEV(false)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all ${
                  isEV === false
                    ? 'bg-blue-700 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                No, Non-EV
              </button>
            </div>
          </div>

          {/* Vehicle Type */}
          {isEV !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-blue-900 mb-3">
                Vehicle Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['4-wheeler', '2-wheeler', 'cycle', 'public-transport'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setVehicleType(type)}
                    className={`py-3 rounded-xl font-medium transition-all ${
                      vehicleType === type
                        ? 'bg-blue-700 text-white shadow-lg'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {type === '4-wheeler' && <Car className="w-5 h-5 mx-auto mb-1" />}
                    {type === '2-wheeler' && <Bike className="w-5 h-5 mx-auto mb-1" />}
                    {type === 'public-transport' && <Bus className="w-5 h-5 mx-auto mb-1" />}
                    <div className="text-sm capitalize">{type.replace('-', ' ')}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* EV Capacity (if EV) */}
          {isEV === true && vehicleType && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Battery Capacity (kWh) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.1"
                value={formData.evCapacity}
                onChange={(e) => setFormData({ ...formData, evCapacity: e.target.value })}
                className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors"
                placeholder="e.g., 40.5"
              />
            </motion.div>
          )}

          {/* Vehicle Details */}
          {vehicleType && !['cycle', 'public-transport'].includes(vehicleType) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors"
                  placeholder="e.g., Tesla Model 3, Honda Activa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Vehicle Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicleNumber}
                  onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors"
                  placeholder="e.g., MH12AB1234"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-900 mb-2">
                  Odometer Reading (km) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.odometerReading}
                  onChange={(e) => setFormData({ ...formData, odometerReading: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-700 transition-colors"
                  placeholder="Current odometer reading"
                />
              </div>
            </motion.div>
          )}

          {/* Public Transport/Cycle Info */}
          {vehicleType && ['cycle', 'public-transport'].includes(vehicleType) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-blue-50 rounded-xl"
            >
              <p className="text-sm text-blue-900">
                🎉 Excellent choice! {vehicleType === 'cycle' ? 'Cycling' : 'Public transport'} is 
                one of the most sustainable ways to travel. You'll earn bonus tokens!
              </p>
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={handleSubmit}
            disabled={!vehicleType}
            whileHover={{ scale: vehicleType ? 1.02 : 1 }}
            whileTap={{ scale: vehicleType ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 transition-all ${
              vehicleType
                ? 'bg-gradient-to-r from-blue-700 to-cyan-800 text-white cursor-pointer'
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

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm text-blue-900">
            🚗 <strong>Token Reward:</strong> Higher rewards for EVs, cycles, and public transport!
          </p>
        </div>
      </motion.div>
    </div>
  );
}