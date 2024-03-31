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

export default function DropDown() {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState<string>('');

  const handleLocationSelection = (location: string) => {
    setSelectedLocation(location);
  };

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
              style={styles.categoryContainer}
              activeOpacity={0.9}>
              <View style={styles.card}>
                <Text style={[styles.heading]}>{category}</Text>
                {index === currentIndex && (
                  <View style={styles.optionsContainer}>
                    <ScrollView showsVerticalScrollIndicator={true}>
                      <View style={styles.subCategoriesListContainer}>
                        <View style={styles.subCategoriesList}>
                          {locationOptions &&
                            locationOptions.map(locationOption => (
                              <TouchableOpacity
                                key={locationOption}
                                onPress={() =>
                                  handleLocationSelection(locationOption)
                                }
                                style={styles.locationOptionContainer}>
                                <Text
                                  key={locationOption}
                                  style={styles.subCategoriesList}>
                                  {locationOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      </View>
                    </ScrollView>
                    <ScrollView showsVerticalScrollIndicator={true}>
                      <View style={styles.subCategoriesListContainer}>
                        <View style={styles.subCategoriesList}>
                          {receiverOptions &&
                            receiverOptions.map(receiverOption => (
                              <TouchableOpacity
                                key={receiverOption}
                                onPress={() =>
                                  handleLocationSelection(receiverOption)
                                }
                                style={styles.locationOptionContainer}>
                                <Text
                                  key={receiverOption}
                                  style={styles.subCategoriesList}>
                                  {receiverOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                )}
              </View>
              <View
                style={[
                  styles.selectedOptionContainer,
                  {backgroundColor: color},
                ]}>
                <Text style={styles.selectedOption}>{selectedLocation}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  categoryContainer: {
    flexGrow: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#000000',
    paddingVertical: 5,
    borderWidth: 1,
  },
  card: {
    flexGrow: 0,
  },
  heading: {
    color: '#000000',
    paddingRight: 20,
    fontSize: 16,
  },
  body: {
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
  },
  subCategoriesListContainer: {
    borderColor: '#345676',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 15, // Add padding here instead
  },
  optionsContainer: {
    borderColor: '#653423',
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingRight: 15,
  },
  subCategoriesList: {
    marginTop: 5,
    color: '#000000',
    justifyContent: 'space-around',
  },
  image: {
    right: 0,
  },
  locationOptionContainer: {
    borderColor: '#FDF4C5',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 5,
  },
  selectedOptionContainer: {
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    color: '#000000',
    fontSize: 16,
  },
});
