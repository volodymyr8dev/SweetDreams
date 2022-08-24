import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 20.111 20.111">
  <g id="Group_740" data-name="Group 740" transform="translate(-119.27 -2846.631)">
    <path id="Path_922" data-name="Path 922" d="M131.784,2852.75a.981.981,0,0,0-1.675-.694l-3.935,3.936a.981.981,0,0,0,0,1.387l3.936,3.936a.981.981,0,0,0,1.388-1.386l-3.243-3.243,3.243-3.243A.978.978,0,0,0,131.784,2852.75Z" fill="#fff"/>
    <path id="Path_923" data-name="Path 923" d="M129.325,2846.631a10.055,10.055,0,1,0,10.056,10.055A10.067,10.067,0,0,0,129.325,2846.631Zm2.172,13.3a.981.981,0,0,1-1.388,1.386l-3.936-3.936a.981.981,0,0,1,0-1.387l3.935-3.936a.981.981,0,0,1,1.388,1.387l-3.243,3.243Z" fill="#fff" opacity="0.1"/>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
