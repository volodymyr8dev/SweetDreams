import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="18.58" height="18.58" viewBox="0 0 48.468 48.466">
  <g id="Group_25" data-name="Group 25" transform="translate(-982.633 -88.958)">
    <path id="Path_30" data-name="Path 30" d="M1030.743,117.708h-19.266v19.35a32,32,0,0,1-4.838.366,25.839,25.839,0,0,1-4.382-.366v-19.35H983a40.378,40.378,0,0,1-.366-4.381c0-1.1.182-3.286.366-4.744h19.258V89.324a40.685,40.685,0,0,1,4.382-.366c1.1,0,3.374.182,4.838.366v19.259h19.258a30.741,30.741,0,0,1,.366,4.744A25.706,25.706,0,0,1,1030.743,117.708Z" fill="#fff"/>
  </g>
</svg>

`;
export default ({style}) => <SvgXml xml={xml} style={style} />;
