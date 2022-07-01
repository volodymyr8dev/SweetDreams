import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {getPrivacyPolicy} from '../../../api/CreateAccount/CreateAccount';
import {COLORS} from '../../../styles/Constants';

export const PrivacyPolicy = () => {
  const [content, setContent] = useState(
    '',
  );
  useEffect(() => {
    getPrivacyPolicy()
      .then(({data}) => {
        console.log('privacy', data);
        setContent(data.content);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Text style={{color: COLORS.text, paddingTop: 15}}>{content}</Text>
          {/* <Text style={{color: COLORS.text, paddingTop: 15}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            ducimus earum quod suscipit delectus, consectetur iusto repellendus
            quos reprehenderit fugit autem quaerat mollitia nostrum neque eaque
            incidunt doloremque soluta corporis. Numquam optio tenetur culpa
            sed, velit labore rem asperiores ut molestias atque eaque architecto
            nostrum nulla quasi! Commodi est perferendis ut in soluta, eum non
            eveniet dolorem sint facilis eaque odio, deleniti quis error iusto
            temporibus numquam corporis qui porro, nesciunt libero laboriosam.
            Repellat quisquam eos placeat libero culpa esse ex dolore saepe
            blanditiis eius maxime quibusdam nesciunt vitae amet in, quae, quod
            labore aut magnam voluptatem ab neque. Deserunt!
          </Text>
          <Text style={{color: COLORS.text, paddingTop: 15}}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
            ducimus earum quod suscipit delectus, consectetur iusto repellendus
            quos reprehenderit fugit autem quaerat mollitia nostrum neque eaque
            incidunt doloremque soluta corporis. Numquam optio tenetur culpa
            sed, velit labore rem asperiores ut molestias atque eaque architecto
            nostrum nulla quasi! Commodi est perferendis ut in soluta, eum non
            eveniet dolorem sint facilis eaque odio, deleniti quis error iusto
            temporibus numquam corporis qui porro, nesciunt libero laboriosam.
            Repellat quisquam eos placeat libero culpa esse ex dolore saepe
            blanditiis eius maxime quibusdam nesciunt vitae amet in, quae, quod
            labore aut magnam voluptatem ab neque. Deserunt!
          </Text> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#221B36',
    height: '100%',
  },
  box: {
    height: 66,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: COLORS.backGround,
    width: '100%',
    marginBottom: 7,
  },
  input: {
    marginBottom: 7,
    height: 66,
    width: '100%',
    borderRadius: 0,
    backgroundColor: COLORS.backGround,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});
