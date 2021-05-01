import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { Container, Posts, PostText, UserName } from '../styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Details extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi(this.props.route.params.itemId);
        this.state = {
            postData: {},
            userData: {},
            address: {},
            geo: {},
            company: {}
        };
    }

    fetchUserFromApi(userId){
        axios.get('https://jsonplaceholder.typicode.com/users/'+userId).then((response)=> {
            this.setState({
                userData: response.data, 
                address: response.data.address, 
                geo: response.data.address.geo,
                company: response.data.company,
            });
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    fetchFromApi(itemId){
        axios.get('https://jsonplaceholder.typicode.com/posts/'+itemId).then((response)=> { 
            this.setState({postData: response.data});
            this.fetchUserFromApi(this.state.postData.userId);
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    deleteItemFromApi(itemId) {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+itemId)
        this.setState({})
    }




    render() {
        const { route } = this.props;
        const { navigate } = this.props.navigation;

        return (
          <Container>
                <Posts>
                    <UserName>{this.state.userData.name}</UserName>
                    <PostText>{this.state.postData.title}</PostText>
                    <Text>{this.state.postData.body}</Text>
                </Posts>

                

          </Container>  
        );
    }
}