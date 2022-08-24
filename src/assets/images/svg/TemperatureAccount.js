import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_4991" data-name="Group 4991" transform="translate(-174 -1608.736)">
    <path id="Path_7232" data-name="Path 7232" d="M174,1608.736h24v24H174Z" fill="none"/>
    <path id="Path_742" data-name="Path 742" d="M188,1622.6v-4.865h-4v4.768a3.9,3.9,0,1,0,4,.1Z" fill="#7ad3a1"/>
    <path id="Path_7233" data-name="Path 7233" d="M184,1622.236a4,4,0,1,0,4,0v-8.5a2,2,0,0,0-4,0v8.5" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_22" data-name="Line 22" x2="4" transform="translate(184 1617.736)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
