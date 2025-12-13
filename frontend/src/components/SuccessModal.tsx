import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    sweetName: string;
    quantity: number;
    total: number;
    paymentMode: string;
    orderId: string;
  };
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
        <div className="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        
        <div className="order-details">
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Item:</strong> {orderDetails.sweetName}</p>
          <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
          <p><strong>Total:</strong> ₹{orderDetails.total}</p>
          <p><strong>Payment:</strong> {orderDetails.paymentMode}</p>
        </div>

        <p className="success-message">
          {orderDetails.paymentMode === 'online' 
            ? 'Payment successful! Your order will be delivered soon.' 
            : 'Your order is confirmed! Pay cash on delivery.'}
        </p>

        <button className="success-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};