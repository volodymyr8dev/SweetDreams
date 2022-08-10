import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_4977" data-name="Group 4977" transform="translate(-131.325 -3018.701)">
    <path id="Path_7219" data-name="Path 7219" d="M131.325,3018.7h24v24h-24Z" fill="none"/>
    <path id="Path_7220" data-name="Path 7220" d="M134.325,3035.7h1m16,0h1m-15.4-6.4.7.7m12.1-.7-.7.7m-9.7,5.7a4,4,0,0,1,8,0" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_10" data-name="Line 10" x2="18" transform="translate(134.325 3039.83)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7221" data-name="Path 7221" d="M143.325,3021.7v6l3-3m-6,0,3,3" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
