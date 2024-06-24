import React, { useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

const OTPInput = ({ length, value = '', disabled, onChange }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (value === '') {
      inputRefs.current[0]?.focus();
    }
  }, [value]);

  const handleChange = (text, index) => {
    const newValueArray = value.split('');

    // If the input text length is greater than 1, truncate it to only take the first character
    newValueArray[index] = text.length > 1 ? text.slice(0, 1) : text;

    // Update the value
    onChange(newValueArray.join(''));

    // Focus the next input if the current one is filled, else focus the previous one
    if (text.length > 0 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (text.length === 0 && index === 0) {
      inputRefs.current[0]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && value[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.Container}>
      {[...Array(length)].map((_, index) => (
        <TextInput
          key={index}
          ref={ref => inputRefs.current[index] = ref}
          style={styles.input}
          maxLength={1}
          contextMenuHidden
          selectTextOnFocus
          editable={!disabled}
          keyboardType="number-pad"
          value={value[index] || ''}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          testID={`OTPInput-${index}`}
        />
      ))}
    </View>
  );
};

export default OTPInput;
