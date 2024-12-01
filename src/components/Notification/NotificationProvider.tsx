'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Notification from './Notification';

import { useA11yContext } from '#/utils/a11yContext';

interface NotificationItem {
  id: number | string;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

interface NotificationContextType {
  addNotification: (
    message: string,
    type?: 'success' | 'error' | 'info',
    duration?: number
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const { state: a11yMode } = useA11yContext();
  const isA11y = a11yMode.isSemantic;

  const addNotification = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    duration = 3000
  ) => {
    const id = `notification-${uuidv4()}`;
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    setTimeout(() => removeNotification(id), duration);
  };

  const removeNotification = (id: number | string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div
        className="fixed top-24 end-8 w-11/12 max-w-96 flex flex-col gap-2 z-40"
        {...(isA11y && { 'aria-live': 'assertive' })}
        {...(isA11y && { role: 'status' })}>
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
            onClose={() => removeNotification(notif.id)}
            duration={notif.duration}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
