import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <g id="Group_4996" data-name="Group 4996" transform="translate(-328.912 -2535.828)" opacity="0.699">
    <path id="Path_7245" data-name="Path 7245" d="M328.912,2535.828h24v24h-24Z" fill="none"/>
    <path id="Path_7246" data-name="Path 7246" d="M339.237,2540.145a1.724,1.724,0,0,1,3.35,0,1.725,1.725,0,0,0,2.573,1.066,1.725,1.725,0,0,1,2.37,2.37,1.724,1.724,0,0,0,1.065,2.572,1.724,1.724,0,0,1,0,3.35,1.723,1.723,0,0,0-1.066,2.573,1.725,1.725,0,0,1-2.37,2.37,1.721,1.721,0,0,0-2.572,1.065,1.724,1.724,0,0,1-3.35,0,1.722,1.722,0,0,0-2.573-1.066,1.725,1.725,0,0,1-2.37-2.37,1.725,1.725,0,0,0-1.065-2.572,1.724,1.724,0,0,1,0-3.35,1.724,1.724,0,0,0,1.269-2.082,1.742,1.742,0,0,0-.2-.491,1.725,1.725,0,0,1,2.37-2.37,1.723,1.723,0,0,0,2.572-1.065Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <circle id="Ellipse_497" data-name="Ellipse 497" cx="3" cy="3" r="3" transform="translate(337.912 2544.828)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
