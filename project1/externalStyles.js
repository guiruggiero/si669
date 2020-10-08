import { StyleSheet } from 'react-native';

export const externalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffFFF',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },

        header: {
            flex: 0.12,
            flexDirection: 'row',
            backgroundColor: '#2b344f',
            paddingTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
        },

            headerText: {
                fontSize: 35,
                fontWeight: "bold",
                color: 'white',
            },

            lastUpdated: {
                fontSize: 12,
                color: 'lightgrey',
            },

            refresh: {
                height: 65,
                width: 80,
                backgroundColor: 'lightblue',
                borderColor: 'black',
                borderWidth: 3,
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
            },

        body: {
            flex: 0.88,
            backgroundColor: '#fffFFF',
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            paddingBottom: 5,
        },

            list: {
                flexDirection: 'row',
                paddingTop: 3,
                paddingBottom: 3,
                paddingLeft: 20,
                paddingRight: 20,
                alignItems: 'center',
                justifyContent: 'flex-start',
            },

                rankingContainer: {
                    flex: 0.1,
                },

                    ranking: {
                        fontSize: 30,
                        fontWeight: "bold",
                        color: '#613064',
                        textAlign: 'center',
                    },

                itemsContainer: {
                    flex: 0.9,
                    paddingLeft: 5,
                },

                    university: {
                        fontSize: 20,
                        fontWeight: "bold",
                        color: '#635f94',
                    },

                    schoolName: {
                        fontSize: 12,
                        color: 'black',
                    },
});