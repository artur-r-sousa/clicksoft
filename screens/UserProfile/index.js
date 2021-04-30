import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import axios from "axios";
import { Avatar, ProfileText, ProfileUsername, LatestPostLabel } from '../styles.js'

export default class UserProfile extends Component{
    constructor(props: {}){
        super(props);
        this.fetchUserFromApi(this.props.route.params.userId);
        this.state = {
            data: {},
            address: {},
            geo: {},
            company: {}
        };
    }

    fetchUserFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> {
            this.setState({
                data: response.data, 
                address: response.data.address, 
                geo: response.data.address.geo,
                company: response.data.company,
                
            })
            this.setState({
                isLoading: false
            })
            
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render(){
        
        return(
            <View>
                <Avatar source={require('../assets/user-icon.png')}/>
                <ProfileUsername>{this.state.data.name}</ProfileUsername>
                <ProfileText>username: {this.state.data.username}</ProfileText>
                <ProfileText>email: {this.state.data.email}</ProfileText>
                <ProfileText>street: {this.state.address.street}</ProfileText>
                <ProfileText>lat: {this.state.geo.lat}</ProfileText>
                <ProfileText>phone: {this.state.data.phone}</ProfileText>
                <ProfileText>company name: {this.state.company.name}</ProfileText>
                <LatestPostLabel> Latest posts by {this.state.data.name} </LatestPostLabel>
            </View>
        )

    }
}
