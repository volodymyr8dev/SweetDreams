import moment from 'moment';
import { monthNames } from '../styles/Constants';

export const dateFormat     = date => moment(date).format('YYYY-MM-DD');
export const dateTimeFormat = date => moment(date).format('YYYY-MM-DD HH:mm:ss');
export const dateHMFormat   = date =>moment(date).format('YYYY-MM-DD HH:mm');
export const monthNameDate  = date =>{

    let month = new Date(date).getMonth();
    console.log("month",month)

return monthNames[month] +" " + new Date(date).getFullYear()
}