import React from 'react';
import { TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Alert} from 'react-native';

import { loginStyles } from './Styles';
import { getDataModel } from './DataModel';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();

    this.state = {
      mode: 'login',
      emailInput: '',
      displayNameInput: '',
      passwordInput: '',
      passwordCheckInput: ''
    }
  }

  onCreateAccount = async () => {
    // check that this is a valid email (skipping this)
    // check password rules (skipping this)
    // check that passwords match (skipping this)
    // check that displayName isn't empty (skipping this)

    // check that user doesn't already exist
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.emailInput) {
        
        Alert.alert(
          'Duplicate user',
          'User ' + this.state.emailInput + ' already exists',
          [{text: 'OK',style: 'OK'}]
        );

        return;
      } 
    }
    
    // made it through loop, no user exists!
    let newUser = await this.dataModel.addUser(
      this.state.emailInput,
      this.state.passwordInput,
      this.state.displayNameInput
    );

    this.props.navigation.navigate("Timeline", {
      currentUser: newUser
    });
  }

  onLogin = () => {
    let users = this.dataModel.getUsers();
    let email = this.state.emailInput;
    let pass = this.state.passwordInput;

    for (let user of users) {
      if (user.email === email) {
        if (user.password === pass) { // success!
          this.props.navigation.navigate("Timeline", {
            currentUser: user
          });

          return;
        }
      }
    }

    // we got through all the users with no match, so failure
    Alert.alert(
      'Login failed',
      'No match found for this email and password',
      [{text: 'OK',style: 'OK'}]
    );
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={loginStyles.container}

        behavior={"height"}
        keyboardVerticalOffset={10}>
        <View style={loginStyles.topView}>
          <Image 
            source={require('./assets/logo.png')}

            style={loginStyles.logoImage}
          />
        </View>

        <View style={loginStyles.middleView}>
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>
              Email:
            </Text>

            <TextInput
              style={loginStyles.inputText}

              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='emailAddress'
              autoCompleteType='email'

              value={this.state.emailInput}

              onChangeText={(text)=>{this.setState({emailInput: text})}}
            />
          </View>

          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>
                Display name:
              </Text>

              <TextInput
                style={loginStyles.inputText}

                autoCapitalize='words'
                autoCorrect={false}
                textContentType='name'
                autoCompleteType='name'

                value={this.state.displayNameInput}

                onChangeText={(text)=>{this.setState({displayNameInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}

          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>
              Password:
            </Text>

            <TextInput
              style={loginStyles.inputText}

              keyboardType='numeric'
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              autoCompleteType='password'

              value={this.state.passwordInput}

              onChangeText={(text)=>{this.setState({passwordInput: text})}}
          />

          </View>
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>
                Repeat password:
              </Text>

              <TextInput
                style={loginStyles.inputText}

                keyboardType='numeric'
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
                autoCompleteType='off'

                value={this.state.passwordCheckInput}

                onChangeText={(text)=>{this.setState({passwordCheckInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}
        </View>

        {this.state.mode === 'login' ? (
          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}

              onPress={()=>{this.setState({mode: 'create'})}}
              >
              <Text style={loginStyles.buttonText}>Create account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={loginStyles.buttonContainer}

              onPress={this.onLogin}
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ):(
          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}

              onPress={()=>{this.setState({mode: 'login'})}}
              >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              
              onPress={this.onCreateAccount}
              >
              <Text style={loginStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}