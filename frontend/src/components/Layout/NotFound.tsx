import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="text-9xl mb-8">🍭</div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Sweet! But this page doesn't exist
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for might have been moved, deleted, or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-primary"
          >
            🏠 Go Home
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};