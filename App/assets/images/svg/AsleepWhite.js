import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="19.5" height="19.5" viewBox="0 0 19.5 19.5">
  <g id="Group_4983" data-name="Group 4983" transform="translate(-666.222 -590.481)">
    <path id="Path_7226" data-name="Path 7226" d="M666.972,600.231h1m8-9v1m8,8h1m-15.4-6.4.7.7m12.1-.7-.7.7" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7227" data-name="Path 7227" d="M672.972,604.231a5,5,0,1,1,6,0,3.5,3.5,0,0,0-1,3,2,2,0,0,1-4,0,3.5,3.5,0,0,0-1-3" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_19" data-name="Line 19" x2="4.6" transform="translate(673.672 605.231)" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7229" data-name="Path 7229" d="M675.972,598.231v3h2" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
