import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import { timelineStyles } from './Styles';

export class TimelineScreen extends React.Component {
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