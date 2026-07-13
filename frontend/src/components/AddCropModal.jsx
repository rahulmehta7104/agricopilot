import React, { useState, useEffect } from 'react';
import { X, Sprout } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

export default function AddCropModal({ isOpen, onClose, farmId, onCropAdded }) {
  const [crops, setCrops] = useState([]);
  const [loadingCrops, setLoadingCrops] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    cropId: '',
    season: 'Kharif',
    yieldEstimate: '',
    expectedHarvestDate: ''
  });

  useEffect(() => {
    if (isOpen) {
      const fetchCrops = async () => {
        try {
          const res = await api.get('/crops');
          setCrops(res.data.data || []);
        } catch (err) {
          toast.error('Failed to load crops');
        } finally {
          setLoadingCrops(false);
        }
      };
      fetchCrops();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.cropId) {
      toast.error('Please select a crop');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        farmId,
        cropId: formData.cropId,
        season: formData.season,
      };

      if (formData.yieldEstimate) {
        payload.yieldEstimate = Number(formData.yieldEstimate);
      }

      if (formData.expectedHarvestDate) {
        payload.expectedHarvestDate = new Date(formData.expectedHarvestDate).toISOString();
      }

      await api.post('/farms/crops', payload);
      toast.success('Crop added successfully');
      onCropAdded();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add crop');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-lg">
              <Sprout className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Crop</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Crop
            </label>
            <select
              name="cropId"
              value={formData.cropId}
              onChange={handleChange}
              disabled={loadingCrops}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              <option value="">Select a crop...</option>
              {crops.map(crop => (
                <option key={crop.id} value={crop.id}>{crop.cropName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Season
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            >
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
              <option value="Zaid">Zaid</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Yield Estimate (Optional)
            </label>
            <input
              type="number"
              name="yieldEstimate"
              value={formData.yieldEstimate}
              onChange={handleChange}
              placeholder="e.g. 500"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Expected Harvest Date (Optional)
            </label>
            <input
              type="date"
              name="expectedHarvestDate"
              value={formData.expectedHarvestDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Adding...' : 'Add Crop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
