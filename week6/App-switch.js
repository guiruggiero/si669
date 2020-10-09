import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

export default class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     switchValue: false,
  //     switchStatus: 'Off',
  //     style: lightStyle,
  //   }
  // }
  
  // handleValueChange = (value) => {
  //   this.setState({switchValue: value});
  // }

  // onValueChange = (value) => {
  //   let status = 'Off'; // default to off
  //   let theStyle = lightStyle;
  //   if (value) { // change to on if value==true
  //     status = 'On';
  //     theStyle = darkStyle;
  //   }
  //   this.setState({ // update state with value, status, and style
  //     switchValue: value,
  //     switchStatus: status,
  //     style: theStyle
  //   });
  // }

  // render() {
  //   return (
  //     <View style={this.state.style.container}>
  //       <Text style={this.state.style.text}>
  //         Dark Mode: {this.state.switchStatus}
  //       </Text>
  //       <Switch
  //         onValueChange={this.onValueChange}
  //         value={this.state.switchValue}/>
  //     </View>
  //   );
  // }


  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
    }
  }

  onValueChange = (value) => {
    this.setState({
      switchValue: value,
    });
  }

  render() {
    return (
      <View style={[oneStyle.container, 
        this.state.switchValue ? 
          oneStyle.bgDark : 
          {} ]}>
        <Text style={this.state.switchValue ?
          oneStyle.textDark :
          oneStyle.textLight}>
          Dark Mode: 
          {this.state.switchValue ?
            "On" :
            "Off"
          }
        </Text>
        <Switch
          onValueChange={this.onValueChange}
          value={this.state.switchValue}/>
      </View>
    );
  }
}

// const lightStyle = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//     text: {
//       color: 'black',
//     },
// });

// const darkStyle = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//     text: {
//       color: 'white',
//     },
// });


const oneStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgDark: {
    backgroundColor: 'black'
  },
  textLight: {
    color: 'black'
  },
  textDark: {
    color: 'white'
  }
});