import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g id="Group_4984" data-name="Group 4984" transform="translate(-169.419 -432.553)">
    <path id="Path_7228" data-name="Path 7228" d="M169.419,432.553h32v32h-32Z" fill="none"/>
    <circle id="Ellipse_495" data-name="Ellipse 495" cx="9" cy="9" r="9" transform="translate(176.419 440.557)" fill="#3ab2ed" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <path id="Path_7229-2" data-name="Path 7229-2" d="M185.421,445.888v4h2.667" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_20" data-name="Line 20" x1="3.667" y2="2.667" transform="translate(175.086 437.887)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
    <line id="Line_21" data-name="Line 21" x2="3.667" y2="2.667" transform="translate(192.088 437.887)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
