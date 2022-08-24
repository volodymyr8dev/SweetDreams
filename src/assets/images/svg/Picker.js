import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="16.79" height="16.841" viewBox="0 0 16.79 16.841">
  <path id="Path_691" data-name="Path 691" d="M1834.088,3151.3l-.955-.954a1.647,1.647,0,0,0-2.386,0l-1.7,1.7a1.741,1.741,0,0,0-2.114.205l-1.7,1.7.478.478-6,6a2.37,2.37,0,0,0-.546,2.454l-.886.886a1.687,1.687,0,0,0,2.386,2.387l.887-.887a2.34,2.34,0,0,0,2.454-.545l6-6,.477.477,1.7-1.7a1.586,1.586,0,0,0,.2-2.114l1.7-1.7A1.776,1.776,0,0,0,1834.088,3151.3Zm-9.886,11.387-2.387-2.387,4.841-4.841,2.387,2.387Z" transform="translate(-1817.759 -3149.836)" fill="#201a33" fill-rule="evenodd"/>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
