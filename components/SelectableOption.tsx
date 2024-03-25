import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface SelectableOptionProps {
  label: string;
  allowMultiSelection: boolean;
  isSelected: boolean;
  onPress: () => void;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  label,
  allowMultiSelection,
  isSelected,
  onPress,
}) => {
  // Method that toggles the ability to have multiple items selected
  const handlePress = () => {
    if (allowMultiSelection) {
      onPress();
    } else {
      if (!isSelected) {
        onPress();
      }
    }
  };
  return (
    <TouchableOpacity
      style={[styles.option, isSelected ? styles.selectedOption : null]}
      onPress={handlePress}>
      <Text
        style={[styles.optionLabel, isSelected ? styles.selectedLabel : null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  option: {
    padding: 10,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#000000',
  },
  optionLabel: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelectableOption;
