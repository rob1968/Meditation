import React from 'react';
import styles from './Select.module.css';

const Select = ({ 
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <div className={styles.selectWrapper}>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${styles.select} ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;