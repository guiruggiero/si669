import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { externalStyles } from './externalStyles';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.view1} />
//       <View style={styles.view2} />
//       <View style={styles.view3} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: 'skyblue',
//     // justifyContent: 'center',
//     justifyContent: 'space-around',
//     alignItems: 'center'
//   },
//   view1: {
//     flex: 0.2,
//     backgroundColor: 'pink',
//     // width: 200,
//     height: 200,
//   },
//   view2: {
//     flex: 0.2,
//     backgroundColor: 'lightgreen',
//     // width: 200,
//     height: 200,
//   },
//   view3: {
//     flex: 0.2,
//     backgroundColor: 'tan',
//     // width: 200,
//     height: 200,
//   }
// });


// export default function App() {
//   return (
//     <View style={styles.body}>
//       <View style={styles.section}>
//         <View style={styles.boxLeft}>
//           <Text>Silver Box 175x175</Text>
//         </View>
//         <View style={styles.boxLeft}>
//           <Text>Silver Box 175x175</Text>
//         </View>
//       </View>
//       <View style={styles.section}>
//         <View style={styles.boxRight}>
//           <Text>Gold Box 125x125</Text>
//         </View>
//         <View style={styles.boxRight}>
//           <Text>Gold Box 125x125</Text>
//         </View>
//         <View style={styles.boxRight}>
//           <Text>Gold Box 125x125</Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   section: {
//     flex: 0.5,
//     alignItems: "center",
//     justifyContent: 'space-evenly',
//   },
//   boxLeft: {
//     backgroundColor: 'silver',
//     width: 175,
//     height: 175,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   boxRight: {
//     backgroundColor: 'gold',
//     width: 125,
//     height: 125,
//     alignItems: "center",
//     justifyContent: "center",
//   }
// });


export default function App() {
  return (
    <View style={externalStyles.body}>
      <View style={externalStyles.section}>
        <View style={externalStyles.boxLeft}>
          <Text>Silver Box 175x175</Text>
        </View>
        <View style={externalStyles.boxLeft}>
          <Text>Silver Box 175x175</Text>
        </View>
      </View>
      <View style={externalStyles.section}>
        <View style={externalStyles.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
        <View style={externalStyles.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
        <View style={externalStyles.boxRight}>
          <Text>Gold Box 125x125</Text>
        </View>
      </View>
    </View>
  );
}