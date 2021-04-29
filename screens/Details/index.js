import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

export default class Details extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi(this.props.route.params.itemId);
        this.state = {
            data: {}
        };
    }

    fetchFromApi(itemId){
        axios.get('https://jsonplaceholder.typicode.com/posts/'+itemId).then((response)=> {
            this.setState({data: response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    

    render() {

        const { route } = this.props;

        return (
          <View>
              <Text>{this.state.data.body}</Text>
          </View>  
        );
    }
}