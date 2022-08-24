import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g id="Group_4986" data-name="Group 4986" transform="translate(-1256.444 -2924.393)">
    <path id="Path_7230" data-name="Path 7230" d="M1256.444,2924.393h32v32h-32Z" fill="none"/>
    <circle id="Ellipse_496" data-name="Ellipse 496" cx="5" cy="5" r="5" transform="translate(1267.444 2935.393)" fill="#8974ff" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7231" data-name="Path 7231" d="M1260.444,2940.393h1.333m10.667-12v1.333m10.667,10.667h1.333m-12,10.667v1.333m-8.533-20.533.933.933m16.133-.933-.933.933m0,15.2.933.933m-16.133-.933-.933.933" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
