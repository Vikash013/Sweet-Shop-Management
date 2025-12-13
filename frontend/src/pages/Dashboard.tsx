import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { SearchBar } from '../components/Layout/SearchBar';
import { ShopCard } from '../components/ShopCard';
import { ShopService } from '../services/ShopService';
import { Shop } from '../types';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [shops, setShops] = useState<Shop[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  
  const shopService = new ShopService();

  useEffect(() => {
    loadShops();
  }, []);

  const loadShops = async (search?: string) => {
    try {
      setLoading(true);
      const data = await shopService.getAllShops(search);
      setShops(data);
    } catch (err: any) {
      console.error('Shop loading error:', err);
      setError('Failed to load shops: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    loadShops(searchTerm);
  };

  const handleShopClick = (shopId: number) => {
    navigate(`/shop/${shopId}`);
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Sweet Shops" onLogout={onLogout} />
        <div className="loading">
          <div className="spinner"></div>
          <span className="ml-2">Loading shops...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Sweet Shops" onLogout={onLogout} />
        <div className="container py-8">
          <div className="card p-6 text-center">
            <div className="text-danger text-lg mb-4">⚠️ Error</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => loadShops()} 
              className="btn btn-primary mt-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Sweet Shops" onLogout={onLogout} />
      
      <main className="container py-8">
        <div className="animate-fade-in">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for sweet shops..."
          />

          {shops.length === 0 ? (
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">No shops found</h3>
              <p className="text-gray-600">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map(shop => (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  onShopClick={handleShopClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};