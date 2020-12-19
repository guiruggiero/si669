import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // FLAG

import { diveStyles } from './Styles';
import { getDataModel } from './DataModel';

export class DiveScreen extends React.Component {
  constructor(props) {
    super(props);

    let country, diver, diveSite, gas, location, notes, pictureURL; // string
    let maxDepth, pictureHeight, pictureWidth, rating, tempBottom, tempSurface, totalTime, weights; // number 
    let favorite; // boolean

    // FLAG
    let latitude, longitude; // let coordinates; // geopoint, [41.0153513° N, 83.9355813° W]
    let day, time; // let start; // timestamp, October 11, 2020 at 12:34:00 PM UTC-5 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

    let dive = {
      country: '',
      day: '',
      diver: '',
      diveSite: '',
      gas: '',
      location: '',
      notes: '',
      pictureURL: '',
      time: '',

      latitude: 0,
      longitude: 0,
      maxDepth: 0,
      pictureHeight: 0,
      pictureWidth: 0,
      rating: 0,
      tempBottom: 0,
      tempSurface: 0,
      totalTime: 0,
      weights: 0,

      favorite: false
    }

    // mode C (add) or RU (edit)
    this.operation = this.props.route.params.operation;
    if (this.operation === 'edit') {
      initTexts = this.props.route.params.dive; // FLAG
    }

    let initTexts = '';
    this.state = {
      inputText: initText
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>
              {this.operation === 'add'? "Add" : "Edit"} dive</Text>

            <TextInput
              placeholder='Enter item text'
              style={styles.textInputBox}
              onChangeText={(text) => this.setState({inputText: text})}
              value={this.state.inputText}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerButtonContainer}>
            <TouchableOpacity 
              style={styles.footerButton}

              onPress={()=>{this.props.navigation.navigate("Home")}}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.footerButton}
              onPress={()=>{
                let theItem = {};
                if (this.operation === 'add') {
                  theItem = {
                    text: this.state.inputText,
                    key: -1 // placeholder for "no ID"
                  }
                }
                
                else { // operation === 'edit'
                  theItem = this.props.route.params.item;
                  theItem.text = this.state.inputText;
                }
                
                this.props.navigation.navigate("Home", {
                  operation: this.operation,
                  item: theItem
                });
              }}>
              <Text style={styles.footerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}