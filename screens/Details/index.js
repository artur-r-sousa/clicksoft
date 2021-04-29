import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Details extends Component{
    constructor(props: {}){
        super(props);
        this.state = {};
    }

    render() {

        const { route } = this.props;

        return (
          <View>
              <Text>{route.params.itemId}</Text>
          </View>  
        );
    }
}