import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 35.675 36.802">
  <g id="Group_4941" data-name="Group 4941" transform="translate(-168.353 -752.673)">
    <path id="Path_7194" data-name="Path 7194" d="M182.571,773.379a.913.913,0,0,0,1.559-.951l-.018-.028a4.454,4.454,0,0,0-7.548,0,.913.913,0,0,0,1.542.979,2.628,2.628,0,0,1,4.466,0Zm9.461-3.067a4.46,4.46,0,0,0-3.774,2.088.913.913,0,0,0,1.542.979h0a2.628,2.628,0,0,1,4.465,0,.913.913,0,0,0,1.559-.951l-.017-.028a4.455,4.455,0,0,0-3.775-2.089Zm8.435.429a14.834,14.834,0,0,0-14.138-10.888,3.181,3.181,0,0,1-1.494-3.508,2.3,2.3,0,0,1,2.276-1.842,1.434,1.434,0,0,1,1.591,1.257q.008.064.009.129a.831.831,0,0,1-.266.647.781.781,0,0,1-.688.033.913.913,0,0,0-.513,1.753h0a2.552,2.552,0,0,0,2.3-.324,2.622,2.622,0,0,0,1-2.108,3.248,3.248,0,0,0-3.281-3.217c-.048,0-.1,0-.146.005a4.1,4.1,0,0,0-4.047,3.225,5.03,5.03,0,0,0,.792,4.131,14.854,14.854,0,0,0-11.956,10.705,3.94,3.94,0,0,0,0,7.842,14.81,14.81,0,0,0,28.564,0,3.939,3.939,0,0,0,0-7.841Zm-28.96,5.881a2.107,2.107,0,0,1,0-3.921A14.462,14.462,0,0,0,171.507,776.622Zm14.679,11.025a12.985,12.985,0,1,1,12.986-12.986,12.986,12.986,0,0,1-12.986,12.986Zm14.679-11.025a14.389,14.389,0,0,0,0-3.922,2.108,2.108,0,0,1,0,3.922Z" fill="#ACACBB"/>
    <g id="Group_4940" data-name="Group 4940">
      <path id="Path_7195" data-name="Path 7195" d="M186.231,783.44a8.438,8.438,0,0,1-4.375-1.24,1.08,1.08,0,0,1,1.2-1.795,6.079,6.079,0,0,0,6.3-.027,1.079,1.079,0,0,1,1.109,1.851A8.149,8.149,0,0,1,186.231,783.44Z" fill="#ACACBB"/>
    </g>
  </g>
</svg>

`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
