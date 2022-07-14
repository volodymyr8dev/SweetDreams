import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#a0dfce"/>
      <stop offset="0.353" stop-color="#489c9c"/>
      <stop offset="1" stop-color="#378b91"/>
    </linearGradient>
  </defs>
  <g id="Group_4968" data-name="Group 4968" transform="translate(-1251.184 -2765.447)">
    <circle id="Ellipse_490" data-name="Ellipse 490" cx="24" cy="24" r="24" transform="translate(1251.184 2765.447)" fill="url(#linear-gradient)"/>
    <g id="Group_4967" data-name="Group 4967">
      <path id="Path_7209" data-name="Path 7209" d="M1254.61,2768.91h41.111v41.111H1254.61Z" fill="none"/>
      <path id="Path_7210" data-name="Path 7210" d="M1266.6,2779.188a13.275,13.275,0,1,0,17.13,0" fill="none" stroke="#7bffb8" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
      <line id="Line_8" data-name="Line 8" y2="13" transform="translate(1275.184 2776.448)" fill="none" stroke="#7bffb8" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    </g>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
