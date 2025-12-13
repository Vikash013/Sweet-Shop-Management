import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

interface AuthPageProps {
  onSuccess: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page-container">
      {/* Background Elements */}
      <div className="auth-bg-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
      
      <div className="auth-content">
        <div className="auth-card">
          {/* Header Section */}
          <div className="auth-header">
            <div className="brand-icon">
              <span className="icon-emoji">🍭</span>
              <div className="icon-glow"></div>
            </div>
            <h1 className="brand-title">Sweet Shop</h1>
            <p className="brand-subtitle">Delightful management for your sweet business</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="auth-tabs">
            <div className="tab-slider" style={{ transform: `translateX(${isLogin ? '0%' : '100%'})` }}></div>
            <button
              className={`tab-button ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </button>
            <button
              className={`tab-button ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <svg className="tab-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <div className="form-container">
            {isLogin ? (
              <div key="login" className="form-wrapper">
                <LoginForm onSuccess={onSuccess} />
              </div>
            ) : (
              <div key="register" className="form-wrapper">
                <RegisterForm onSuccess={onSuccess} />
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="auth-footer">
            <div className="security-badge">
              <svg className="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secured with JWT Authentication</span>
            </div>
          </div>
        </div>
        
        {/* Switch Prompt */}
        <div className="switch-prompt">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="switch-link"
            >
              {isLogin ? "Create one now" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};