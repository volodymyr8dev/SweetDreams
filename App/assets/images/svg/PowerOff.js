import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <g id="Group_4968" data-name="Group 4968" transform="translate(-161.911 -3971.24)">
    <g id="Ellipse_490" data-name="Ellipse 490">
      <circle id="Ellipse_85" data-name="Ellipse 85" cx="24" cy="24" r="24" transform="translate(161.911 3971.24)" fill="#6f6f6f"/>
      <circle id="Ellipse_86" data-name="Ellipse 86" cx="23" cy="23" r="23" transform="translate(162.911 3972.24)" fill="none" stroke="#ff4a4a" stroke-width="2"/>
    </g>
    <g id="Group_4967" data-name="Group 4967">
      <path id="Path_7209" data-name="Path 7209" d="M165.337,3974.7h41.111v41.111H165.337Z" fill="none"/>
      <path id="Path_7210" data-name="Path 7210" d="M177.328,3984.981a13.276,13.276,0,1,0,17.13,0" fill="none" stroke="#f0f0f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
      <line id="Line_8" data-name="Line 8" y2="13" transform="translate(185.911 3982.241)" fill="none" stroke="#f0f0f0" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
    </g>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
