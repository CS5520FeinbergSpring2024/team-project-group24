import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Data from './Data';

interface DropDownProp {
  header: string;
}

const DropDownSelection: React.FC<DropDownProp> = ({header}) => {
  return (
    <View style={styles.container}>
      {Data.map(
        ({
          color,
          category,
          locationOptions,
          receiverOptions,
          emotionOptions,
        }) => {
          return (
            <TouchableOpacity
              key={category}
              onPress={() => {}}
              style={styles.mainContainer}>
              <View>
                <Text style={styles.headerText}>{header}</Text>
              </View>
              <Image
                style={styles.image}
                source={require('../assets/chevron-up.png')}
              />
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
};

export default DropDownSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  mainContainer: {
    flexDirection: 'row',
    borderColor: '#000000',
    borderWidth: 1,
    height: 50,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    color: '#000000',
    fontSize: 16,
  },
  image: {
    right: 0,
  },
});
