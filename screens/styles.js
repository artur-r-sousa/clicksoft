import React from 'react';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#009dff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    },
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
    },
    posts: {
        padding: 8,
        paddingBottom: 5,
        color: "#000000",
        backgroundColor: "#FFF"
    },
    postText: {
        padding: 10
    },
    userId: {
        fontSize: 13
    }

})

export default styles;