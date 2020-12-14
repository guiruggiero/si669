import React from 'react';
import { StyleSheet, Text, View,
      TextInput, Switch, Image, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const passInvalidChar = "Passwords must contain only letters, numbers, and _ or -.";
const passInvalidPass = "Passwords must contain an uppercase letter, a lowercase letter, and a number.";
const passNoMatch = "Passwords must match.";
const passOK = "Valid password!";

function reverseText(text) {
  return text.split('').reverse().join('');
}

//find upper
function isUpper(char) {
  let codeA = "A".charCodeAt(0);
  let codeZ = "Z".charCodeAt(0);
  let codeChar = char.charCodeAt(0);
  return (codeChar >= codeA && codeChar <= codeZ);
}

//find lower
function isLower(char) {
  let codeA = "a".charCodeAt(0);
  let codeZ = "z".charCodeAt(0);
  let codeChar = char.charCodeAt(0);
  return (codeChar >= codeA && codeChar <= codeZ);
}

//find lower
function isDigit(char) {
  let code0 = "0".charCodeAt(0);
  let code9 = "9".charCodeAt(0);
  let codeChar = char.charCodeAt(0);
  return (codeChar >= code0 && codeChar <= code9);
}

export default class classApp extends React.Component {

  constructor() {
    super();
    this.state = {
      currentInput: '',
      resultText: '',
      reverseText: false,
      reverseColors: false,
      resultStyle: styles.resultTextLight,
      pass1: '',
      pass2: '',
      passFeedback: ''
    }
  }
  
  handleChangeText = (text) => {
    let resText = text;
    if (this.state.reverseText) {
      resText = text.split('').reverse().join('');
    }
    this.setState({
      currentInput: text,
      resultText: resText
    });
  }
  
  handleReverseText = (value) => {
    let resText = this.state.currentInput;
    if (value) {
      resText = reverseText(resText);
    }
    this.setState({
      resultText: resText,
      reverseText: value
    });
  }

  handleReverseColors = (value) => {
    let newStyle = styles.resultTextLight;
    if (value) {
      newStyle = styles.resultTextDark;
    }
    this.setState({
      resultStyle: newStyle,
      reverseColors: value
    });
  }

  handleChangePass1 = (text) => {
    // check if pass if valid
    let allValidChar = true;
    let foundUpper = false;
    let foundLower = false;
    let foundNum = false;
    let passwordsMatch = false;

    for (c of text) {
      if (isUpper(c)) {
        foundUpper = true;
      } else if (isLower(c)) {
        foundLower = true;
      } else if (isDigit(c)) {
        foundNum = true;
      } else {
        allValidChar = false;
      }
    }

    let foundAll = foundUpper && foundLower && foundNum;
    let passMatch = text === this.state.pass2;

    this.setState((prevState) => {
      return {
        foundAll: foundAll,
        allValid: allValidChar,
        passMatch: text === this.state.pass2,
        pass1: text}
      }
    );
  }

  handleChangePass2 = (text) => {
    this.setState((prevState) => {
      return {
        pass2: text,
        passMatch: text === this.state.pass1
      }
    });

  }

  render() {
    return (
      <KeyboardAvoidingView 
        behavior={"padding"}
        style={styles.container}>
        <View style={styles.topHalf}>
          <View style={styles.logoArea}>
            <Image source={require('./assets/spookytext.png')}
              style={styles.logoImage}/>
          </View>
          <View style={styles.inputArea}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Enter something:</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={this.handleChangeText}
                value={this.state.currentInput}
              />
            </View>
          </View>
          <View style={styles.switchArea}>
            <View style={styles.labeledSwitch}>
              <Text>Reverse text:</Text>
              <Switch
                value={this.state.reverseText}
                onValueChange={this.handleReverseText}
              />
            </View>
            <View style={styles.labeledSwitch}>
              <Text>Reverse colors:</Text>
              <Switch
                value={this.state.reverseColors}
                onValueChange={this.handleReverseColors}
              />
            </View>
          </View>
          <View style={styles.resultArea}>
            <Text style={styles.resultLabel}>Result: </Text>
            <Text style={this.state.resultStyle}>{this.state.resultText}</Text>
          </View>
        </View>
        <View
            style={styles.bottomHalf}>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Enter password:</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={this.handleChangePass1}
              value={this.state.pass1}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.inputLabel}>Re-enter password:</Text>
            <TextInput
              style={styles.inputBox}
              onChangeText={this.handleChangePass2}
              value={this.state.pass2}
              secureTextEntry={true}
            />
          </View>
          <View
            style={styles.feedbackArea}>
            <Text style={styles.feedbackText}>Passwords must: </Text>
            <Text style={[styles.feedbackText, 
              this.state.allValid?
                styles.feedbackPositive :
                styles.feedbackNegative]}>
              {this.state.allValid ? 
                <FontAwesome name="check-circle" size={18} /> :
                <FontAwesome name="times-circle" size={18} />
              }
              &nbsp; contain only letters and numbers</Text>
            <Text style={[styles.feedbackText, 
              this.state.foundAll?
                styles.feedbackPositive :
                styles.feedbackNegative]}>
              {this.state.foundAll ? 
                <FontAwesome name="check-circle" size={18} /> :
                <FontAwesome name="times-circle" size={18} />
              }
              &nbsp; contain at least one upper case letter,
                lower case letter,
                and number</Text>
            <Text style={[styles.feedbackText, 
              this.state.passMatch? 
                styles.feedbackPositive : 
                styles.feedbackNegative]}>
              {this.state.passMatch ? 
                <FontAwesome name="check-circle" size={18} /> :
                <FontAwesome name="times-circle" size={18} />
              }
              &nbsp; match</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 40,
  },
  topHalf: {
    flex: 0.5,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%'
  },
  bottomHalf: {
    flex: 0.5,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aaa'
  },
  logoArea: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  logoImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  inputArea: {
    flex: 0.3,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
  inputLabel: {
    flex: 0.4,
  },
  inputBox: {
    flex: 0.6,
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 24,
    padding: 5,
  },
  switchArea: {
    flex: 0.2,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
//    backgroundColor: '#cac'
  },
  labeledSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  resultArea: {
    flex: 0.3,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
//    backgroundColor: '#aca'
  },
  resultLabel: {
    flex: 0.4
  },
  resultTextLight: {
    flex: 0.6,
    height: 40,
    padding: 5,
    color: 'black',
    backgroundColor: 'orange',
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'black'
  },
  resultTextDark: {
    flex: 0.6,
    height: 40,
    padding: 5,
    color: 'orange',
    backgroundColor: 'black',
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'orange'
  },
  // password area styles
  feedbackArea: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  feedbackText: {
    padding: 5
  },
  feedbackNegative: {
    color: "red",
  },
  feedbackPositive: {
    color: "green",
  }
});
