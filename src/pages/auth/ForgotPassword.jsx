import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiMail, FiArrowLeft, FiCheckCircle, FiSend } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../utils/validation';
import ThemeToggle from '../../components/common/ThemeToggle';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, loading } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchedEmail = watch('email');

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    setEmail(data.email);
    
    try {
      const result = await forgotPassword(data.email);
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/verify-otp', { state: { email: data.email } });
        }, 2000);
      } else {
        setError(result.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const floatingFoods = [
    { emoji: '🔑', x: '10%', y: '10%', delay: 0 },
    { emoji: '📧', x: '85%', y: '15%', delay: 1 },
    { emoji: '🔒', x: '5%', y: '70%', delay: 2 },
    { emoji: '✉️', x: '90%', y: '75%', delay: 0.5 },
    { emoji: '📱', x: '50%', y: '5%', delay: 1.5 },
  ];

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
      {/* Animated Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        {/* Gradient Orbs */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-160px',
            right: '-160px',
            width: '384px',
            height: '384px',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-160px',
            width: '384px',
            height: '384px',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'rgba(59,130,246,0.05)',
            borderRadius: '50%',
            filter: 'blur(80px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Icons */}
        {floatingFoods.map((item, index) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              fontSize: '3rem',
              opacity: 0.1,
              left: item.x,
              top: item.y,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(circle at 20px 20px, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Theme Toggle */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        zIndex: 20
      }}>
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
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
            style={{
              display: 'inline-block',
              padding: '16px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))',
              marginBottom: '16px'
            }}
          >
            <span style={{ fontSize: '3rem' }}>🔐</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ef4444, #f97316, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Forgot Password?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ color: '#6b7280', marginTop: '8px' }}
          >
            Enter your email to receive a password reset OTP
          </motion.p>
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
            <FiCheckCircle size={24} color="#22c55e" />
            <div>
              <p style={{ color: '#16a34a', fontWeight: '600' }}>OTP Sent Successfully!</p>
              <p style={{ color: '#22c55e', fontSize: '14px' }}>
                We've sent a 6-digit OTP to {email}
              </p>
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

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            padding: '16px',
            borderRadius: '16px',
            backgroundColor: 'rgba(59,130,246,0.05)',
            border: '1px solid rgba(59,130,246,0.1)',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px'
          }}
        >
          <span style={{ fontSize: '20px' }}>💡</span>
          <div>
            <p style={{ fontSize: '14px', color: '#4b5563', fontWeight: '500' }}>
              What happens next?
            </p>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
              We'll send a 6-digit OTP to your email. Enter it on the next page to reset your password.
            </p>
          </div>
        </motion.div>

        {/* Forgot Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Field */}
          <motion.div variants={itemVariants}>
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
                  fontSize: '16px',
                  color: '#1f2937'
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
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    color: '#ef4444',
                    fontSize: '14px',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>⚠️</span> {errors.email.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Send OTP Button */}
          <motion.button
            type="submit"
            disabled={isLoading || loading || showSuccess}
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
              opacity: (isLoading || loading || showSuccess) ? 0.5 : 1
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              if (!isLoading && !loading && !showSuccess) {
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
                Sending OTP...
              </>
            ) : showSuccess ? (
              <>
                <FiCheckCircle size={20} />
                OTP Sent!
              </>
            ) : (
              <>
                <FiSend size={20} />
                Send OTP
              </>
            )}
          </motion.button>
        </form>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: '24px',
            textAlign: 'center'
          }}
        >
          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#6b7280';
            }}
          >
            <FiArrowLeft size={16} />
            Back to Sign In
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center',
            fontSize: '12px',
            color: '#9ca3af'
          }}
        >
          <p>
            Need help?{' '}
            <a
              href="#"
              style={{
                color: '#ef4444',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Add CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes slideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ForgotPassword;