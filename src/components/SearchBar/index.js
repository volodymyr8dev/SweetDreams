// SearchBar.js
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Keyboard,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { getCombinedNavigation } from '../../hooks/useUpdateNavigationHeaderOptions';
import {useSelector}                                                   from 'react-redux';
import { RootReducerState }                                            from '../../../redux';
import Plus                                                            from '../../assets/images/svg/diary/Plus'

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  shown,
  setShown,
}) => {

  return shown ? (
    <View style={shown ? styles.container : styles.containerHide}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    </View>
  ) : null;
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '95%',
  },
  containerHide: {},
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 30,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#d9dbda',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'AntagometricaBT-Regular',
  },
});
