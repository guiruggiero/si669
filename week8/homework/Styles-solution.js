
import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#FFC107', // MD Amber 500
    primaryDark: '#A1887F', // MD Brown 300
    primaryLight: '#FFE082', // MD Amber 200
    outline: '#BDBDBD' // MD Gray 400
  }

export const styles = StyleSheet.create({
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
        // Empty list message
        emptyListMessageContainer: {
          flex: 0.2,
          justifyContent: 'center',
          alignItems: 'center',
        },
        emptyListMessageText : {
          fontSize: 18

        },
        // Home Screen body
        listItemContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
        },
        listItemTextContainer: {
          flex: 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
          listItemText: {
            fontSize: 18,
          },
        listItemButtonContainer: {
          flex: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },

        // Detail Screen body
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

      // Detail Screen footer
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
        disabledButton: {
          backgroundColor: colors.outline
        }

});