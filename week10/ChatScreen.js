import React from 'react';
import { TextInput, Text, View, 
  FlatList, KeyboardAvoidingView } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { chatStyles, colors } from './Styles';
import { getDataModel } from './DataModel';

export class ChatScreen extends React.Component {
  constructor(props) {
    super(props);

    this.self = this.props.route.params.currentUser;
    this.other = this.props.route.params.otherUser;
    this.dataModel = getDataModel(); // also add this to imports!

    this.state = {
      messages: [], // start with an empty message list--no dummies!
      inputText: ''
    }
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({title: this.other.displayName});

    // instead of loading messages once, we will subscribe to message updates
    this.subscribeToChat();
  }

  subscribeToChat = async() => {
    // call getOrCreateChat and capture the result in this.chat
    this.chat = await this.dataModel.getOrCreateChat(this.self, this.other);

    // when we subscribe, we will receive an update right away
    // and anytime there's a change thereafter. So we don't want to setState()
    // here but when we get the updates
    this.dataModel.subscribeToChat(this.chat, this.onChatUpdate);
  }

  onChatUpdate = () => {
    console.log('Got chat update', this.chat);
    this.setState({messages: this.chat.messages});
  }

  onMessageSend = async () => {
    let messageData = {
      text: this.state.inputText,
      timestamp: Date.now(), // an integer, which is fine
      author: this.self,
    }

    // tell the DataModel to add the message to this chat
    await this.dataModel.addChatMessage(this.chat.key, messageData);

    // call setState to update this component's state and the UI
    this.setState({
      // assign this.state.messages to this.chat.messages, which has been updated
      messages: this.chat.messages, 
      inputText: ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={chatStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={100}>
        <View style={chatStyles.messageListContainer}>
          <FlatList
            data={this.state.messages}

            ref={(ref) => {this.flatListRef = ref}}

            onContentSizeChange={() => {
              if (this.flatListRef) {
                this.flatListRef.scrollToEnd();
              }
            }}

            renderItem={({item})=>{
              return (
                <View style={item.author === this.self ? 
                  chatStyles.chatTextSelfContainer :
                  chatStyles.chatTextOtherContainer
                }>
                  <Text style={item.author === this.self ? 
                    chatStyles.chatTextSelf :
                    chatStyles.chatTextOther
                  }>{item.text}</Text>
                </View>
              );
            }}
          />
        </View>

        <View style={chatStyles.inputContainer}>
          <View style={chatStyles.inputRow}>
            <TextInput 
              style={chatStyles.inputBox}

              value={this.state.inputText}

              returnKeyType={'send'}

              onChangeText={(text) => {
                this.setState({inputText: text})
              }}

              onSubmitEditing={this.onMessageSend}/>
              
            <Ionicons 
              name='md-send' 
              size={36}
              color={colors.primary}
              onPress={this.onMessageSend}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}