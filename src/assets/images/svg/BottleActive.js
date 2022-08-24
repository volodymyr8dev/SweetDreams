import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 28 28">
  <g id="icon-2" transform="translate(-1327.246 -3253.998)" opacity="0.672">
    <rect id="bg-2" width="28" height="28" transform="translate(1327.246 3253.998)" fill="rgba(255,255,255,0)"/>
    <g id="Group_4958" data-name="Group 4958">
      <g id="Group_4938" data-name="Group 4938">
        <g id="Group_4937" data-name="Group 4937">
          <g id="Group_4936" data-name="Group 4936">
            <path id="Path_7193" data-name="Path 7193" d="M1341.247,3258.3a1.414,1.414,0,0,1,1.345,1.468.974.974,0,0,1-.006.132l-.065.754.588.477a3.37,3.37,0,0,1,1.056,1.542l.225.67.669.228a.685.685,0,0,1,.44.662v1.347a.759.759,0,0,1-.091.359l-.36.66.341.671a1.024,1.024,0,0,1,.111.471v8.961a.972.972,0,0,1-.938,1h-6.63a.971.971,0,0,1-.939-1v-8.961a1.022,1.022,0,0,1,.111-.471l.341-.671-.361-.661a.75.75,0,0,1-.091-.359v-1.347a.685.685,0,0,1,.441-.663l.669-.228.225-.668a3.346,3.346,0,0,1,1.058-1.543l.587-.476-.063-.753c0-.044-.005-.087-.005-.13a1.412,1.412,0,0,1,1.345-1.471m0-1.429a2.841,2.841,0,0,0-2.774,2.9,2.088,2.088,0,0,0,.01.25,4.786,4.786,0,0,0-1.511,2.2,2.113,2.113,0,0,0-1.41,2.016v1.347a2.17,2.17,0,0,0,.266,1.042,2.451,2.451,0,0,0-.266,1.118v8.961a2.4,2.4,0,0,0,2.368,2.428h6.63a2.4,2.4,0,0,0,2.367-2.428v-8.961a2.463,2.463,0,0,0-.266-1.118,2.194,2.194,0,0,0,.266-1.042v-1.347a2.113,2.113,0,0,0-1.409-2.016,4.8,4.8,0,0,0-1.509-2.2c.007-.083.011-.167.011-.25a2.842,2.842,0,0,0-2.774-2.9Z" fill="#ffcc86"/>
          </g>
          <rect id="Rectangle_1524" data-name="Rectangle 1524" width="8.681" height="1.402" transform="translate(1336.898 3265.932)" fill="#ffcc86"/>
          <rect id="Rectangle_1525" data-name="Rectangle 1525" width="8.681" height="1.402" transform="translate(1336.898 3262.716)" fill="#ffcc86"/>
          <rect id="Rectangle_1526" data-name="Rectangle 1526" width="2.486" height="1.402" transform="translate(1336.898 3269.148)" fill="#ffcc86"/>
          <rect id="Rectangle_1527" data-name="Rectangle 1527" width="2.486" height="1.402" transform="translate(1336.898 3271.65)" fill="#ffcc86"/>
          <rect id="Rectangle_1528" data-name="Rectangle 1528" width="2.486" height="1.402" transform="translate(1336.898 3274.151)" fill="#ffcc86"/>
        </g>
      </g>
    </g>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
