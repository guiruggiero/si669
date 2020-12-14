import React from 'react';
import { TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { peopleStyles, colors } from './Styles';

export class PeopleScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();

    // the LoginScreen provides the current user object when it navigates here
    this.currentUser = this.props.route.params.currentUser;

    // users were loaded at app startup so we just need to get them here
    let allUsers = this.dataModel.getUsers();

    // we only want to display users that AREN'T the current user, 
    let otherUsers = [];
    for (let user of allUsers) {
      if (user.email !== this.currentUser.email) { // skip currentUser
        otherUsers.push(user);
      }
    }

    // initialize the state. Since we had already loaded users and just "got" 
    // them here, we don't have any async operations so it's OK to initialize
    // state in the constructor
    this.state = {
      people: otherUsers
    }
  }

  render() {
    return (
      <View style={peopleStyles.container}>
        <View style={peopleStyles.peopleListContainer}>
          <FlatList
            ItemSeparatorComponent={()=>{
              return (
                <View style={peopleStyles.separator}/>
              );
            }}

            data={this.state.people}
            
            renderItem={({item})=> {
              return (
                <TouchableOpacity 
                  style={peopleStyles.personRow}
                  onPress={()=> {
                    this.props.navigation.navigate('Chat');
                  }}
                >
                  <Text style={peopleStyles.personText}>{item.displayName}</Text>
                  
                  <Ionicons name="ios-arrow-dropright" size={24} color="black"/>                
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    )
  }
}