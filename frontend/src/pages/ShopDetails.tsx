import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Layout/Header';
import { SearchBar } from '../components/Layout/SearchBar';
import { ShopService } from '../services/ShopService';
import { SweetService } from '../services/SweetService';
import { SweetCard } from '../components/SweetCard';
import { PurchaseModal } from '../components/PurchaseModal';
import { SuccessModal } from '../components/SuccessModal';
import { Shop, Sweet } from '../types';

export const ShopDetails: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(null);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const shopService = new ShopService();
  const sweetService = new SweetService();

  useEffect(() => {
    if (shopId) {
      loadShopData();
    }
  }, [shopId]);

  const loadShopData = async () => {
    try {
      setLoading(true);
      const [shopData, sweetsData] = await Promise.all([
        shopService.getShopById(parseInt(shopId!)),
        shopService.getShopSweets(parseInt(shopId!))
      ]);
      setShop(shopData);
      setSweets(sweetsData);
    } catch (err: any) {
      setError('Failed to load shop data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    try {
      const sweetsData = await shopService.getShopSweets(parseInt(shopId!), searchTerm);
      setSweets(sweetsData);
    } catch (err: any) {
      setError('Search failed');
    }
  };

  const handlePurchase = (sweetId: number) => {
    const sweet = sweets.find(s => s.id === sweetId);
    if (sweet) {
      setSelectedSweet(sweet);
      setShowPurchaseModal(true);
    }
  };

  const handleConfirmPurchase = async (orderData: any) => {
    try {
      await sweetService.purchaseSweet({ 
        sweetId: orderData.sweetId, 
        quantity: orderData.quantity 
      });
      
      setOrderDetails({
        sweetName: selectedSweet?.name,
        quantity: orderData.quantity,
        total: (selectedSweet?.price || 0) * orderData.quantity,
        paymentMode: orderData.paymentMode === 'online' ? 'Online Payment' : 'Cash on Delivery',
        orderId: 'ORD' + Date.now()
      });
      
      setShowPurchaseModal(false);
      setShowSuccessModal(true);
      
      const sweetsData = await shopService.getShopSweets(parseInt(shopId!));
      setSweets(sweetsData);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Purchase failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Shop Details" />
        <div className="loading">
          <div className="spinner"></div>
          <span className="ml-2">Loading shop details...</span>
        </div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header title="Shop Details" />
        <div className="container py-8">
          <div className="card p-6 text-center">
            <div className="text-danger text-lg mb-4">⚠️ Error</div>
            <p className="text-gray-600">{error || 'Shop not found'}</p>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-primary mt-4"
            >
              Back to Shops
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={shop.name} />
      
      <main className="container py-8">
        <div className="animate-fade-in">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="btn btn-secondary mb-6 flex items-center gap-2"
          >
            ← Back to Shops
          </button>
          
          {/* Shop Header */}
          <div className="card mb-8 overflow-hidden">
            <div className="relative h-64">
              <img 
                src={shop.imageUrl || 'https://via.placeholder.com/1200x300?text=Sweet+Shop'} 
                alt={shop.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{shop.name}</h1>
                <p className="text-lg opacity-90">{shop.description}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-medium">{shop.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{shop.address}</span>
                </div>
                {shop.phone && (
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span>{shop.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className={shop.isOpen ? 'text-green-600' : 'text-red-600'}>
                    {shop.isOpen ? '🟢' : '🔴'}
                  </span>
                  <span className={`font-medium ${shop.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                    {shop.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sweets Section */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-6">Available Sweets</h2>
            
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search sweets in this shop..."
            />

            {sweets.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🍬</div>
                <h3 className="text-xl font-semibold mb-2">No sweets found</h3>
                <p className="text-gray-600">This shop doesn't have any sweets available right now</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sweets.map(sweet => (
                  <SweetCard
                    key={sweet.id}
                    sweet={sweet}
                    onPurchase={handlePurchase}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <PurchaseModal
        sweet={selectedSweet!}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onConfirm={handleConfirmPurchase}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        orderDetails={orderDetails}
      />
    </div>
  );
};