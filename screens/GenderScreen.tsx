import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import NextSkipButtons from '../components/NextSkipButtons';
import SelectableOption from '../components/SelectableOption';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type NavigationProp = StackNavigationProp<RootStackParamList, 'GenderScreen'>;

interface Props {
  navigation: NavigationProp;
}

const GenderScreen: React.FC<Props> = ({navigation}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyling}>How do you identify your gender?</Text>
      <View style={styles.optionsContainer}>
        <SelectableOption
          label="Man"
          isSelected={selectedGender === 'Man'}
          onPress={() => setSelectedGender('Man')}
          allowMultiSelection={false}
        />
        <SelectableOption
          label="Woman"
          isSelected={selectedGender === 'Woman'}
          onPress={() => setSelectedGender('Woman')}
          allowMultiSelection={false}
        />
        <SelectableOption
          label="Non-Binary"
          isSelected={selectedGender === 'Non-Binary'}
          onPress={() => setSelectedGender('Non-Binary')}
          allowMultiSelection={false}
        />
        <NextSkipButtons
          screenToChangeTo={'HobbiesScreen'}
          navigation={navigation}
        />
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
  optionsContainer: {
    flex: 1,
    paddingTop: 24,
  },
  textStyling: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GenderScreen;
