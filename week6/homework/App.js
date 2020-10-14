// SI 669 - HW 3
// Developed by Gui Ruggiero
// Repo: https://github.com/SI669-classroom-f20/hw3-spookytext-guiruggiero

import React from 'react';
import { StyleSheet, Text, View,
      TextInput, Switch, Image, KeyboardAvoidingView } from 'react-native';
import { externalStyles } from './externalStyles';
import { Ionicons } from '@expo/vector-icons';

/**
 * Utility function that will be useful for Extra Credit
 * You'll need to do something similar for lower case letters and digits
 * @param {string} char The character to test
 * @returns {string} true if the character is an uppercase letter, else false
 */
function isUpper(char) {
  let codeA = "A".charCodeAt(0);
  let codeZ = "Z".charCodeAt(0);
  let codeChar = char.charCodeAt(0);
  return (codeChar >= codeA && codeChar <= codeZ);
}

/**
 * @param {string} text The string to reverse
 * @returns {string} The string, reversed
 */
function reverseText(text) {
  return text.split('').reverse().join('');
}

export default class classApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentInput: '',
      resultText: '',
      reverseText: false,
      reverseColors: false,
      resultStyle: externalStyles.resultTextLight,
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChangeText = (text) => {
    let finalText = '';
    if (this.state.reverseText) {
      finalText = reverseText(text);
    } else {
      finalText = text;
    }
    
    this.setState({
      currentInput: text,
      resultText: finalText
    });
  }
  
  handleReverseText = (value) => {
    let text = this.state.currentInput;
    if (value) {
      text = reverseText(text);
    }

    this.setState({
      reverseText: value,
      resultText: text
    });
  }

  handleReverseColors = (value) => {
    let usedStyle = '';
    if (value) {
      usedStyle = externalStyles.resultTextDark;
    } else {
      usedStyle = externalStyles.resultTextLight;
    }

    this.setState({
      reverseColors: value,
      resultStyle: usedStyle
    });
  }
  
  validatePassword = (text) => {
    
    
    this.setState({
      
    });
  }

  matchTest = (text) => {
    
    
    this.setState({
      
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={"height"}
        style={externalStyles.container}>
        <Image source={require('./spookytext.png')}
          style={externalStyles.logoImage}/>
        
        <View style={externalStyles.inputArea}>
          <View style={externalStyles.inputRow}>
            <Text style={externalStyles.inputLabel}>Enter something:</Text>

            <TextInput
              style={externalStyles.inputBox}
              onChangeText={this.handleChangeText}
              value={this.state.currentInput}
            />
          </View>
        </View>

        <View style={externalStyles.switchArea}>
          <View style={externalStyles.labeledSwitch}>
            <Text>Reverse text:</Text>

            <Switch
              value={this.state.reverseText}
              onValueChange={this.handleReverseText}/>
          </View>

          <View style={externalStyles.labeledSwitch}>
            <Text>Reverse colors:</Text>

            <Switch
              value={this.state.reverseColors}
              onValueChange={this.handleReverseColors}
            />
          </View>
        </View>

        <View style={externalStyles.resultArea}>
          <Text style={externalStyles.resultLabel}>Result: </Text>

          <Text style={this.state.resultStyle}>{this.state.resultText}</Text>
        </View>

        <View style={externalStyles.passwordArea}>
          <View style={externalStyles.labeledPassword}>
            <Text style={externalStyles.inputLabel}>Enter password:</Text>

            <TextInput
              style={externalStyles.inputBox}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => this.setState({password: text})}
            />
          </View>

          <View style={externalStyles.labeledPassword}>
            <Text style={externalStyles.inputLabel}>Re-enter password:</Text>

            <TextInput
              style={externalStyles.inputBox}
              secureTextEntry={true}
              value={this.state.passwordConfirmation}
              onChangeText={(text) => this.setState({passwordConfirmation: text})}
            />
          </View>

          <View style={externalStyles.passwordValidation}>
            <Text>Passwords must:</Text>

            <Text style={externalStyles.passwordCriteria}>contain only letters and numbers</Text>
            <Text style={externalStyles.passwordCriteria}>contain at least one upper case letter, lower case letter, and number</Text>
            <Text style={externalStyles.passwordCriteria}>match</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}