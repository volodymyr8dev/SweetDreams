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
} from 'react-native';

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  shown,
  setShown,
}) => {
  const navigation = useNavigation();
  const handleClicked = () => {
    setShown(true);
    setClicked(false);
  };
  useEffect(() => {
    console.log('clecked', clicked);
    navigation.setParams({
      headerShown: clicked,
      searchClicked: handleClicked,
    });
  }, [clicked]);
  return shown ? (
    <View style={shown ? styles.container : styles.containerHide}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        {/* search Icon */}

        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setClicked(true);
            setShown(false);
          }}>
          <View>
            <Text>Cancel</Text>
          </View>
        </TouchableOpacity>
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
    width: '93%',
  },
  containerHide: {},
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '85%',
  },
});
