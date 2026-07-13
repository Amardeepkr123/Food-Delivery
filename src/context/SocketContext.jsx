// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuthContext } from './AuthContext';

// Create context
const SocketContext = createContext(null);

// Custom hook to use socket
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

// Socket Provider Component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const { user, isAuthenticated } = useAuthContext();

  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

  // ✅ FIX: Use useRef to track connection state without causing re-renders
  const isConnectedRef = useRef(false);
  const isConnectingRef = useRef(false);

  // ✅ FIX: Disconnect function - stable with useCallback
  const disconnectSocket = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setSocket(null);
      setIsConnected(false);
      setIsConnecting(false);
      isConnectedRef.current = false;
      isConnectingRef.current = false;
    }
  }, []);

  // ✅ FIX: Connect function - stable with useCallback
  const connectSocket = useCallback(() => {
    // Don't connect if no user
    if (!user || !isAuthenticated) {
      return;
    }

    // Don't reconnect if already connected or connecting
    if (isConnectedRef.current || isConnectingRef.current) {
      return;
    }

    isConnectingRef.current = true;
    setIsConnecting(true);

    const token = localStorage.getItem('token');

    const newSocket = io(SOCKET_URL, {
      auth: {
        token: token || '',
        userId: user.id,
        userRole: user.role || 'customer',
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('✅ Socket connected successfully');
      setIsConnected(true);
      setConnectionError(null);
      setIsConnecting(false);
      isConnectedRef.current = true;
      isConnectingRef.current = false;
    });

    newSocket.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      isConnectedRef.current = false;
      
      if (reason === 'io server disconnect') {
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }
        reconnectTimeoutRef.current = setTimeout(() => {
          if (socketRef.current) {
            socketRef.current.connect();
          }
        }, 2000);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      setConnectionError(error.message);
      setIsConnected(false);
      setIsConnecting(false);
      isConnectedRef.current = false;
      isConnectingRef.current = false;
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log(`🔄 Socket reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
      setConnectionError(null);
      isConnectedRef.current = true;
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`🔄 Socket reconnection attempt ${attemptNumber}`);
    });

    newSocket.on('reconnect_error', (error) => {
      console.error('❌ Socket reconnection error:', error.message);
    });

    newSocket.on('reconnect_failed', () => {
      console.error('❌ Socket reconnection failed');
      setConnectionError('Failed to reconnect to server');
      setIsConnecting(false);
      isConnectingRef.current = false;
    });

    // Cleanup function for this connection
    return () => {
      if (newSocket) {
        newSocket.off('connect');
        newSocket.off('disconnect');
        newSocket.off('connect_error');
        newSocket.off('reconnect');
        newSocket.off('reconnect_attempt');
        newSocket.off('reconnect_error');
        newSocket.off('reconnect_failed');
      }
    };
  }, [user, isAuthenticated, SOCKET_URL]);

  // ✅ FIX: Only run effect when user or isAuthenticated changes
  useEffect(() => {
    if (user && isAuthenticated) {
      connectSocket();
    } else {
      disconnectSocket();
    }

    // Cleanup on unmount
    return () => {
      disconnectSocket();
    };
  }, [user, isAuthenticated, connectSocket, disconnectSocket]);

  // ✅ FIX: Event listener subscription - stable
  const on = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  // ✅ FIX: Event emitter - stable
  const emit = useCallback((event, data) => {
    if (socketRef.current && isConnectedRef.current) {
      socketRef.current.emit(event, data);
    } else {
      console.warn(`Socket not connected, cannot emit: ${event}`);
    }
  }, []);

  // ✅ FIX: Remove event listener - stable
  const off = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback);
    }
  }, []);

  // ✅ FIX: Once listener - stable
  const once = useCallback((event, callback) => {
    if (socketRef.current) {
      socketRef.current.once(event, callback);
    }
  }, []);

  // ✅ FIX: Join room - stable
  const joinRoom = useCallback((room) => {
    if (socketRef.current && isConnectedRef.current) {
      socketRef.current.emit('join', { room });
      console.log(`Joined room: ${room}`);
    }
  }, []);

  // ✅ FIX: Leave room - stable
  const leaveRoom = useCallback((room) => {
    if (socketRef.current && isConnectedRef.current) {
      socketRef.current.emit('leave', { room });
      console.log(`Left room: ${room}`);
    }
  }, []);

  // ✅ FIX: Manual reconnect - stable
  const reconnect = useCallback(() => {
    disconnectSocket();
    setTimeout(() => {
      connectSocket();
    }, 500);
  }, [connectSocket, disconnectSocket]);

  // ✅ FIX: Get connection status - stable
  const getConnectionStatus = useCallback(() => {
    return {
      isConnected: isConnectedRef.current,
      isConnecting: isConnectingRef.current,
      connectionError,
      socketId: socketRef.current?.id || null,
    };
  }, [connectionError]);

  const value = {
    socket,
    isConnected,
    isConnecting,
    connectionError,
    connect: connectSocket,
    disconnect: disconnectSocket,
    on,
    emit,
    off,
    once,
    joinRoom,
    leaveRoom,
    reconnect,
    getConnectionStatus,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;