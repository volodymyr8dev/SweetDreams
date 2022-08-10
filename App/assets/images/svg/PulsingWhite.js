import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="18.929" height="16.545" viewBox="0 0 18.929 16.545">
  <g id="Group_726" data-name="Group 726" transform="translate(-133.86 -3149.564)">
    <path id="Path_890" data-name="Path 890" d="M147.227,3149.564a4.909,4.909,0,0,0-3.9,1.811,4.911,4.911,0,0,0-3.9-1.811c-3.327,0-5.562,3.082-5.562,5.96,0,4.19,8.048,9.805,8.966,10.432a.889.889,0,0,0,1,0c.918-.627,8.966-6.242,8.966-10.432C152.789,3152.646,150.554,3149.564,147.227,3149.564Z" fill="#201a33"/>
  </g>
</svg>



`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
