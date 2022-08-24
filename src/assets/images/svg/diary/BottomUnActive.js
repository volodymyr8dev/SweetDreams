import * as React from 'react';
import {SvgXml} from 'react-native-svg';
const xml = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="30"
  height="30"
  viewBox="0 0 72.92 72.92">
  <defs>
    <clipPath id="clip-path">
      <rect
        id="Rectangle_362"
        data-name="Rectangle 362"
        width="72.92"
        height="72.92"
        transform="translate(334.19 1786.153)"
        fill="none"
      />
    </clipPath>
  </defs>
  <g
    id="Group_1015"
    data-name="Group 1015"
    transform="translate(-334.19 -1786.153)">
    <g id="Group_1014" data-name="Group 1014" clip-path="url(#clip-path)">
      <g id="Group_14180" data-name="Group 14180">
        <g id="Group_14179" data-name="Group 14179" opacity="0">
          <g id="Group_14178" data-name="Group 14178">
            <g id="Group_1013" data-name="Group 1013">
              <g
                id="Group_1012"
                data-name="Group 1012"
                clip-path="url(#clip-path)">
                <g id="Group_14177" data-name="Group 14177">
                  <rect
                    id="Rectangle_5426"
                    data-name="Rectangle 5426"
                    width="72.92"
                    height="72.92"
                    transform="translate(334.19 1786.156)"
                    fill="#BBBCC6"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
        <path
          id="Path_19714"
          data-name="Path 19714"
          d="M348.875,1793.005a4.74,4.74,0,0,0-4.787,4.688v49.127a4.74,4.74,0,0,0,4.688,4.787h41.736a6.663,6.663,0,0,0,6.7-6.623h0v-45.275a6.663,6.663,0,0,0-6.62-6.7H348.875Zm-.966,53.815v-49.028a.9.9,0,0,1,.84-.958h34.586v50.931h-34.46a.96.96,0,0,1-.963-.953Zm45.575-47.106v45.192a2.822,2.822,0,0,1-2.776,2.865h-3.454v-50.953h3.365a2.886,2.886,0,0,1,2.865,2.883Z"
          fill="#BBBCC6"
        />
        <rect
          id="Rectangle_5428"
          data-name="Rectangle 5428"
          width="22.977"
          height="3.831"
          transform="translate(354.422 1807.462)"
          fill="#BBBCC6"
        />
        <rect
          id="Rectangle_5429"
          data-name="Rectangle 5429"
          width="22.977"
          height="3.831"
          transform="translate(354.422 1817.037)"
          fill="#BBBCC6"
        />
      </g>
    </g>
  </g>
</svg>
`;
export default ({style}) => <SvgXml xml={xml} style={style} />;
