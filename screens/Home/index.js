import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <Text> Home Page </Text>
            </View>
        )
    }
}