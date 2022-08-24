import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="97" height="71" viewBox="0 0 97 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M48.3854 67.6615H48.4427" stroke="#646583" stroke-width="6.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.9687 52.2448C41.4844 43.7292 55.2917 43.7292 63.8073 52.2448" stroke="#7E7E94" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.5468 36.8229C34.5781 19.7917 62.1927 19.7917 79.2239 36.8229" stroke="#9896A8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.13019 21.4062C27.7396 -4.14583 69.2031 -4.14583 94.8073 21.4062" stroke="#B0B0BC" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
