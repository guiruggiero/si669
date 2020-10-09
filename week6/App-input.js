import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     firstName: "",
  //     lastName: "",
  //   }
  // }

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>
  //         Hello, {this.state.firstName} {this.state.lastName}!
  //       </Text>
  //       <View>
  //         <Text>First Name: </Text>
  //         <TextInput
  //           placeholder="enter first name"
  //           onChangeText={textValue => this.setState({firstName: textValue})}
  //         />
  //       </View>
  //       <View>
  //         <Text>Last Name: </Text>
  //         <TextInput
  //           placeholder="enter last name"
  //           onChangeText={textValue => this.setState({lastName: textValue})}
  //         />
  //       </View>
  //     </View>
  //   )
  // }


  constructor(props) {
    super(props);
    this.state = {
      inputContents: '',
      savedContents: ''
    };
  }

  handleChange = (text) => {
    this.setState({inputContents: text});
  } 

  handlePress = () => {
    this.setState({savedContents: this.state.inputContents});
  }

  render() {  
    return (
      <View style={styles.container}>
        <Text>
          {this.state.savedContents}
        </Text>
        <TextInput
          onChangeText={this.handleChange}
          placeholder="Type here to translate!"
          style={styles.typing}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.button}>
            <Text>Save</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 50
  },

    input: {
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      fontSize: 40,
      width: '95%'
    },
    
    button: {
      margin: 40,
      height: 40,
      width: 80,
      backgroundColor: 'pink',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10
    }
});