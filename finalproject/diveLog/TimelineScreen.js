import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';

import { timelineStyles } from './Styles';
import { getDataModel } from './DataModel';

export class TimelineScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;

    this.state = {diveList: []}

    console.log('Timeline created'); // changed
    console.log(this.state.diveList);
    console.log(this.currentUser);
    console.log(this.currentUser.key);
  }

  componentDidMount() {
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);

    console.log('Timeline mounted') // changed
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }

  onFocus = () => {
    this.setState({diveList: this.dataModel.getDives(this.currentUser.key)});
    this.props.navigation.setParams({operation: 'none'});

    console.log('Timeline received focus, dives updated and filtered'); // changed
    console.log(this.state.diveList);
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

              renderItem={({dive})=>{
                return(
                  <View style={timelineStyles.listDiveContainer}>
                    <View style={timelineStyles.listDiveTextContainer}> 
                      <Text style={timelineStyles.listDiveText}>
                        {dive.day} - {dive.diveSite}, {dive.country}
                        {console.log(dive.day + '-' + dive.diveSite + ',' + dive.country)} {/* changed */}
                      </Text> 
                    </View>

                    <View style={timelineStyles.listDiveButtonContainer}>
                      <Ionicons name="md-create"
                        size={24} 
                        color={colors.primaryDark}

                        onPress={()=>{this.props.navigation.navigate("Dive", {
                          operation: 'edit',
                          dive: dive});

                          console.log('Passing to Dive to edit:' + dive) // changed
                        }}
                       />

                      <Ionicons name="md-trash" 
                        size={24} 
                        color={colors.primaryDark}

                        onPress={()=>{this.dataModel.deleteDive(dive.key);
                          console.log('To be deleted:' + dive.key) // changed
                        }} />
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>

        <View style={timelineStyles.footer}>
          <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate('Dive',
              {operation: "add"})}}>
            <Ionicons name="md-add-circle" 
              size={80} 
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}