import React from 'react';
import { Shop } from '../types';

interface ShopCardProps {
  shop: Shop;
  onShopClick: (shopId: number) => void;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onShopClick }) => {
  return (
    <div 
      className="shop-card-modern cursor-pointer transform transition-all duration-300 hover:scale-105" 
      onClick={() => onShopClick(shop.id)}
    >
      <div className="shop-image-container">
        <img 
          src={shop.imageUrl || 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=250&fit=crop&crop=center'} 
          alt={shop.name}
          className="shop-image"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=250&fit=crop&crop=center';
          }}
        />
        {!shop.isOpen && (
          <div className="closed-overlay">
            <span className="closed-text">CLOSED</span>
          </div>
        )}
        <div className="status-badge">
          <span className={`status-pill ${shop.isOpen ? 'open' : 'closed'}`}>
            <span className="status-dot"></span>
            {shop.isOpen ? 'Open' : 'Closed'}
          </span>
        </div>
      </div>
      
      <div className="shop-content">
        <div className="shop-header">
          <h3 className="shop-name">{shop.name}</h3>
          <div className="rating-container">
            <span className="star-icon">⭐</span>
            <span className="rating-value">{shop.rating}</span>
          </div>
        </div>
        
        <p className="shop-description">{shop.description}</p>
        
        <div className="shop-meta">
          <div className="items-count">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>{shop._count?.sweets || 0} items</span>
          </div>
          
          <div className="location">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="address">{shop.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};