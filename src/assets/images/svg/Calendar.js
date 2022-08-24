import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28">
  <g id="icon-3" transform="translate(-106.392 -759.661)" opacity="0.672">
    <rect id="bg-3" width="28" height="28" transform="translate(106.392 759.661)" fill="rgba(255,255,255,0)"/>
    <g id="Group_4960" data-name="Group 4960">
      <g id="Group_4934" data-name="Group 4934">
        <path id="Path_7192" data-name="Path 7192" d="M112.031,762.291a1.82,1.82,0,0,0-1.838,1.8v18.859a1.82,1.82,0,0,0,1.8,1.838h16.026a2.558,2.558,0,0,0,2.573-2.543.15.15,0,0,0,0-.03V764.865a2.557,2.557,0,0,0-2.542-2.573H112.031Zm-.368,20.661V764.129a.347.347,0,0,1,.325-.368h13.278v19.558H112.031a.37.37,0,0,1-.37-.366Zm17.5-18.088v17.353a1.082,1.082,0,0,1-1.065,1.1h-1.327V763.759h1.287a1.1,1.1,0,0,1,1.1,1.106Z" fill="#fff"/>
        <rect id="Rectangle_1522" data-name="Rectangle 1522" width="8.823" height="1.471" transform="translate(114.161 767.842)" fill="#fff"/>
        <rect id="Rectangle_1523" data-name="Rectangle 1523" width="8.823" height="1.471" transform="translate(114.161 771.519)" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
