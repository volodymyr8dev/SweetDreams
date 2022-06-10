import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
export const Validation = (type, field) => {
  let error = '';

  if (type == 'password') {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const uppercasePassword = uppercaseRegExp.test(field);
    const digitsPassword = digitsRegExp.test(field);
    const specialCharPassword = specialCharRegExp.test(field);
    switch (true) {
      case !field.length:
        error = 'password required';
        break;
      case field.length < 8:
        error = 'password must be more than 8 letters';
        break;
      case !uppercasePassword:
        error = 'password should contain uppercase letter';
        break;
      case !digitsPassword:
        error = 'password should contain at least one digit';
        break;
      case !specialCharPassword:
        error = 'password  should contain at least one special char';
        break;
    }
  } else if (type == 'email') {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    reg.test(field) == false ? (error = 'email is not correct') : '';
  } else if (type == 'name') {
    let nameRegex = /^[a-zA-Z\-]+$/;
    switch (true) {
      case !field.length:
        error = 'Name is required';
        break;
      case field.length < 2:
        error = 'Name is too short';
      case !nameRegex.test(field):
        error = 'Name is incorect';
    }
  } else if (type == 'date') {
    if (
      moment(field).format('DD-MM-YYYY') ==
      moment(new Date()).format('DD-MM-YYYY')
    ) {
      error = 'Please, choose a correct date of birth';
    } else if (moment(new Date()).diff(moment(field), 'years')) {
      error = 'You are too small to have a child';
    }
  }

  return error;
};
