import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Data from './Data';

interface DropDownProp {
  header: string;
}

const DropDownSelection: React.FC<DropDownProp> = () => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  return (
    <View style={styles.container}>
      {Data.map(
        (
          {color, category, locationOptions, receiverOptions, emotionOptions},
          index,
        ) => {
          return (
            <TouchableOpacity
              key={category}
              onPress={() => {
                setCurrentIndex(index === currentIndex ? null : index);
              }}
              style={styles.mainContainer}
              activeOpacity={0.9}>
              <View style={styles.card}>
                <Text style={styles.headerText}>{category}</Text>
                {index === currentIndex && (
                  <ScrollView showsVerticalScrollIndicator={true}>
                    <View style={styles.optionsContainer}>
                      <View style={styles.optionColumn}>
                        {locationOptions &&
                          locationOptions.map(locationOption => (
                            <Text
                              key={locationOption}
                              style={styles.optionText}>
                              {locationOption}
                            </Text>
                          ))}
                      </View>
                      <View style={styles.optionColumn}>
                        {receiverOptions && (
                          <View style={styles.optionColumn}>
                            {receiverOptions.map(receiverOption => (
                              <Text
                                key={receiverOption}
                                style={styles.optionText}>
                                {receiverOption}
                              </Text>
                            ))}
                          </View>
                        )}
                      </View>
                    </View>
                  </ScrollView>
                )}
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
    height: 400,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexGrow: 1,
  },
  mainContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    borderColor: '#000000',
    borderWidth: 1,
    height: 50,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionColumn: {
    flex: 1,
    marginRight: 20,
  },
  headerText: {
    color: '#000000',
    fontSize: 16,
  },
  optionText: {
    color: '#000000',
    fontSize: 14,
    marginRight: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  image: {
    right: 0,
  },
});
