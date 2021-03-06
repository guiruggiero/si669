// SI 669 - HW 4
// Developed by Gui Ruggiero
// Repo: https://github.com/SI669-classroom-f20/hw4-lm2k-guiruggiero

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from './Styles';

import firebase from 'firebase';
import '@firebase/firestore';
import { firebaseConfig } from './secrets.js';

// Initialize Firebase and get references
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const listCollRef = db.collection('listItems');

// Initialize application state
const appName = "ListMaker 2000";
const Stack = createStackNavigator();
let appList = [];

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.nextKey = 0;
    this.state = {
      theList: [],
      emptyMessage: "Nothing here yet. Tap '+' to add!"
    }
  }

  getList = async () => {
    appList = [];
    let qSnap = await listCollRef.get();
    qSnap.forEach(qDocSnap => {
      let data = qDocSnap.data();
      data.key = qDocSnap.id;
      appList.push(data);
    })

    this.setState({theList: appList}); // populates app data model

    // if there are items on list, deletes empty message
    if (appList.length != 0) {
      this.setState({emptyMessage: ""});
    }
  }

  componentDidMount() {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
    this.getList();
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }

  onFocus = () => {
    if (this.props.route.params) {
      const {operation, item} = this.props.route.params;
      if (operation === 'add') {
        this.addItem(item.text);
      } else if (operation === 'edit') {
        this.updateItem(item.key, item.text);
      } 
    }
    this.props.navigation.setParams({operation: 'none'});
  }

  addItem = async (itemText) => {
    if (itemText) { // false if undefined
      let docRef = await listCollRef.add({text: itemText}); // adds to FB
      itemText.key = docRef.id; // gets FB autoID

      appList.push({text: itemText, key: itemText.key});
    }
    this.setState({theList: appList}); // adds to app data model

    // if there are items on list, deletes empty message
    if (appList.length != 0) {
      this.setState({emptyMessage: ""});
    }
  }

  onDelete = (itemKey) => {
    this.deleteItem(itemKey);
  }

  deleteItem = async (itemKey) => {
    // deletes from FB
    let docRef = listCollRef.doc(itemKey);
    await docRef.delete();

    // deletes from app data model
    appList = this.state.theList;
    let foundIndex = -1;
    for (let idx in appList) {
      if (appList[idx].key === itemKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      appList.splice(foundIndex, 1); // remove one element 
    }
    this.setState({theList: appList});

    // if no more items on list, restores empty message
    if (appList.length === 0) {
      this.setState({emptyMessage: "Nothing here yet. Tap '+' to add"});
    }
  }

  onEdit = (item) => {
    this.props.navigation.navigate("Detail", {
      operation: 'edit',
      item: item
    });
  }

  updateItem = async (itemKey, itemText) => {
    // updates FB
    let docRef = listCollRef.doc(itemKey);
    await docRef.update({text: itemText});

    // updates app data model
    appList = this.state.theList;
    let foundIndex = -1;
    for (let idx in appList) {
      if (appList[idx].key === itemKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      appList[foundIndex].text = itemText;
    }
    this.setState({theList: appList});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {appName}
          </Text>
        </View>
        <View style={styles.body}>
          <Text>
          {/* <Text style={styles.???}> */}
            {this.state.emptyMessage}
          </Text>
          <View style={styles.listContainer}>
            <FlatList
              data={this.state.theList}
              ItemSeparatorComponent={()=>(
                <View style={styles.separator}
                />
              )}
              renderItem={({item})=>{
                return(
                  <View style={styles.listItemContainer}>
                    <View style={styles.listItemTextContainer}> 
                      <Text style={styles.listItemText}>
                        {item.text}
                      </Text> 
                    </View>
                    <View style={styles.listItemButtonContainer}>
                      <Ionicons name="md-create" 
                        size={24} 
                        color={colors.primaryDark}
                        onPress={()=>{this.onEdit(item)}} />
                      <Ionicons name="md-trash" 
                        size={24} 
                        color={colors.primaryDark}
                        onPress={()=>{this.onDelete(item.key)}} />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={()=>
              this.props.navigation.navigate('Detail', 
                {operation: "add"})}>
            <Ionicons name="md-add-circle" 
              size={80} 
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class DetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.operation = this.props.route.params.operation;

    let initText = '';
    if (this.operation === 'edit') {
      initText = this.props.route.params.item.text;
    }

    this.state = {
      inputText: initText
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {appName}
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.textInputContainer}>
            <Text style={styles.textInputLabel}>
              {this.operation === 'add'? "Add" : "Edit"} Item</Text>
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
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={()=>{
                let theItem = {};
                if (this.operation === 'add') {
                  theItem = {
                    text: this.state.inputText,
                    key: -1 // placeholder for "no ID"
                  }
                } else { // operation === 'edit'
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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"   
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;