import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from './Styles';

const Stack = createStackNavigator();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.nextKey = 0;

    this.state = {
      theList: [
        {
          text: "Get milk",
          key: '' + this.nextKey++
        },

        {
          text: "Call mom",
          key: '' + this.nextKey++,
        },
      ]
    }
  }

  componentDidMount() {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
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

  addItem = (itemText) => {
    if (itemText) { // false if undefined
      this.state.theList.push({text: itemText, key: '' + this.nextKey++});
    }

    this.setState({theList: this.state.theList});
  }

  updateItem = (itemKey, itemText) => {
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

  deleteItem = (itemKey) => {
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

  onEdit = (item) => {
    this.props.navigation.navigate("Detail", {
      operation: 'edit',
      item: item
    });
  }

  onDelete = (itemKey) => {
    this.deleteItem(itemKey);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            ListMaker 1000
          </Text>
        </View>

        <View style={styles.body}>
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
            ListMaker 1000
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
            <TouchableOpacity style={styles.footerButton}
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