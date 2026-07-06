// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const email = watch('email');

  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if user is admin
      if (user.role === 'admin' || user.isAdmin === true) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
    
    // Check for remembered email
    const remembered = localStorage.getItem('rememberMe');
    if (remembered) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setValue('email', rememberedEmail);
        setValue('rememberMe', true);
      }
    }
  }, [isAuthenticated, user, navigate, setValue]);

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    setShowSuccess(false);
    
    try {
      const result = await login(data.email, data.password, data.rememberMe);
      if (result.success) {
        setShowSuccess(true);
        // Check if user is admin
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setTimeout(() => {
          if (storedUser.role === 'admin' || storedUser.isAdmin === true) {
            navigate('/admin/dashboard');
          } else {
            navigate('/');
          }
        }, 1000);
      } else {
        setError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    setValue('email', 'admin@fooddelivery.com');
    setValue('password', 'admin123');
    setIsAdminLogin(true);
    // Auto submit after setting values
    setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 300);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundColor: '#f3f4f6',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorations */}
      <div style={{
        position: 'absolute',
        top: '-160px',
        right: '-160px',
        width: '384px',
        height: '384px',
        background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-160px',
        left: '-160px',
        width: '384px',
        height: '384px',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.1))',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }} />

      {/* Floating Food Items */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        fontSize: '4rem',
        opacity: 0.1,
        animation: 'float 6s ease-in-out infinite'
      }}>🍕</div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '5%',
        fontSize: '4rem',
        opacity: 0.1,
        animation: 'float 6s ease-in-out 2s infinite'
      }}>🍔</div>

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            style={{ fontSize: '3rem', display: 'inline-block' }}
          >
            🍕
          </motion.div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginTop: '8px',
            background: 'linear-gradient(135deg, #ef4444, #f97316, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back!
          </h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>
            Sign in to continue your food journey
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#f0fdf4',
              border: '2px solid #bbf7d0',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '24px' }}>✅</span>
            <div>
              <p style={{ color: '#16a34a', fontWeight: '600' }}>Login Successful!</p>
              <p style={{ color: '#22c55e', fontSize: '14px' }}>Redirecting to dashboard...</p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '16px',
              borderRadius: '16px',
              backgroundColor: '#fef2f2',
              border: '2px solid #fca5a5',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <p style={{ color: '#dc2626', fontSize: '14px' }}>{error}</p>
          </motion.div>
        )}

        {/* Admin Login Button */}
        <div style={{ marginBottom: '16px' }}>
          <button
            onClick={handleAdminLogin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #fef3c7, #fed7aa)',
              border: '2px solid #f59e0b',
              color: '#92400e',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 4px 12px rgba(245,158,11,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <FiShield size={20} style={{ color: '#d97706' }} />
            <span>Login as Admin (Demo)</span>
          </button>
          {isAdminLogin && (
            <p style={{
              fontSize: '12px',
              color: '#16a34a',
              marginTop: '8px',
              textAlign: 'center',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              ✓ Admin credentials loaded. Click Sign In to continue.
            </p>
          )}
          <p style={{
            fontSize: '11px',
            color: '#9ca3af',
            marginTop: '4px',
            textAlign: 'center'
          }}>
            Email: admin@fooddelivery.com | Password: admin123
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <FiMail size={20} />
              </div>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => validateEmail(value) || 'Please enter a valid email',
                })}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px'
                }}
                placeholder="you@example.com"
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  e.target.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.email && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>⚠️</span> {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <FiLock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px'
                }}
                placeholder="••••••••"
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  e.target.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.password ? '#ef4444' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '14px',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>⚠️</span> {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                {...register('rememberMe')}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '8px',
                  border: '2px solid #d1d5db',
                  accentColor: '#ef4444'
                }}
              />
              <span style={{ fontSize: '14px', color: '#6b7280' }}>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#ef4444',
                textDecoration: 'none'
              }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading || loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              color: 'white',
              fontWeight: '600',
              fontSize: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(239,68,68,0.3)',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: (isLoading || loading) ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading && !loading) {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 12px 32px rgba(239,68,68,0.4)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 24px rgba(239,68,68,0.3)';
            }}
          >
            {isLoading || loading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }} />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          position: 'relative',
          margin: '24px 0'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '100%',
              borderTop: '1px solid #e5e7eb'
            }} />
          </div>
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            fontSize: '14px'
          }}>
            <span style={{
              padding: '0 16px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              color: '#6b7280'
            }}>
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#ef4444';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '20px' }}>G</span>
            Google
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '20px' }}>f</span>
            Facebook
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: '16px',
              backgroundColor: 'white',
              border: '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.3s',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#6b7280';
              e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '20px' }}>🍎</span>
            Apple
          </button>
        </div>

        {/* Register Link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Don't have an account?{' '}
            <Link
              to="/register"
              style={{
                fontWeight: '600',
                color: '#ef4444',
                textDecoration: 'none'
              }}
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '16px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#9ca3af'
        }}>
          By signing in, you agree to our{' '}
          <a href="#" style={{ color: '#ef4444', textDecoration: 'none' }}>Terms of Service</a>
          {' '}and{' '}
          <a href="#" style={{ color: '#ef4444', textDecoration: 'none' }}>Privacy Policy</a>
        </div>
      </motion.div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Login;