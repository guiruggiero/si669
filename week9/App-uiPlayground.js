import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, FlatList, StyleSheet, TextInput, Text, View } from 'react-native';

// class App1 extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       inputText: ''
//     }
//   }

//   render() {
//     return (
//       // <View style={styles.container}>
//       <KeyboardAvoidingView
//         style={styles.container}
//         behavior='padding' // important!
//       >
//         <View style={styles.top}>
//         </View>

//         <View style={styles.bottom}>
//           <TextInput
//             placeholder="TextInput is here"
//             style={styles.input}

//             // keyboardType='email-address'
//             // autoCapitalize='none'
//             // autoCorrect={false}
//             // autoCompleteType='email'
//             // textContentType='emailAddress'
//             // returnKeyType='go'
            
//             value={this.state.inputText}

//             onChangeText={(text) => {this.setState({
//               inputText: text
//             })}}

//             onSubmitEditing={() => {
//               console.log(this.state.inputText);
//             }}
//           />
//         </View>
//       {/* </View> */}
//       </KeyboardAvoidingView>
//     );
//   }
// }

// export default App1;


class App4 extends React.Component {
  constructor() {
    super();

    let initList = [];
    for (let i = 0; i < 30; i++) {
      initList.push({
        text: 'item' + i,
        key: '' + i
      });
    }

    this.state = {
      theList: initList
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
      >
        <View style={styles.top}>
          <View style={styles.listContainer}>
            <FlatList
              ref={(theRef)=>{this.flatListRef = theRef;}}
              onContentSizeChange={()=>{
                this.flatListRef.scrollToEnd();
              }}

              data={this.state.theList}
              renderItem={({item}) => {
                return (
                  <View style={styles.listItem}>
                    <Text>
                      {item.text}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          <TextInput
            placeholder="TextInput is here"
            style={styles.input}

            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            autoCompleteType='email'
            textContentType='emailAddress'
            returnKeyType='go'
            value={this.state.inputText}

            onChangeText={(text) => {this.setState({
              inputText: text
            })}}

            onSubmitEditing={() => {
              this.state.theList.push({
                text: this.state.inputText,
                key: '' + Date.now() // unique key every ms!
              })
            }}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default App4;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },

    top: {
      flex: 1,
      backgroundColor: 'tan',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50
    },

      listContainer: {
        flex: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen'
      },

    bottom: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50
    },

      input: {
        borderWidth: 1,
        borderColor: 'black'
      },
});