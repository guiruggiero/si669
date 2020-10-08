// SI 669 - Project 1
// Developed by Gui Ruggiero
// Repo: https://github.com/SI669-classroom-f20/proj1-ischoolrankings-guiruggiero

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

// required and other imports
import { shuffleArray } from './Shuffle';
import { getISchools } from './iSchoolData';
import { externalStyles } from './externalStyles';
import { Ionicons } from '@expo/vector-icons';

// custom Component
class SchoolRank extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={externalStyles.list}>
        <View style={externalStyles.rankingContainer}>
          <Text style={externalStyles.ranking}>{this.props.ranking}</Text>
        </View>
        <View style={externalStyles.itemsContainer}>
          <Text style={externalStyles.university} numberOfLines={1} ellipsizeMode='tail'>{this.props.univ}</Text>
          <Text style={externalStyles.schoolName} numberOfLines={1} ellipsizeMode='tail'>{this.props.school}</Text>
        </View>
      </View>
    );
  }
}

function randomizeRankings(array) {
  // creates array of rankings 2 to max, then shuffles
  let rankings = [];
  for (let i = 2; i <= array.length; i++) {
    rankings.push(i);
  }
  shuffleArray(rankings);
  
  // updates schools array with shuffled rankings (UM always #1)
  let i = 0;
  for (let j = 0; j < array.length; j++) {
    if (array[j].univ != "University of Michigan") {
      array[j].ranking = rankings[i];
      i++;
    } else {
      array[j].ranking = 1;
    }
  }

  // sorts schools per ranking
  array.sort(function (a, b) {
    return a.ranking - b.ranking;
  });
}

export default class App extends React.Component {
  constructor() {
    super();

    // get schools array and randomizes rankings
    let iSchools = getISchools();
    randomizeRankings(iSchools);

    // sets first state
    let d = new Date();
    this.state = {
      dateTime: d.toLocaleString("en-US"),
      schools: iSchools,
    };
    
    // console.log("\nConstructor end");
  }

  // updates time
  updateDateTime = () => {
    let d = new Date();
    let newDateTime = d.toLocaleString("en-US");
    this.setState({
      dateTime: newDateTime
    });
  }

  render() {
    return (
      <View style={externalStyles.container}>
        <StatusBar style="light" />
        
        {/* header */}
        <View style={externalStyles.header}>
          <View>
            <Text style={externalStyles.headerText}>iSchool Rankings</Text>
            <Text style={externalStyles.lastUpdated}>Updated: {this.state.dateTime}</Text>
          </View>

          {/* refresh button */}
          <View>
            <TouchableOpacity 
              style={externalStyles.refresh}
              onPress={ () => {
                this.updateDateTime();
                randomizeRankings(this.state.schools);
                // console.log("Refresh end");
              }}>
              <Ionicons name="ios-refresh" size={48} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* schools list */}
        <View style={externalStyles.body}>
          <FlatList
            data={this.state.schools}
            renderItem={({item}) =>
              <SchoolRank ranking={item.ranking} univ={item.univ} school={item.school}/>
            }
          />
        </View>
      </View>
    );
  }
}