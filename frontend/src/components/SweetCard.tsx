import React from 'react';
import { Sweet } from '../types';

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (sweetId: number) => void;
}

export const SweetCard: React.FC<SweetCardProps> = ({ sweet, onPurchase }) => {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity <= 5 && sweet.quantity > 0;

  const handlePurchase = () => {
    if (!isOutOfStock) {
      onPurchase(sweet.id);
    }
  };

  return (
    <div className="card">
      <div className="relative h-48 overflow-hidden">
        {sweet.imageUrl ? (
          <img 
            src={sweet.imageUrl} 
            alt={sweet.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/300x200/6366f1/FFFFFF?text=${encodeURIComponent(sweet.name)}`;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">🍬</div>
              <span className="text-sm">No image</span>
            </div>
          </div>
        )}
        
        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          {isOutOfStock ? (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              Low Stock
            </span>
          ) : (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              In Stock
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 flex-1">{sweet.name}</h3>
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
            {sweet.category}
          </span>
        </div>
        
        {sweet.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sweet.description}</p>
        )}
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-green-600">
            ₹{sweet.price}
          </div>
          <div className="text-sm text-gray-500">
            Stock: {sweet.quantity}
          </div>
        </div>
        
        <button
          onClick={handlePurchase}
          disabled={isOutOfStock}
          className={`btn w-full ${
            isOutOfStock 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'btn-success'
          }`}
        >
          {isOutOfStock ? 'Out of Stock' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
};