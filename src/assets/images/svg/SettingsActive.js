import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28">
  <g id="icon" transform="translate(-1387.246 -3253.998)" opacity="0.672">
    <rect id="bg" width="28" height="28" transform="translate(1387.246 3253.998)" fill="#ffcc86" opacity="0.004" style="isolation: isolate"/>
    <g id="Group_4933" data-name="Group 4933">
      <g id="Group_4932" data-name="Group 4932">
        <g id="Group_4929" data-name="Group 4929">
          <g id="Group_4928" data-name="Group 4928">
            <path id="Path_7190" data-name="Path 7190" d="M1401.246,3268.137a6.018,6.018,0,1,1,6.062-5.974,5.954,5.954,0,0,1-5.933,5.975Zm0-10.655a4.637,4.637,0,1,0,4.637,4.637,4.637,4.637,0,0,0-4.637-4.637Z" fill="#ffcc86"/>
          </g>
        </g>
        <g id="Group_4931" data-name="Group 4931">
          <g id="Group_4930" data-name="Group 4930">
            <path id="Path_7191" data-name="Path 7191" d="M1409.027,3278.725h-15.562a1.484,1.484,0,0,1-1.622-1.334c0-.029-.005-.059-.006-.089,0-4.056,4.137-7.356,9.221-7.356h.375c5.084,0,9.221,3.3,9.221,7.356A1.537,1.537,0,0,1,1409.027,3278.725Zm-15.809-1.423a.611.611,0,0,0,.247.042h15.562a.413.413,0,0,0,.247-.076c-.024-3.279-3.532-5.942-7.84-5.942h-.375c-4.323,0-7.841,2.681-7.841,5.975Z" fill="#ffcc86"/>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
