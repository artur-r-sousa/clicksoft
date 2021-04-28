import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from '../styles.js';

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.state = {};
        this.styles=styles;
    }

    render() {
        return (
            <View style={this.styles.container}>
                <Text> Home Page </Text>
            </View>
        )
    }
}