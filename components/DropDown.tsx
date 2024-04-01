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

const screenHeight = Dimensions.get('window').height;

export default function DropDown() {
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);

  const [selectedLocation, setSelectedLocation] = React.useState<string>('');
  const [selectedOption, setSelectedOption] = React.useState<string>('');
  const [selectedReceiver, setSelectedReceiver] = React.useState<string>('');

  const [selectedEmotion, setSelectedEmotion] = React.useState<string>('');

  const [selectedLocationOption, setSelectedLocationOption] = React.useState<
    string | null
  >(null);
  const [selectedReceiverOption, setSelectedReceiverOption] = React.useState<
    string | null
  >(null);

  // Handles a location being selected
  const handleLocationSelection = (location: string) => {
    setSelectedOption(location);
    setSelectedLocation(location);
    setSelectedLocationOption(location);
  };

  // Handles a receiver being selected
  const handleReceiverSelection = (receiver: string) => {
    // setSelectedOption(receiver);
    setSelectedReceiver(receiver);
    setSelectedReceiverOption(receiver);
  };

  const handleEmotionSelection = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  // Joins the selected Location and Receiver into one string
  React.useEffect(() => {
    if (selectedLocationOption && selectedReceiverOption) {
      setSelectedLocation(
        `${selectedLocationOption}/${selectedReceiverOption}`,
      );
    }
  }, [selectedLocationOption, selectedReceiverOption]);

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
              <View style={styles.headerContainer}>
                <Text style={[styles.heading]}>{category}</Text>
                <View
                  style={[
                    styles.selectedOptionContainer,
                    {backgroundColor: color},
                  ]}>
                  <Text style={styles.selectedOption}>
                    {category === 'This message is for:'
                      ? selectedLocation
                      : selectedEmotion}
                  </Text>
                </View>
                <Image
                  style={styles.image}
                  source={require('../assets/chevron-up.png')}
                />
              </View>
              <View style={styles.card}>
                {index === currentIndex &&
                  category === 'This message is for:' && (
                    <View style={styles.locationReceiverOptionsContainer}>
                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={styles.scrollViewContainer}>
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
                                  style={[
                                    styles.subCategoryText,
                                    selectedOption === locationOption &&
                                      styles.selectedSubCategory,
                                  ]}>
                                  {locationOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      </ScrollView>
                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        contentContainerStyle={styles.scrollViewContainer}>
                        <View style={styles.subCategoriesList}>
                          {receiverOptions &&
                            receiverOptions.map(receiverOption => (
                              <TouchableOpacity
                                key={receiverOption}
                                onPress={() =>
                                  handleReceiverSelection(receiverOption)
                                }
                                style={styles.locationOptionContainer}>
                                <Text
                                  key={receiverOption}
                                  style={[
                                    styles.subCategoryText,
                                    selectedReceiver === receiverOption &&
                                      styles.selectedSubCategory,
                                  ]}>
                                  {receiverOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                        </View>
                      </ScrollView>
                    </View>
                  )}
                {index === currentIndex && category === 'How do you feel:' && (
                  <ScrollView
                    showsVerticalScrollIndicator={true}
                    contentContainerStyle={styles.scrollViewContainer}>
                    <View style={styles.emotionsMainOptionContainer}>
                      <View style={styles.leftColumn}>
                        {emotionOptions &&
                          emotionOptions
                            .slice(0, emotionOptions.length / 2)
                            .map(emotionOption => (
                              <TouchableOpacity
                                key={emotionOption}
                                onPress={() =>
                                  handleEmotionSelection(emotionOption)
                                }
                                style={styles.emotionOptionContainer}>
                                <Text
                                  key={emotionOption}
                                  style={[
                                    styles.subCategoryText,
                                    selectedEmotion === emotionOption &&
                                      styles.selectedSubCategory,
                                  ]}>
                                  {emotionOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                      </View>
                      <View style={styles.rightColumn}>
                        {emotionOptions &&
                          emotionOptions
                            .slice(emotionOptions.length / 2)
                            .map(emotionOption => (
                              <TouchableOpacity
                                key={emotionOption}
                                onPress={() =>
                                  handleEmotionSelection(emotionOption)
                                }
                                style={styles.emotionOptionContainer}>
                                <Text
                                  key={emotionOption}
                                  style={[
                                    styles.subCategoryText,
                                    selectedEmotion === emotionOption &&
                                      styles.selectedSubCategory,
                                  ]}>
                                  {emotionOption}
                                </Text>
                              </TouchableOpacity>
                            ))}
                      </View>
                    </View>
                  </ScrollView>
                )}
              </View>
            </TouchableOpacity>
          );
        },
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#FFFFFF',
  },
  //   Main container that will expand
  categoryContainer: {
    flexGrow: 0,
    justifyContent: 'flex-start',
    paddingVertical: 5,
    borderColor: '#F7F7F7',
    borderWidth: 1,
    overflow: 'hidden',
    maxHeight: screenHeight / 4,
  },
  scrollViewContainer: {
    paddingBottom: 25,
  },
  //   Need a header container to hold prompt and selected option
  headerContainer: {
    flexDirection: 'row',
    flexGrow: 0,
    paddingVertical: 3,
  },
  heading: {
    color: '#000000',
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: 16,
  },
  // The card is what handles the expansion
  card: {
    flexGrow: 0,
  },
  // surrounds the two columns of locationOptions and receiverOptions
  locationReceiverOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  emotionsMainOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subCategoryText: {
    borderRadius: 20,
    paddingHorizontal: 20,
    color: '#000000',
    padding: 2,
    marginVertical: 0,
  },
  subCategoriesList: {
    marginVertical: 2,
    color: '#000000',
    padding: 2,
    justifyContent: 'space-around',
  },
  selectedSubCategory: {
    borderColor: '#0A24A5',
    color: '#0A24A5',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  image: {
    right: 0,
  },
  //   Contains the individual options
  locationOptionContainer: {
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionOptionContainer: {
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //   Once an option is selected it is placed in the header
  selectedOptionContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedOption: {
    color: '#000000',
    fontSize: 16,
  },
});
