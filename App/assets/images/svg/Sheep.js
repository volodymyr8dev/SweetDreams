import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="36.992" height="33.833" viewBox="0 0 36.992 33.833">
  <g id="Group_4925" data-name="Group 4925" transform="translate(-164.912 -2533.828)">
    <g id="Group_4922" data-name="Group 4922">
      <path id="Rectangle_1518" data-name="Rectangle 1518" d="M184.158,2560.719h0a1.381,1.381,0,0,1,1.381,1.381v4.18a1.381,1.381,0,0,1-1.381,1.381h0a1.381,1.381,0,0,1-1.381-1.381v-4.18A1.381,1.381,0,0,1,184.158,2560.719Z" fill="#673266"/>
      <path id="Rectangle_1519" data-name="Rectangle 1519" d="M191.233,2560.719h0a1.381,1.381,0,0,1,1.381,1.381v4.18a1.381,1.381,0,0,1-1.381,1.381h0a1.381,1.381,0,0,1-1.381-1.381v-4.18A1.381,1.381,0,0,1,191.233,2560.719Z" fill="#673266"/>
      <circle id="Ellipse_479" data-name="Ellipse 479" cx="12.569" cy="12.569" r="12.569" transform="translate(176.766 2538.388)" fill="#fff"/>
      <g id="Group_4919" data-name="Group 4919">
        <path id="Path_7184" data-name="Path 7184" d="M192.415,2542.959c-.489-.58-1.592-.474-2.452.235a2.763,2.763,0,0,0-.467.5c-2.672-1.992-6.493-1.71-8.528-.919a3.452,3.452,0,0,0-.5-.71c-.806-.89-1.89-1.231-2.417-.763s-.308,1.571.5,2.46a3.457,3.457,0,0,0,.56.5,6.779,6.779,0,0,0-.86,3.073c-.071,2,.373,6.864,2.854,9.175,0,0,1.986,2.7,5.752-.217,4.3-3.331,5.527-8.24,4.355-10.649a2.913,2.913,0,0,0,.54-.346c.86-.708,1.16-1.753.665-2.335" fill="#673266"/>
      </g>
      <g id="Group_4920" data-name="Group 4920">
        <circle id="Ellipse_480" data-name="Ellipse 480" cx="2.486" cy="2.486" r="2.486" transform="translate(178.956 2544.916)" fill="#fff"/>
        <circle id="Ellipse_481" data-name="Ellipse 481" cx="1.434" cy="1.434" r="1.434" transform="translate(179.46 2545.557)" fill="#673266"/>
        <circle id="Ellipse_482" data-name="Ellipse 482" cx="0.167" cy="0.167" r="0.167" transform="translate(181.304 2546.376)" fill="#fff"/>
      </g>
      <g id="Group_4921" data-name="Group 4921">
        <circle id="Ellipse_483" data-name="Ellipse 483" cx="2.486" cy="2.486" r="2.486" transform="translate(184.259 2545.607)" fill="#fff"/>
        <circle id="Ellipse_484" data-name="Ellipse 484" cx="1.434" cy="1.434" r="1.434" transform="translate(184.763 2546.248)" fill="#673266"/>
        <circle id="Ellipse_485" data-name="Ellipse 485" cx="0.167" cy="0.167" r="0.167" transform="translate(186.607 2547.067)" fill="#fff"/>
      </g>
      <path id="Rectangle_1520" data-name="Rectangle 1520" d="M187.437,2560.719h0a1.381,1.381,0,0,1,1.381,1.381v4.18a1.381,1.381,0,0,1-1.381,1.381h0a1.381,1.381,0,0,1-1.381-1.381v-4.18A1.381,1.381,0,0,1,187.437,2560.719Z" fill="#673266"/>
      <path id="Rectangle_1521" data-name="Rectangle 1521" d="M194.512,2559.626h0a1.381,1.381,0,0,1,1.381,1.381v5.273a1.381,1.381,0,0,1-1.381,1.381h0a1.381,1.381,0,0,1-1.381-1.381v-5.273A1.381,1.381,0,0,1,194.512,2559.626Z" fill="#673266"/>
    </g>
    <g id="Group_4924" data-name="Group 4924">
      <g id="Group_4923" data-name="Group 4923">
        <path id="Path_7185" data-name="Path 7185" d="M171.6,2542.184a4.972,4.972,0,0,1,3.22-4.655,4.971,4.971,0,1,0,0,9.309A4.977,4.977,0,0,1,171.6,2542.184Z" fill="#cc9a50"/>
      </g>
      <path id="Path_7186" data-name="Path 7186" d="M166.9,2536.212l-.334,1.625-1.651.394,1.547.407-.26,1.9,1.023-1.482,1.7,1.131-1.174-1.937,1.174-.992-1.487.364Z" fill="#cc9a50"/>
      <path id="Path_7187" data-name="Path 7187" d="M169.467,2533.828l-.169.832-.845.2.789.212-.13.971.52-.758.871.581-.6-.992.6-.507-.763.186Z" fill="#cc9a50"/>
    </g>
  </g>
</svg>



`;

export default ({style}) => <SvgXml xml={xml} style={style} />;
