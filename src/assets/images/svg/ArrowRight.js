import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20.111 20.111">
  <g id="Group_741" data-name="Group 741" transform="translate(-239.27 -2846.631)">
    <path id="Path_924" data-name="Path 924" d="M247.155,2852.057a.981.981,0,0,0,0,1.387l3.242,3.243-3.242,3.242a.981.981,0,1,0,1.388,1.387l3.935-3.935a.982.982,0,0,0,0-1.388l-3.936-3.936A.979.979,0,0,0,247.155,2852.057Z" fill="#fff"/>
    <path id="Path_925" data-name="Path 925" d="M249.325,2846.631a10.055,10.055,0,1,0,10.056,10.055A10.067,10.067,0,0,0,249.325,2846.631Zm3.152,10.75-3.935,3.935a.981.981,0,0,1-1.388-1.387l3.242-3.242-3.242-3.243a.981.981,0,0,1,1.388-1.387l3.936,3.936A.982.982,0,0,1,252.477,2857.381Z" fill="#fff" opacity="0.1"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
