import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="19.967" height="19.968" viewBox="0 0 19.967 19.968">
  <g id="Group_4969" data-name="Group 4969" transform="translate(-617.651 -1273.202)">
    <path id="Path_7211" data-name="Path 7211" d="M617.651,1273.2h19.967v19.968H617.651Z" fill="none"/>
    <path id="Path_7212" data-name="Path 7212" d="M625.971,1284.434a3.329,3.329,0,1,0,3.327,0v-7.072a1.663,1.663,0,1,0-3.327,0v7.072" fill="none" stroke="#ce9b51" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.248"/>
    <line id="Line_9" data-name="Line 9" x2="3.328" transform="translate(625.971 1280.69)" fill="none" stroke="#ce9b51" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.248"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
