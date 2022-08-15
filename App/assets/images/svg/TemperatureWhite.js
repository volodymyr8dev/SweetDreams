import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="9.523" height="19.477" viewBox="0 0 9.523 19.477">
  <g id="Group_4991" data-name="Group 4991" transform="translate(-134.92 -4228.083)">
    <path id="Path_7233" data-name="Path 7233" d="M137.682,4239.333a4,4,0,1,0,4,0v-8.5a2,2,0,0,0-4,0v8.5" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_22" data-name="Line 22" x2="4" transform="translate(137.682 4234.833)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
