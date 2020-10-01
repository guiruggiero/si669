// SI 669 - HW 2
// Developed by Gui Ruggiero
// Repo: https://github.com/SI669-classroom-f20/hw2-hello-guiruggiero

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d2b48c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  en: {
    backgroundColor: '#808080',
    color:'#dbadb6',
    fontSize: 40,
  },
  es: {
    backgroundColor: '#000000',
    color:'#008001',
    fontSize: 70,
  },
  de: {
    backgroundColor: '#ffff00',
    color:'#0e0d79',
    fontSize: 55,
  },
  button: {
    backgroundColor: '#9cb898',
    height: 130,
    width: 440,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    color:'#75287a',
    fontSize: 50,
  },
});

const hellos = {
  Arabic: "Marhaba",
  BavarianAndAustrianGerman: "Grüß Gott",
  Bengali: "Namaskar",
  Bulgarian: "Zdraveite",
  Catalan: "Hola",
  Chamorro: "Hafa adai",      
  Chinese: "Nǐ hǎo",
  Croatian: "Dobar dan",
  Danish: "God dag",
  Dutch: "Hallo",
  Finnish: "hyvää päivää",
  French: "Bonjour",
  Gaeilge: "Dia dhuit",
  German: "Guten tag",
  Greek: "Yasou",
  Hebrew: "Shalom",
  Hindi: "Namaste",
  Hungarian: "Jo napot",
  Icelandic: "Góðan dag",
  Igbo: "Nde-ewo",
  Indonesian: "Selamat siang",
  Italian: "Salve",
  Japanese: "Konnichiwa",
  Korean: "Ahn nyong ha se yo",
  Latin: "Salve",
  Lithuanian:  "Sveiki",
  Luxembourgish: "Moïen",
  Maltese: "Bonġu",
  Nahuatl: "Niltze",
  Nepali: "Namastē",
  Norwegian: "Hallo",
  Persian: "Salam",
  Polish: "Cześć",
  Portuguese: "Olá",
  Romanian: "Bună ziua",
  Russian: "Zdravstvuyte",
  Serbian: "Zdravo",
  Slovak: "Ahoj",
  Spanish: "Hola",
  Swahili: "Hujambo",
  Swedish: "Hallå",
  Tahitian: "Ia orna",
  Thai: "Sawasdee",
  Tsonga: "Avuxeni",
  Turkish: "Merhaba",
  Ukrainian: "Zdravstvuyte",
  Urdu: "Assalamo aleikum",                                
  Vietnamese: "xin chào",
  Welsh: "Shwmae",
  Zulu: "Sawubona" 
}

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      greetings: Object.entries(hellos),
      language: 33 // Portuguese
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.en}>Hello World</Text>
        <Text style={styles.es}>Hola Mundo</Text>
        <Text style={styles.de}>Hallo Welt</Text>
        <Text>{"\n"}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={()=>{
            this.setState({language: Math.floor(Math.random() * Math.floor(50))},
            // ()=>console.log("I'm pressed!"),
            // ()=>console.log(this.state.language),
            // ()=>console.log(this.state.greetings),
            // ()=>console.log(this.state.greetings[0][1]),
            // ()=>console.log(this.state.greetings[this.state.language][1])
          )}}
        >
          {/* <Text style={styles.greeting}>{this.state.language}</Text> */}
          <Text style={styles.greeting}>{this.state.greetings[this.state.language][1]}</Text>
          <Text>Tap to read it in a different language!</Text>
        </TouchableOpacity>

      </View>
    );
  }
}