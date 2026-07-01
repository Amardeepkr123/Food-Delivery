import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiEye, 
  FiEyeOff, 
  FiCheckCircle,
  FiArrowRight,
  FiPhone,
  FiAlertCircle
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validatePhone, validatePassword } from '../../utils/validation';
import ThemeToggle from '../../components/common/ThemeToggle';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isAuthenticated, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordStrengthText, setPasswordStrengthText] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setPasswordStrengthText('');
      return;
    }

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);

    const strengthMap = {
      0: { text: 'Very Weak', color: '#ef4444' },
      1: { text: 'Weak', color: '#f97316' },
      2: { text: 'Fair', color: '#eab308' },
      3: { text: 'Good', color: '#22c55e' },
      4: { text: 'Strong', color: '#22c55e' },
      5: { text: 'Very Strong', color: '#16a34a' },
    };
    setPasswordStrengthText(strengthMap[strength] || { text: '', color: '' });
  }, [password]);

  const onSubmit = async (data) => {
    setError('');
    setIsLoading(true);
    
    try {
      const userData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      
      const result = await registerUser(userData);
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
    // Implement social registration logic here
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
    { emoji: '🎉', x: '10%', y: '10%', delay: 0 },
    { emoji: '🌟', x: '85%', y: '15%', delay: 1 },
    { emoji: '✨', x: '5%', y: '70%', delay: 2 },
    { emoji: '🎊', x: '90%', y: '75%', delay: 0.5 },
    { emoji: '💫', x: '50%', y: '5%', delay: 1.5 },
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
            background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
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
            background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))',
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
          maxWidth: '480px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
          zIndex: 10,
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
            <span style={{ fontSize: '3rem' }}>🍕</span>
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
            Create Account
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ color: '#6b7280', marginTop: '8px' }}
          >
            Start your food delivery journey today
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
              <p style={{ color: '#16a34a', fontWeight: '600' }}>Account Created Successfully!</p>
              <p style={{ color: '#22c55e', fontSize: '14px' }}>Welcome to Food Delivery! 🎉</p>
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
            <FiAlertCircle size={24} color="#dc2626" />
            <p style={{ color: '#dc2626', fontSize: '14px' }}>{error}</p>
          </motion.div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Full Name */}
          <motion.div variants={itemVariants}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <FiUser size={20} />
              </div>
              <input
                type="text"
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                  maxLength: {
                    value: 50,
                    message: 'Name must be less than 50 characters',
                  }
                })}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.fullName ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px',
                  color: '#1f2937'
                }}
                placeholder="John Doe"
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  e.target.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.fullName ? '#ef4444' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.fullName && (
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
                  <span>⚠️</span> {errors.fullName.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Email */}
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

          {/* Phone Number */}
          <motion.div variants={itemVariants}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}>
                <FiPhone size={20} />
              </div>
              <input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  validate: (value) => validatePhone(value) || 'Please enter a valid 10-digit phone number',
                })}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px',
                  color: '#1f2937'
                }}
                placeholder="1234567890"
                maxLength={10}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  e.target.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.phone ? '#ef4444' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.phone && (
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
                  <span>⚠️</span> {errors.phone.message}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Password */}
          <motion.div variants={itemVariants}>
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
                  validate: (value) => validatePassword(value) || 'Password must be at least 8 characters',
                })}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px',
                  color: '#1f2937'
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
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                style={{ marginTop: '8px' }}
              >
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  marginBottom: '4px'
                }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: level <= passwordStrength ? passwordStrengthText.color : '#e5e7eb',
                        transition: 'all 0.3s'
                      }}
                    />
                  ))}
                </div>
                <p style={{
                  fontSize: '12px',
                  color: passwordStrengthText.color || '#6b7280',
                  fontWeight: '500'
                }}>
                  {passwordStrengthText.text || 'Enter a password'}
                </p>
              </motion.div>
            )}

            {errors.password && (
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
                <span>⚠️</span> {errors.password.message}
              </motion.p>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Confirm Password
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
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                style={{
                  width: '100%',
                  padding: '14px 48px 14px 48px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  border: `2px solid ${errors.confirmPassword ? '#ef4444' : '#e5e7eb'}`,
                  outline: 'none',
                  transition: 'all 0.3s',
                  fontSize: '16px',
                  color: '#1f2937'
                }}
                placeholder="••••••••"
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  e.target.style.boxShadow = '0 0 0 4px rgba(239,68,68,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.confirmPassword ? '#ef4444' : '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
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
                <span>⚠️</span> {errors.confirmPassword.message}
              </motion.p>
            )}
          </motion.div>

          {/* Terms & Conditions */}
          <motion.div variants={itemVariants}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                {...register('terms', {
                  required: 'You must accept the terms and conditions',
                })}
                style={{
                  marginTop: '4px',
                  width: '18px',
                  height: '18px',
                  borderRadius: '6px',
                  border: '2px solid #d1d5db',
                  accentColor: '#ef4444',
                  flexShrink: 0
                }}
              />
              <div>
                <p style={{ fontSize: '14px', color: '#4b5563' }}>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '500' }}>
                    Terms & Conditions
                  </a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: '500' }}>
                    Privacy Policy
                  </a>
                </p>
                {errors.terms && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      color: '#ef4444',
                      fontSize: '14px',
                      marginTop: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>⚠️</span> {errors.terms.message}
                  </motion.p>
                )}
              </div>
            </label>
          </motion.div>

          {/* Register Button */}
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
                Creating Account...
              </>
            ) : showSuccess ? (
              <>
                <FiCheckCircle size={20} />
                Account Created!
              </>
            ) : (
              <>
                Create Account
                <FiArrowRight size={20} />
              </>
            )}
          </motion.button>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialRegister('google')}
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
            <FcGoogle size={20} />
            Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialRegister('facebook')}
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
            <FaFacebook size={20} color="#1877f2" />
            Facebook
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSocialRegister('apple')}
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
            <FaApple size={20} />
            Apple
          </motion.button>
        </div>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                fontWeight: '600',
                color: '#ef4444',
                textDecoration: 'none'
              }}
            >
              Sign In
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb',
            textAlign: 'center',
            fontSize: '12px',
            color: '#9ca3af'
          }}
        >
          <p>
            By creating an account, you agree to our{' '}
            <a href="#" style={{ color: '#ef4444', textDecoration: 'none' }}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" style={{ color: '#ef4444', textDecoration: 'none' }}>Privacy Policy</a>
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
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Register;