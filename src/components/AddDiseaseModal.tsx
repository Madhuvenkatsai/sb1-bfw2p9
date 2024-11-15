import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Disease, Prescription } from '../types';

interface AddDiseaseModalProps {
  onClose: () => void;
  onAdd: (disease: Disease) => void;
}

export const AddDiseaseModal: React.FC<AddDiseaseModalProps> = ({ onClose, onAdd }) => {
  const [disease, setDisease] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePrescription = async (diseaseName: string, symptomsList: string[]): Promise<Prescription[]> => {
    // Simulated AI response for prescription generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [{
      id: Date.now().toString(),
      medicineName: `${diseaseName} Relief`,
      dosage: "1 tablet",
      timing: "twice daily",
      duration: "7 days",
      isHomeRemedy: false
    }];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const symptomsList = symptoms.split(',').map(s => s.trim());
    const prescriptions = await generatePrescription(disease, symptomsList);
    
    onAdd({
      id: Date.now().toString(),
      name: disease,
      symptoms: symptomsList,
      prescriptions
    });
    
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Condition</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Condition Name</label>
            <input
              type="text"
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Symptoms (comma-separated)</label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Prescription...</span>
              </>
            ) : (
              <span>Add Condition</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};