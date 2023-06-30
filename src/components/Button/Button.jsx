import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      {children || 'Load more'}
    </button>
  );
};

export default Button;
