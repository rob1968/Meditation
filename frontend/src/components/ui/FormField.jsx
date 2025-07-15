import React from 'react';
import styles from './FormField.module.css';

const FormField = ({ 
  label, 
  children, 
  className = '',
  required = false,
  ...props 
}) => {
  return (
    <div className={`${styles.field} ${className}`} {...props}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
    </div>
  );
};

export default FormField;