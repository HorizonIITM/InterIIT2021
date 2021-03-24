import React from 'react';
import './CardComp.css';
import { Card } from 'antd';
import { Descriptions } from 'antd';

const CardComp = ({ starData }) => {
  if (starData === null) return null;
  return (
    <div
      style={{
        // height: 600,
        width: 470,
        // backgroundColor: 'coral',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 30,
      }}
    >
      {/* <h6>jdjjn Latitude :</h6> */}

      <Descriptions title={starData.Name} bordered layout="vertical">
        {/* <Descriptions.Item label="Name"></Descriptions.Item> */}
        <Descriptions.Item label="RA">
          {starData.RAh}h {starData.RAm}m {starData.RAs}s
        </Descriptions.Item>
        <Descriptions.Item label="DEC">
          {starData['DE-']}
          {starData.DEd}d {starData.DEm}m {starData.DEs}s
        </Descriptions.Item>
        <Descriptions.Item label="Observed by AstroSat">
          {starData.isObserved ? 'Yes' : 'No'}
        </Descriptions.Item>
        <Descriptions.Item label="Galactic Latitude">
          {starData.GLAT}
        </Descriptions.Item>
        <Descriptions.Item label="Galactic Longitude">
          {starData.GLON}
        </Descriptions.Item>
        <Descriptions.Item label="AstroSat Publication">
          {starData.isReferred ? 'Yes' : 'No'}
        </Descriptions.Item>
        {/* <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item> */}
      </Descriptions>
    </div>
  );
};

export default CardComp;
