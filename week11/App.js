import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getDataModel } from './DataModel';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

class ImageTest extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./images/ImageNotAvailable.png')}
        />

        <Image
          style={styles.logo}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
      </View>
    );
  }
}

// export default ImageTest;


class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    // get a reference to the DataModel
    this.dataModel = getDataModel();

    // subscribe to updates, specifying the callback
    this.dataModel.subscribeToImageUpdate(this.onImageUpdate);
  
    // initialize state with the placeholder image
    this.state = {
      theImage: require('./images/ImageNotAvailable.png')
    }
  }

    // the callback to execute when a new image is available
    onImageUpdate = (imageObject) => {
      this.setState({
        theImage: imageObject
      });
    }

    // display the image and provide a button for navigating to CameraScreen
    render() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.mainImage}
            source={this.state.theImage}
          />

          <Button
            title="Take a Picture!"
            onPress={()=>{
              this.props.navigation.navigate('Camera');
            }}
          />
        </View>
      );
    }
}

class CameraScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();

    this.state= {
      hasCameraPermission: false,
    }
  }

  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = async () => {
    let cameraPerms = await Permissions.askAsync(Permissions.CAMERA);
    let permGranted = cameraPerms.status === 'granted';

    this.setState({
      hasCameraPermission: permGranted
    });
  }

  onTakePicture = async () => {
    let picData = await this.cameraRef.takePictureAsync();
    this.dataModel.updateImage(picData);
    this.props.navigation.goBack();
  }
  
  render() {
    return (
      <View style={styles.cameraContainer}>
        {this.state.hasCameraPermission ?
          <View style={{flex: 1}}>
            <Camera 
              style={styles.camera}
              ratio='4:3'
              pictureSize='Medium'
              ref={ref => this.cameraRef = ref}
            />

            <TouchableOpacity 
              style={styles.cameraControls}
              onPress={this.onTakePicture}>
              <Text style={styles.snapText}>Snap!</Text>
            </TouchableOpacity>
          </View>
        :
          <Text>
            No access to camera.
          </Text>
        }   
      </View>
    );
  }
}

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
      >
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 400,
    height: 100,
    resizeMode: 'contain'
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 0.85,
  },
  cameraControls: {
    flex: 0.15, 
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: '5%',
    width: '100%',
    backgroundColor: '#222'
  },
  snapText: {
    fontSize: 36,
    color: 'white'
  },
  mainImage: {
    height: 400,
    width: 300,
    resizeMode: 'contain'
  },
});