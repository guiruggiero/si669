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
    body: {
      flex: 0.85,
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
        separator: {
          width: '100%', 
          height: 1, 
          backgroundColor: colors.primaryLight
        },
        listDiveContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        },
          listDiveTextContainer: {
            flex: 0.9,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
            listDiveText: {
              fontSize: 18,
            },
          listDiveButtonContainer: {
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
    footer: {
      flex: 0.15,
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
    header: {
      flex: 0.05,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      padding: 10,
    },
      headerText: {
        fontSize: 22,
      },
    body: {
      flex: 0.8,
      alignItems: 'stretch',
      justifyContent: 'center',
      width: '100%',
    },
      // imageContainer: { // FLAG
      //   flex: 0.3,
      //   justifyContent: 'flex-start',
      // },
      fieldsContainer: {
        flex: 1, // 0.7
        justifyContent: 'flex-start',
      },
        fieldRow: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingVertical: 5
        },
          fieldLabel: {
            flex: 0.6,
            justifyContent: 'flex-start',
            textAlign: 'right',
            fontSize: 20
          },
          fieldBox: {
            borderColor: colors.outline,
            borderWidth: 1,
            width: '70%', 
            height: 40, 
            fontSize: 20,
            padding: 5,
          },
    footer: {
      flex: 0.15,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
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
        },
          footerButtonText: {
            textAlign: 'center',
            color: 'white'
          }
});