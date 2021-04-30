import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from "axios";


export default class UserProfile extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi(this.props.route.params.userId);
        this.state = {
            data: {},
            address: {},
            geo: {},
            company: {}
        };
    }

    fetchFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> {
            this.setState({
                data: response.data, 
                address: response.data.address, 
                geo: response.data.address.geo,
                company: response.data.company
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){
        return(
            <View>

                <Text>name: {this.state.data.name}</Text>
                <Text>username: {this.state.data.username}</Text>
                <Text>email: {this.state.data.email}</Text>
                <Text>street: {this.state.address.street}</Text>
                <Text>lat: {this.state.geo.lat}</Text>
                <Text>phone: {this.state.data.phone}</Text>
                <Text>company name: {this.state.company.name}</Text>
            </View>
        )

    }
}
