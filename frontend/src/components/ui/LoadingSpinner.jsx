import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  className = '',
  text = 'Loading...'
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;