import React from "react";
import { TouchableOpacity, View,Text,StyleSheet } from "react-native";

export const arrayHeader = ['last 24 hours', 'last 7 days', 'last 28 days'];

  export const HeaderNavigation = ({activeTime, handleChangeTime}) => {
    return (
      <View
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          paddingTop: '4%',
        }}>
        {arrayHeader.map(item => (
          <TouchableOpacity onPress={()=>handleChangeTime(item)}>
            <View>
              <View style={{paddingHorizontal: 20}}>
                <Text
                  style={{
                    color: activeTime == item ? '#CE9B51' : '#fff',
                    paddingVertical: 4,
                    fontFamily: 'AntagometricaBT-Bold',
                  }}>
                  {item}
                </Text>
              </View>
              <View
                style={[ activeTime == item ? styles.borderActive : styles.border ]}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


  const styles = StyleSheet.create({
    border: {backgroundColor: '#292C62', height: 4},

    borderActive: {backgroundColor: '#CE9B51', height: 4},

  });
  