import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
export const Validation = (type, field) => {
  let error = '';

  if (type == 'password') {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    // const uppercasePassword = uppercaseRegExp.test(field);
    const digitsPassword = digitsRegExp.test(field);
    const specialCharPassword = specialCharRegExp.test(field);
    switch (true) {
      case !field.length:
        error = 'password required';
        break;
      case field.length < 8:
        error = 'Password must contain at least 8 symbols';
        break;
      // case !uppercasePassword:
      //   error = 'Password should contain at least 1 uppercase symbol';
      //   break;
      case !digitsPassword:
        error = 'Password should contain at least one digit';
        break;
      case !specialCharPassword:
        error = 'Password should contain at least 1 special character';
        break;
    }
  } else if (type == 'email') {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    reg.test(field) == false ? (error = 'email is not correct') : '';
  } else if (type == 'name') {
    let nameRegex = /^[a-zA-Z\-]+$/;
    console.log(field);
    switch (true) {
      case !field.length:
        error = 'Name is required';
        break;
      case field.length < 2:
        error = 'Name is too short';
        break;
      case !nameRegex.test(field):
        error = 'Name is incorect';
        break;
    }
  } else if (type == 'date') {
    console.log('ssssss', moment(new Date()).diff(moment(field), 'years') < 12);
    if (
      moment(field).format('DD-MM-YYYY') ==
      moment(new Date()).format('DD-MM-YYYY')
    ) {
      error = 'Please, choose a correct date of birth';
    } else if (moment(new Date()).diff(moment(field), 'years') < 12) {
      error = 'You are too yong to have a child';
    }
  }
  console.log('error', error);
  return error;
};
