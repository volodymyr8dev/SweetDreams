import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 52.945 58.404">
  <g id="Group_73" data-name="Group 73" transform="translate(-348.017 -1790.051)">
    <path id="Path_21953" data-name="Path 21953" d="M346.787,1789.745a4.723,4.723,0,0,0-4.77,4.672v48.961a4.725,4.725,0,0,0,4.672,4.771h41.6a6.639,6.639,0,0,0,6.678-6.6h0v-45.122a6.639,6.639,0,0,0-6.6-6.681H346.787Zm-.963,53.633v-48.863a.9.9,0,0,1,.838-.954h34.469v50.76H346.787a.957.957,0,0,1-.96-.95Zm45.422-46.947v45.04a2.812,2.812,0,0,1-2.767,2.855h-3.442v-50.781h3.354a2.876,2.876,0,0,1,2.855,2.873Z" transform="translate(6 0.306)" fill="#bb9974"/>
    <rect id="Rectangle_7155" data-name="Rectangle 7155" width="22.9" height="3.818" transform="translate(358.316 1804.461)" fill="#bb9974"/>
    <rect id="Rectangle_7156" data-name="Rectangle 7156" width="22.9" height="3.818" transform="translate(358.316 1814.002)" fill="#bb9974"/>
  </g>
</svg>
`;
export default ({style}) => <SvgXml xml={xml} style={style} />;
