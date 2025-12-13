import React, { useState } from 'react';
import { Sweet } from '../types';

interface PurchaseModalProps {
  sweet: Sweet;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (orderData: OrderData) => void;
}

interface OrderData {
  sweetId: number;
  quantity: number;
  paymentMode: 'online' | 'offline';
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    pincode: string;
  };
}

export const PurchaseModal: React.FC<PurchaseModalProps> = ({
  sweet,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMode, setPaymentMode] = useState<'online' | 'offline'>('online');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    pincode: ''
  });
  const [isLoadingCity, setIsLoadingCity] = useState(false);

  const fetchCityFromPincode = async (pincode: string) => {
    if (pincode.length === 6) {
      setIsLoadingCity(true);
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
          const city = data[0].PostOffice[0].District;
          setAddress(prev => ({ ...prev, city }));
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      } finally {
        setIsLoadingCity(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      sweetId: sweet.id,
      quantity,
      paymentMode,
      address
    });
  };

  if (!isOpen || !sweet) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Purchase {sweet.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit}>
          <div className="order-summary">
            <img src={sweet.imageUrl} alt={sweet.name} className="sweet-image" />
            <div>
              <h3>{sweet.name}</h3>
              <p>₹{sweet.price} each</p>
            </div>
          </div>

          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              required
            />
            <p>Total: ₹{sweet.price * quantity}</p>
          </div>

          <div className="form-group">
            <label>Payment Mode:</label>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  value="online"
                  checked={paymentMode === 'online'}
                  onChange={(e) => setPaymentMode(e.target.value as 'online')}
                />
                💳 Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  value="offline"
                  checked={paymentMode === 'offline'}
                  onChange={(e) => setPaymentMode(e.target.value as 'offline')}
                />
                💵 Cash on Delivery
              </label>
            </div>
          </div>

          <div className="address-section">
            <h3>Delivery Address</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => setAddress({...address, fullName: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({...address, phone: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => setAddress({...address, street: e.target.value})}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                placeholder={isLoadingCity ? "Loading city..." : "City"}
                value={address.city}
                onChange={(e) => setAddress({...address, city: e.target.value})}
                disabled={isLoadingCity}
                required
              />
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => {
                  const pincode = e.target.value;
                  setAddress({...address, pincode});
                  fetchCityFromPincode(pincode);
                }}
                required
              />
            </div>
          </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
              <button type="submit" className="confirm-btn">
                {paymentMode === 'online' ? 'Pay Now' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};