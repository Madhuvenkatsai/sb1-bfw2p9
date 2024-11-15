import React from 'react';
import { ShoppingCart, AlertCircle, Heart } from 'lucide-react';
import { Medicine } from '../types';

interface MedicineCardProps {
  medicine: Medicine;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={medicine.image}
          alt={medicine.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{medicine.name}</h3>
        <p className="text-gray-600 mt-2">{medicine.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${medicine.price}</span>
            {medicine.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${medicine.originalPrice}
              </span>
            )}
          </div>
          {medicine.inStock ? (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="flex items-center text-red-500 space-x-1">
              <AlertCircle className="w-5 h-5" />
              <span>Out of Stock</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};