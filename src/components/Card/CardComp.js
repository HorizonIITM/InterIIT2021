import React from 'react';
import './CardComp.css';
import { Card } from 'antd';

const CardComp = ({ starData }) => {
  if (starData === null) return null;
  return (
    <div
      style={{
        // height: 600,
        width: 470,
        backgroundColor: 'coral',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 30,
      }}
    >
      <h6>jdjjn Latitude :</h6>
    </div>
  );
};

export default CardComp;
