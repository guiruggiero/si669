import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { timelineStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class TimelineScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.userKey = this.props.route.params.currentUser.key;
    
    this.state = {
      diveList: []
    }
  }

  componentDidMount() {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
  }

  onFocus = () => {
    let dives = this.dataModel.getDives(this.userKey);
    this.setState({diveList: dives});
    
    this.props.navigation.setParams({operation: 'none'});
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }

  onDelete = async (diveKey) => {
    await this.dataModel.deleteDive(diveKey);
    this.onFocus();
  }

  render() {
    return (
      <View style={timelineStyles.container}>
        <View style={timelineStyles.body}>
          <View style={timelineStyles.listContainer}>
            <FlatList
              data={this.state.diveList}

              ItemSeparatorComponent={()=>(
                <View style={timelineStyles.separator}/>
              )}

              renderItem={({item})=>{
                return(
                  <TouchableOpacity 
                    style={timelineStyles.listDiveContainer}
                    onPress={()=>{this.props.navigation.navigate("Dive", {
                      operation: "edit",
                      dive: item})
                    }}
                  >
                    <View style={timelineStyles.listDiveTextContainer}> 
                      <Text style={timelineStyles.listDiveText}>
                        {item.day} - {item.diveSite}, {item.country}
                      </Text> 
                    </View>

                    <View style={timelineStyles.listDiveButtonContainer}>
                      <Ionicons name="md-trash" 
                        size={24} 
                        color={colors.primaryDark}

                        onPress={()=>{this.onDelete(item.key)}} />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>

        <View style={timelineStyles.footer}>
          <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("Dive", {
              operation: "add",
              diver: this.userKey})
            }}>
            <Ionicons name="md-add-circle"
              size={80} 
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}