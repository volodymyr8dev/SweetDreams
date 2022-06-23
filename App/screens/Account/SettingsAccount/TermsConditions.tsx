import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {COLORS} from '../../../styles/Constants';

export const TermsConditions = () => {
 
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{color: COLORS.text, paddingTop: 15}}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
              ducimus earum quod suscipit delectus, consectetur iusto
              repellendus quos reprehenderit fugit autem quaerat mollitia
              nostrum neque eaque incidunt doloremque soluta corporis. Numquam
              optio tenetur culpa sed, velit labore rem asperiores ut molestias
              atque eaque architecto nostrum nulla quasi! Commodi est
              perferendis ut in soluta, eum non eveniet dolorem sint facilis
              eaque odio, deleniti quis error iusto temporibus numquam corporis
              qui porro, nesciunt libero laboriosam. Repellat quisquam eos
              placeat libero culpa esse ex dolore saepe blanditiis eius maxime
              quibusdam nesciunt vitae amet in, quae, quod labore aut magnam
              voluptatem ab neque. Deserunt!
            </Text>
            <Text style={{color: COLORS.text, paddingTop: 15}}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
              ducimus earum quod suscipit delectus, consectetur iusto
              repellendus quos reprehenderit fugit autem quaerat mollitia
              nostrum neque eaque incidunt doloremque soluta corporis. Numquam
              optio tenetur culpa sed, velit labore rem asperiores ut molestias
              atque eaque architecto nostrum nulla quasi! Commodi est
              perferendis ut in soluta, eum non eveniet dolorem sint facilis
              eaque odio, deleniti quis error iusto temporibus numquam corporis
              qui porro, nesciunt libero laboriosam. Repellat quisquam eos
              placeat libero culpa esse ex dolore saepe blanditiis eius maxime
              quibusdam nesciunt vitae amet in, quae, quod labore aut magnam
              voluptatem ab neque. Deserunt!
            </Text>
            <Text style={{color: COLORS.text, paddingTop: 15}}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis,
              ducimus earum quod suscipit delectus, consectetur iusto
              repellendus quos reprehenderit fugit autem quaerat mollitia
              nostrum neque eaque incidunt doloremque soluta corporis. Numquam
              optio tenetur culpa sed, velit labore rem asperiores ut molestias
              atque eaque architecto nostrum nulla quasi! Commodi est
              perferendis ut in soluta, eum non eveniet dolorem sint facilis
              eaque odio, deleniti quis error iusto temporibus numquam corporis
              qui porro, nesciunt libero laboriosam. Repellat quisquam eos
              placeat libero culpa esse ex dolore saepe blanditiis eius maxime
              quibusdam nesciunt vitae amet in, quae, quod labore aut magnam
              voluptatem ab neque. Deserunt!
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    backgroundColor: '#221B36',
    height: '100%',
  },
});
