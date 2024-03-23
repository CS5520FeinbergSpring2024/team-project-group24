import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';

const AboutScreen: React.FC = () => {
  // useStates handle the selection of area code flag and number
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>Sign Up</Text>
      <View style={styles.informationContainer}>
        <Text style={styles.descriptionText}>Full Name</Text>
        <View style={styles.infoContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#63625E"
          />
          <Image
            source={require('../assets/mic-outline.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.descriptionText}>Email</Text>
        <View style={styles.infoContainer}>
          <Image
            source={require('../assets/mail-outlinemailIcon.png')}
            style={[styles.image, styles.iconMargin]}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#63625E"
          />
          <Image
            source={require('../assets/mic-outline.png')}
            style={styles.image}
          />
        </View>
        {/* This segment handles the phone number entry. Uses a library to show flags and area codes */}
        <Text style={styles.descriptionText}>Phone number (optional)</Text>
        <View style={styles.phoneContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.countryCodeContainer}>
              <CountryPicker
                {...{
                  countryCode: selectedCountry ? selectedCountry.cca2 : 'CA',
                  withFlag: true,
                  withFilter: true,
                  withCallingCode: true,
                  onSelect: handleCountrySelect,
                }}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
              />
              <Text style={styles.countryCodeText}>
                {selectedCountry ? `+${selectedCountry.callingCode}` : '+1'}
              </Text>
              <Image source={require('../assets/down.png')} />
            </View>
          </TouchableOpacity>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.input}
              placeholder="(000) 000 000"
              placeholderTextColor="#63625E"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  titleText: {
    fontSize: 22,
    marginBottom: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  informationContainer: {
    paddingVertical: 16,
  },
  descriptionText: {
    marginBottom: 10,
    fontSize: 14,
    color: '#50595B',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  countryCodeContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 5,
    padding: 13,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 10,
    color: '#000000',
  },
  phoneNumberContainer: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    marginLeft: 20,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  image: {
    width: 24,
    height: 24,
  },
  iconMargin: {
    marginRight: 10, // Add margin to the right of the icon for spacing
  },
});

export default AboutScreen;
