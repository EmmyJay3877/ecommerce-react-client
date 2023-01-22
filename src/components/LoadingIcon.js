import React from 'react';
import '../index.css'
import { useStateContext } from '../StateContext';

const LoadingIcon = () => {
    const { showLoading } = useStateContext()
  return (
    <div>
        { showLoading===true && <div className="loading-icon"></div>}
    </div>
  );
};

export default LoadingIcon;
