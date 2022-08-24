import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="19.967" height="19.968" viewBox="0 0 19.967 19.968">
  <g id="Group_4969" data-name="Group 4969" transform="translate(-81.328 -2593.39)">
    <path id="Path_7211" data-name="Path 7211" d="M81.328,2593.39h19.967v19.968H81.328Z" fill="none"/>
    <path id="Path_7212" data-name="Path 7212" d="M89.648,2604.622a3.328,3.328,0,1,0,3.328,0v-7.072a1.664,1.664,0,1,0-3.328,0v7.072" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.248"/>
    <line id="Line_9" data-name="Line 9" x2="3.328" transform="translate(89.648 2600.878)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.248"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
