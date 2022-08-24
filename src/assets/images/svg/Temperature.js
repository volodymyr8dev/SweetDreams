import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="9.523" height="19.477" viewBox="0 0 9.523 19.477">
  <g id="Group_4991" data-name="Group 4991" transform="translate(-135.397 -1702.673)">
    <path id="Path_7233" data-name="Path 7233" d="M138.158,1713.923a4,4,0,1,0,4,0v-8.5a2,2,0,0,0-4,0v8.5" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_22" data-name="Line 22" x2="4" transform="translate(138.158 1709.423)" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>



`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
