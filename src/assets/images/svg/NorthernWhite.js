import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_4978" data-name="Group 4978" transform="translate(-131.325 -3082.693)">
    <path id="Path_7222" data-name="Path 7222" d="M131.325,3082.693h24v24h-24Z" fill="none"/>
    <circle id="Ellipse_493" data-name="Ellipse 493" cx="2" cy="2" r="2" transform="translate(141.325 3092.83)" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7223" data-name="Path 7223" d="M134.325,3094.693h4m5-9v4m5,5h4m-9,5v4m-4.5-13.5,1,1m8-1-1,1m0,7,1,1m-8-1-1,1" fill="none" stroke="#201a33" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
