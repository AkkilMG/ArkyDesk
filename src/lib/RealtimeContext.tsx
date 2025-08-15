"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface RealtimeUpdate {
  type: 'ticket_update' | 'comment_update' | 'connected' | 'heartbeat';
  updateType?: 'created' | 'updated' | 'deleted' | 'status_changed';
  ticket?: any;
  comment?: any;
  ticketId?: string;
  timestamp?: number;
  message?: string;
}

interface RealtimeContextType {
  isConnected: boolean;
  connectionError: string | null;
  lastUpdate: RealtimeUpdate | null;
  reconnect: () => void;
  disconnect: () => void;
}

const RealtimeContext = createContext<RealtimeContextType>({
  isConnected: false,
  connectionError: null,
  lastUpdate: null,
  reconnect: () => {},
  disconnect: () => {}
});

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

interface RealtimeProviderProps {
  children: ReactNode;
}

export const RealtimeProvider: React.FC<RealtimeProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<RealtimeUpdate | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [shouldConnect, setShouldConnect] = useState(true);

  const maxReconnectAttempts = 5;
  const reconnectDelay = (attempt: number) => Math.min(1000 * Math.pow(2, attempt), 30000);

  const connect = useCallback(() => {
    if (!shouldConnect) return;

    // Close existing connection
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }

    try {
      setConnectionError(null);
      const es = new EventSource('/api/realtime/tickets');
      
      es.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
        setReconnectAttempts(0);
        console.log('Real-time connection established');
      };

      es.onmessage = (event) => {
        try {
          const data: RealtimeUpdate = JSON.parse(event.data);
          setLastUpdate(data);
          
          if (data.type === 'connected') {
            console.log('Real-time connection confirmed:', data.message);
          } else if (data.type === 'ticket_update') {
            console.log('Ticket update received:', data.updateType, data.ticketId);
          } else if (data.type === 'comment_update') {
            console.log('Comment update received:', data.updateType, data.ticketId);
          }
        } catch (error) {
          console.error('Error parsing real-time message:', error);
        }
      };

      es.onerror = (error) => {
        console.error('SSE connection error:', error);
        setIsConnected(false);
        
        if (es.readyState === EventSource.CLOSED) {
          setConnectionError('Connection lost');
          
          // Attempt to reconnect with exponential backoff
          if (shouldConnect && reconnectAttempts < maxReconnectAttempts) {
            const delay = reconnectDelay(reconnectAttempts);
            console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts + 1}/${maxReconnectAttempts})`);
            
            setTimeout(() => {
              setReconnectAttempts(prev => prev + 1);
              connect();
            }, delay);
          } else if (reconnectAttempts >= maxReconnectAttempts) {
            setConnectionError('Unable to establish real-time connection. Please refresh the page.');
          }
        }
      };

      setEventSource(es);
    } catch (error) {
      console.error('Error creating SSE connection:', error);
      setConnectionError('Failed to create real-time connection');
      setIsConnected(false);
    }
  }, [shouldConnect, reconnectAttempts, eventSource]);

  const disconnect = useCallback(() => {
    setShouldConnect(false);
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
    setIsConnected(false);
    setConnectionError(null);
    setReconnectAttempts(0);
  }, [eventSource]);

  const reconnect = useCallback(() => {
    setShouldConnect(true);
    setReconnectAttempts(0);
    connect();
  }, [connect]);

  useEffect(() => {
    if (shouldConnect) {
      connect();
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [shouldConnect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  // Handle page visibility change to manage connections
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, disconnect to save resources
        disconnect();
      } else {
        // Page is visible, reconnect
        setShouldConnect(true);
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [connect, disconnect]);

  const value: RealtimeContextType = {
    isConnected,
    connectionError,
    lastUpdate,
    reconnect,
    disconnect
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};
