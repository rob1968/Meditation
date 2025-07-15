import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  children, 
  className = '',
  variant = 'primary',
  ...props 
}) => {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;