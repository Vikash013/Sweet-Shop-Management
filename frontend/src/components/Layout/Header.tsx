import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showLogout?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "Sweet Shop", 
  showLogout = true,
  onLogout 
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/auth');
    } else {
      localStorage.removeItem('token');
      navigate('/auth');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl">🍭</div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
          
          {showLogout && (
            <button 
              onClick={handleLogout}
              className="btn btn-danger"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};