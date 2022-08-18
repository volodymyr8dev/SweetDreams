import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16.91"
  height="18.18"
  viewBox="0 0 44.026 49.051">
  <path
    id="Path_31"
    data-name="Path 31"
    d="M945.779,130.759l-8.6-9.78a19.724,19.724,0,1,0-6.208,4.672l8.986,10.218a3.878,3.878,0,1,0,5.824-5.121h0ZM910.408,107.83a12.02,12.02,0,1,1,12.02,12.02h0a12.033,12.033,0,0,1-12.015-12.02Z"
    transform="translate(-902.722 -88.136)"
    fill="#fff"
  />
</svg>

`;
export default ({style}) => <SvgXml xml={xml} style={style} />;