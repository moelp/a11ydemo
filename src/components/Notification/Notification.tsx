import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

import { useA11yContext } from '#/utils/a11yContext';
import Button from '#/components/Button/Button';

interface NotificationProps {
  isA11y?: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number | 0 | 3000 | 10000;
  className?: string;
  onClose: () => void;
}

export default function Notification({
  isA11y,
  message,
  type = 'info',
  duration = 10000,
  className,
  onClose,
}: NotificationProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [duration, onClose]);

  const classNotificationA11y = isA11y
    ? 'px-4 py-2 rounded-md '
    : 'px-[16px] py-[8px] rounded-[6px]';
  const classNotification =
    'w-full flex text-foregroundOnPrimary bg-primary shadow-xl';

  return (
    <div
      className={twMerge(
        `notification notification-${type} ${classNotification} ${classNotificationA11y}`,
        className
      )}>
      {message}
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}
