
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import '@firebase/firestore';

import { styles, colors } from './Styles';
import { firebaseConfig } from './Secrets';

const Stack = createStackNavigator();
const appName = "ListMaker 2000";

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.listCollection = 
      firebase.firestore().collection('listItems');
    
    this.nextKey = 0;
    this.state = {
      theList: [],
      loading: true
    }
  }

  componentDidMount() {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
    this.loadListItems();
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

  loadListItems = async () => {
    let listItems = [];
    let qSnap = await this.listCollection.get();
    qSnap.forEach(qDocSnap => {
      let itemData = qDocSnap.data();
      itemData.key = qDocSnap.id;
      listItems.push(itemData);
      console.log("adding", itemData);
    });
    this.setState({
      theList: listItems,
      loading: false
    });
  }

  addItem = async (itemText) => {
    if (itemText) { // false if undefined
      let itemData = {text: itemText};
      let docRef = await this.listCollection.add(itemData);
      this.state.theList.push({text: itemText, key: docRef.id});
      this.setState({theList: this.state.theList});
    }  
  }

  updateItem = async (itemKey, itemText) => {
    if (itemText) {
      let itemData = {text: itemText};
      await this.listCollection.doc(itemKey).update(itemData);

      let {theList} = this.state;
      let foundIndex = -1;
      for (let idx in theList) {
        if (theList[idx].key === itemKey) {
          foundIndex = idx;
          break;
        }
      }
      if (foundIndex !== -1) { // silently fail if item not found
        theList[foundIndex].text = itemText;
      }
      this.setState({theList: theList});
    }
  }

  deleteItem = async (itemKey) => {
    await this.listCollection.doc(itemKey).delete();
    let {theList} = this.state;
    let foundIndex = -1;
    for (let idx in theList) {
      if (theList[idx].key === itemKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      theList.splice(foundIndex, 1); // remove one element 
    }
    this.setState({theList: theList});
  }

  onDelete = (item) => {
    Alert.alert(
      'Delete Item?',
      'Are you sure you want to delete \"' + item.text + '\"?',
      [
        {
          text: 'Cancel',
          style: 'Cancel'
        },
        {
          text: 'Delete',
          onPress: () => this.deleteItem(item.key)
        }
      ]
    );
    // this.deleteItem(item.key);
  }

  onEdit = (item) => {
    this.props.navigation.navigate("Detail", {
      operation: 'edit',
      item: item
    });
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
          <View style={styles.listContainer}>
            { this.state.theList.length === 0 && !this.state.loading ? 
              <View style={styles.emptyListMessageContainer}>
                <Text style={styles.emptyListMessageText}> 
                  Nothing in your list.
                </Text>
                <Text style={styles.emptyListMessageText}>
                  Tap "+" below to add something! 
                </Text>
              </View>
            : 
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
                          onPress={()=>{this.onDelete(item)}} />
                      </View>
                    </View>
                  );
                }}
              />
            }
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
              style={[styles.footerButton,
                this.state.inputText.length === 0 ? 
                styles.disabledButton :
                {}
              ]}
              disabled={this.state.inputText.length === 0}
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