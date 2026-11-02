import React, { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import styles from './Dropdown.module.css';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger, children, align = 'left', className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      const triggerBtn = dropdownRef.current?.querySelector('button');
      triggerBtn?.focus();
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    }
  };

  return (
    <div className={cn(styles.container, className)} ref={dropdownRef} onKeyDown={handleKeyDown}>
      <div 
        onClick={toggleDropdown} 
        onKeyDown={handleTriggerKeyDown}
        className={styles.trigger}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>
      {isOpen && (
        <div 
          className={cn(styles.menu, styles[align])} 
          onClick={() => setIsOpen(false)}
          role="menu"
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const DropdownItem: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className, ...props
}) => {
  return <button role="menuitem" className={cn(styles.item, className)} {...props} />;
};
