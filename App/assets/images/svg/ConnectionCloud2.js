import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="98.127" height="98.127" viewBox="0 0 98.127 98.127">
  <defs>
    <clipPath id="clip-path">
      <rect id="Rectangle_131" data-name="Rectangle 131" width="98.127" height="98.127" transform="translate(673.874 3836.84)" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-2">
      <rect id="Rectangle_128" data-name="Rectangle 128" width="1.785" height="1.744" transform="translate(722.066 3909.561)" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-3">
      <rect id="Rectangle_129" data-name="Rectangle 129" width="24.176" height="5.838" transform="translate(710.852 3893.557)" fill="none"/>
    </clipPath>
    <clipPath id="clip-path-4">
      <rect id="Rectangle_130" data-name="Rectangle 130" width="47.306" height="10.629" transform="translate(699.286 3877.198)" fill="none"/>
    </clipPath>
  </defs>
  <g id="Group_10690" data-name="Group 10690" transform="translate(-673.874 -3836.84)">
    <g id="Group_817" data-name="Group 817">
      <g id="Group_816" data-name="Group 816" clip-path="url(#clip-path)">
        <g id="Group_10689" data-name="Group 10689">
          <g id="Group_10682" data-name="Group 10682" opacity="0.403">
            <g id="Group_10681" data-name="Group 10681">
              <g id="Group_811" data-name="Group 811">
                <g id="Group_810" data-name="Group 810" clip-path="url(#clip-path-2)">
                  <g id="Group_10680" data-name="Group 10680">
                    <line id="Line_232" data-name="Line 232" x2="0.041" transform="translate(722.938 3910.434)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_10685" data-name="Group 10685" opacity="0.602">
            <g id="Group_10684" data-name="Group 10684">
              <g id="Group_813" data-name="Group 813">
                <g id="Group_812" data-name="Group 812" clip-path="url(#clip-path-3)">
                  <g id="Group_10683" data-name="Group 10683">
                    <path id="Path_17092" data-name="Path 17092" d="M711.375,3898.871a16.353,16.353,0,0,1,23.128,0h0" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <g id="Group_10688" data-name="Group 10688" opacity="0.801">
            <g id="Group_10687" data-name="Group 10687">
              <g id="Group_815" data-name="Group 815">
                <g id="Group_814" data-name="Group 814" clip-path="url(#clip-path-4)">
                  <g id="Group_10686" data-name="Group 10686">
                    <path id="Path_17093" data-name="Path 17093" d="M699.809,3887.3a32.71,32.71,0,0,1,46.258,0h0" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <path id="Path_17094" data-name="Path 17094" d="M688.247,3875.741a49.2,49.2,0,0,1,69.507,0" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
        </g>
      </g>
    </g>
  </g>
</svg>


`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
