import React from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';

import { diveStyles } from './Styles';
import { getDataModel } from './DataModel';

export class DiveScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.operation = this.props.route.params.operation;

    let diver = ''; 
    let key = '';
    let day = '';
    let diveSite = '';
    let country = '';
    if (this.operation === 'edit') {
      diver = this.props.route.params.dive.diver;
      key = this.props.route.params.dive.key;
      day = this.props.route.params.dive.day;
      diveSite = this.props.route.params.dive.diveSite;
      country = this.props.route.params.dive.country;
    } else { // this.operation === 'add'
      diver = this.props.route.params.diver;
    }

    this.state = {
      diver: diver,
      key: key,
      day: day,
      diveSite: diveSite,
      country: country
    }
  }
  
  async onSave() {
    if (this.operation === 'add') {
      await this.dataModel.addDive(
        this.state.diver,
        this.state.day,
        this.state.diveSite,
        this.state.country
      );
    }

    else { // operation === 'edit'
      await this.dataModel.editDive(
        this.state.key,

        this.state.diver,
        this.state.day,
        this.state.diveSite,
        this.state.country
      );
    }

    this.props.navigation.navigate("Timeline");
  }

  render() {
    return (
      <View style={diveStyles.container}>
        <View style={diveStyles.header}>
          <Text style={diveStyles.headerText}>
            {this.operation === 'add'? "Add" : "Edit"}
          </Text>
        </View>

        <View style={diveStyles.body}>
          {/* <View style={diveStyles.imageContainer}> FLAG
          </View> */}

          <View style={diveStyles.fieldsContainer}>
            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Day:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                placeholder="MM.DD.YYYY"
                keyboardType="numeric"
                autoCorrect={false}

                value={this.state.day}

                onChangeText={(text) => this.setState({day: text})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Dive site:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.diveSite}

                onChangeText={(text) => this.setState({diveSite: text})}
              />
            </View>

            <View style={diveStyles.fieldRow}>
              <Text style={diveStyles.fieldLabel}>
                Country:
              </Text>

              <TextInput
                style={diveStyles.fieldBox}

                autoCapitalize="words"
                autoCorrect={true}

                value={this.state.country}

                onChangeText={(text) => this.setState({country: text})}
              />
            </View>
          </View>
        </View>

        <View style={diveStyles.footer}>
          <View style={diveStyles.footerButtonContainer}>
            <TouchableOpacity 
              style={diveStyles.footerButton}

              onPress={()=>{this.props.navigation.navigate("Timeline")}}
            >
              <Text style={diveStyles.footerButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={diveStyles.footerButton}
              
              onPress={()=>{this.onSave()}}
            >
              <Text style={diveStyles.footerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}