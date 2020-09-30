import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


// export default function App() {
//   let num = 9;
//   return (
//   <View style={{
//       backgroundColor: 'fff', 
//       top: 200, 
//       left: 100, 
//       width: 200 }}>
//     <Text style>Your lucky number:</Text>
//     {/* <Text style>{num}</Text> */}
//     <Text style>{Math.round(Math.random() * 10)}</Text>
//   </View>
// );
// }


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Button
//         title="Press Me!"
//         color="blue"
//         onPress={()=>console.log("I'm pressed!")}/>
//     </View>
//   );
// }


// export default class App extends React.Component {
//   render() {
//   return (
//     <View style={styles.container}>
//       <Button
//         title="Press Me!"
//         color="blue"
//         onPress={()=>console.log("I'm pressed!")}/>
//     </View>
//     );
//   }
// }


// export default class App extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       counter: 0
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button 
//           title="+"
//           color="red"
//           onPress={()=>{
//             this.setState(
//               {counter: this.state.counter + 1}
//             )
//           }}
//         />
//         <Text>{this.state.counter}</Text>
//       </View>
//     );
//   }
// }


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={{
            height: 100,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            backgroundColor: 'lightblue',
            borderRadius:10,
            borderWidth: 3,
            borderColor: '#111'
          }}
          onPress={()=>{
            this.setState({counter: this.state.counter + 1}
          )}}
        >
          <Text style={{fontSize: 36}}>{this.state.counter}</Text>
          <Text style={{fontSize: 12}}>Press me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}