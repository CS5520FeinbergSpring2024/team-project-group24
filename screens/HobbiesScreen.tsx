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

const HobbiesScreen: React.FC<Props> = ({navigation}) => {
  const [selectedHobby, setSelectedHobby] = useState<string | null>(null);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.textStyling}>
        What are some of your hobbies or interests?
      </Text>
      <View style={styles.optionsContainer}>
        <SelectableOption
          label="Reading"
          isSelected={selectedHobby === 'Reading'}
          onPress={() => setSelectedHobby('Reading')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Music"
          isSelected={selectedHobby === 'Music'}
          onPress={() => setSelectedHobby('Music')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Sports"
          isSelected={selectedHobby === 'Sports'}
          onPress={() => setSelectedHobby('Sports')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Cooking"
          isSelected={selectedHobby === 'Cooking'}
          onPress={() => setSelectedHobby('Cooking')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Art"
          isSelected={selectedHobby === 'Art'}
          onPress={() => setSelectedHobby('Art')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Technology"
          isSelected={selectedHobby === 'Technology'}
          onPress={() => setSelectedHobby('Technology')}
          allowMultiSelection={true}
        />
        <SelectableOption
          label="Other"
          isSelected={selectedHobby === 'Other'}
          onPress={() => setSelectedHobby('Other')}
          allowMultiSelection={true}
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

export default HobbiesScreen;
