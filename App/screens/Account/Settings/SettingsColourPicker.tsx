import React, {useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {ColorWheel} from 'react-native-color-wheel';
// import { ColorPicker } from 'react-native-color-picker'
import ColorPicker from 'react-native-wheel-color-picker';
import {COLORS} from '../../../styles/Constants';
export const SettingsColourPicker = () => {
  const [color, setColor] = useState('#ddd');
  return (
    <View style={styles.container}>
      <View>
        <ColorPicker
          color={color}
          // swatchesOnly={this.state.swatchesOnly}
          onColorChange={value => {
            setColor(value);
          }}
          // onColorChangeComplete={value => console.log(value)}
          thumbSize={40}
          sliderSize={40}
          noSnap={true}
          row={false}
          // swatchesLast={this.state.swatchesLast}
          swatches={true}
          discrete={false}
        />
        {/* <ColorWheel
          initialColor="#eeff00"
          onColorChange={(color) => console.log(color )}
          onColorChangeComplete={color => console.log({color})}
          style={{
            width: 300,
            height: 300,
            background:
              'url("https://raw.githubusercontent.com/netbeast/react-native-color-wheel/master/color-wheel.png")',
            backgroundSize: 'cover',
          }}
          thumbStyle={{height: 10, width: 10, borderRadius: 20}}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2A2E63',
    height: '100%',
    paddingHorizontal: 40,
  },
  box: {
    marginTop: 10,
    height: 80,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
