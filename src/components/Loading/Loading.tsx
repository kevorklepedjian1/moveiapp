import React from 'react';
import { Spin } from 'antd';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <Spin size="large" />
      <p className="loading__text">Loading...</p>
    </div>
  );
};

export default Loading; 