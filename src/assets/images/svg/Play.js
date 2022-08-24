import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 11.043 13.643">
  <path id="Path_926" data-name="Path 926" d="M52.453,2863.507v-13.643l11.043,6.822Z" transform="translate(-52.453 -2849.865)" fill="#fff"/>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
