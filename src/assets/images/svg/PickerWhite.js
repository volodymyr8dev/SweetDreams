import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="16.79" height="16.841" viewBox="0 0 16.79 16.841">
  <path id="Path_697" data-name="Path 697" d="M1236.578,3151.3l-.955-.954a1.647,1.647,0,0,0-2.386,0l-1.705,1.7a1.739,1.739,0,0,0-2.113.205l-1.7,1.7.477.478-6,6a2.369,2.369,0,0,0-.545,2.454l-.887.886a1.688,1.688,0,0,0,2.387,2.387l.886-.887a2.342,2.342,0,0,0,2.455-.545l6-6,.477.477,1.7-1.7a1.588,1.588,0,0,0,.2-2.114l1.7-1.7A1.778,1.778,0,0,0,1236.578,3151.3Zm-9.887,11.387-2.386-2.387,4.841-4.841,2.386,2.387Z" transform="translate(-1220.248 -3149.836)" fill="#fff" fill-rule="evenodd"/>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
