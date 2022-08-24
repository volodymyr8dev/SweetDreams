import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_4983-2" data-name="Group 4983-2" transform="translate(-663.972 -652.056)">
    <path id="Path_7225-2" data-name="Path 7225-2" d="M663.972,652.056h24v24h-24Z" fill="none"/>
    <path id="Path_7226-2" data-name="Path 7226-2" d="M666.972,664.056h1m8-9v1m8,8h1m-15.4-6.4.7.7m12.1-.7-.7.7" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7227-2" data-name="Path 7227-2" d="M672.972,668.056a5,5,0,1,1,6,0,3.5,3.5,0,0,0-1,3,2,2,0,0,1-4,0,3.5,3.5,0,0,0-1-3" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_19-2" data-name="Line 19-2" x2="4.6" transform="translate(673.672 669.056)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
