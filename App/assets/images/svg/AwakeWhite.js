import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="19.5" viewBox="0 0 19.5 19.5">
  <g id="Group_4983-2" data-name="Group 4983-2" transform="translate(-1212.521 -654.306)">
    <path id="Path_7226-2" data-name="Path 7226-2" d="M1213.271,664.056h1m8-9v1m8,8h1m-15.4-6.4.7.7m12.1-.7-.7.7" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7227-2" data-name="Path 7227-2" d="M1219.271,668.056a5,5,0,1,1,6,0,3.5,3.5,0,0,0-1,3,2,2,0,0,1-4,0,3.5,3.5,0,0,0-1-3" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_19-2" data-name="Line 19-2" x2="4.6" transform="translate(1219.971 669.056)" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
