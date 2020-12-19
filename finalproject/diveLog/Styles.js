import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#7986CB', // MD Amber 500
  primaryDark: '#303F9F', // MD Brown 300
  primaryLight: '#E8EAF6', // MD Amber 200
  outline: '#BDBDBD' // MD Gray 400
}

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  },
    topView: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '100%',
    },
      logoImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
      },
    middleView: {
      flex: 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      //backgroundColor: 'lightgreen'
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15
      },
        inputLabel: {
          flex: 0.3,
          justifyContent: 'flex-end',
          paddingRight: 5,
          textAlign: 'right',
          fontSize: 10
        },
        inputText: {
          flex: 0.5,
          borderColor: colors.outline,
          paddingLeft: 5,
          borderBottomWidth: 1,
          fontSize: 18,
        },
      bottomView: {
        flex: 0.3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
        buttonContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.outline,
          borderRadius: 6,
          backgroundColor: colors.primary,
          width: 100,
          height: 50
        },
          buttonText: {
            textAlign: 'center',
            color: 'white'
          }
});

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1
  },
    camera: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
    },
      flip: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
        flipText: {
          fontSize: 18,
          marginBottom: 10,
          color: 'white'
        }
});

export const timelineStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },
    separator: {
        width: '100%', 
        height: 1, 
        backgroundColor: colors.primaryLight
    },
    body: {
      flex: 0.4, // FLAG
      alignItems: 'stretch',
      justifyContent: 'center',
      width: '100%',
      padding: '5%',
    },
      listContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch', // this turns out to be important!
        padding: 15,
      },
        // Body
        listDiveContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        },
        listDiveTextContainer: {
          flex: 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
          listDiveText: {
            fontSize: 18,
          },
        listDiveButtonContainer: {
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
    footer: {
      flex: 0.2,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
});



export const diveStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  separator: {
      width: '100%', 
      height: 1, 
      backgroundColor: colors.primaryLight
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: colors.primary,
  },
    headerText: {
      fontSize: 24,
    },
  body: {
    flex: 0.4,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    padding: '5%',
  },
    listHeaderText: {
      fontSize: 16,
      padding: 15
    },  
    listContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch', // this turns out to be important!
      padding: 15,
    },
      // Body
      textInputContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
      },
        textInputLabel: {
          fontSize: 24,
          paddingBottom: 15
        },
        textInputBox: {
          borderColor: colors.outline,
          borderWidth: 1,
          width: '80%', 
          height: 40, 
          fontSize: 24,
          padding: 5,
        },
  footer: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

    // Footer
    footerButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
      footerButton: {
        flex: 0.2,
        borderRadius: 12,
        borderColor: colors.outline,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: '5%',
        backgroundColor: colors.primaryDark
      }
});