import React from 'react';
import { TextInput, Text, View, Alert,
  Image, TouchableOpacity, KeyboardAvoidingView} 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

  onCreateAccount =  async () => {
    // check that this is a valid email (skipping this)
    // check password rules (skipping this)
    // check that passwords match (skipping this)
    // check that displayName isn't empty (skipping this)

    // check that user doesn't already exist
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.emailInput) {
        console.log("Found matching user, display error message and bail");

        Alert.alert(
          'Duplicate User', // title
          'User ' + this.state.emailInput + ' already exists.', // message
          [{text: 'OK',style: 'OK'}] // buttons
        );

        return; // return from the function, not going to create user
      } 
    } 

    // if we made it through loop, no user exists!
    console.log("no matching user found, creating new one!");
    let newUser = await this.dataModel.createUser( 
      this.state.emailInput,
      this.state.passwordInput,
      this.state.displayNameInput
    );

    // navigate to the "People" page, passing the current user
    this.props.navigation.navigate("People", {
      currentUser: newUser
    });
  }


  onLogin = () => {
    let users = this.dataModel.getUsers();
    let email = this.state.emailInput;
    let pass = this.state.passwordInput;

    for (let user of users) {
      if (user.email === email) { // find this user
        if (user.password === pass) { // check their password
          // success! Let them in!
          this.props.navigation.navigate("People", {
            currentUser: user
          });

          return;
        }
      }
    }

    // failure! we got through all the users with no match - generic error message
    Alert.alert(
      'Login Failed',
      'No match found for this email and password.',
      [{ text: 'OK',style: 'OK'}]
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
            <Text 
              style={loginStyles.inputLabel}
            >Email:</Text>

            <TextInput
              style={loginStyles.inputText}
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              autoCompleteType='email'
              textContentType='emailAddress'
              value={this.state.emailInput}
              onChangeText={(text)=>{this.setState({emailInput: text})}}
            />
          </View>

          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Display Name:</Text>

              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.displayNameInput}
                onChangeText={(text)=>{this.setState({displayNameInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}

          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>Password:</Text>
            
            <TextInput
              style={loginStyles.inputText}
              autoCapitalize='none'
              autoCorrect={false}
              textContentType='password'
              value={this.state.passwordInput}
              onChangeText={(text)=>{this.setState({passwordInput: text})}}
            />
          </View>
          
          {this.state.mode === 'create' ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>Re-enter Password:</Text>
              
              <TextInput
                style={loginStyles.inputText}
                autoCapitalize='none'
                autoCorrect={false}
                textContentType='password'
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
              onPress={()=>{
                this.setState({mode: 'create'})
              }}
              >
              <Text style={loginStyles.buttonText}>Create Account</Text>
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
              onPress={()=>{
                this.setState({mode: 'login'})
              }}
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