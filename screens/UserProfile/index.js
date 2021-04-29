import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";

export default class UserProfile extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi(this.props.route.params.userId);
        this.state = {
            data: {}
        };
    }

    fetchFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> {
            this.setState({data: response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){


        return(
            <View>
                <Text> {this.state.data.name} </Text>
            </View>
        )

    }
}
