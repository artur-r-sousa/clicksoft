import React, { Component } from 'react';
import { FlatList, SafeAreaView, TextInput, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { Container, Title, Posts, PostText, UserId, Item } from '../styles.js'

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.fetchUserFromApi();
        this.state = {
            postData: [],
            userData: []
        };
    }

    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {
            this.setState({postData: response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    fetchUserFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=> {
            this.setState({userData: response.data})
            console.log(this.state.userData['1']['id'])

        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        
        const { postData } = this.state;
        const { userData } = this.state;
        const { navigate } = this.props.navigation;

        return ( 
            <Container>
                <Title> Empresa X </Title>
                <SafeAreaView>
                    <Posts> 
                        <FlatList
                            data={postData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => {
                                        navigate('Details', {itemId: item.id})}
                                    }
                                        >
                                        <Item>
                                            <UserId>{userData[item.userId]['name']}</UserId>
                                            <PostText>{item.body}</PostText>
                                            <TextInput
                                                placeholder="Enter comment"
                                            > </TextInput>
                                        </Item>
                                    </TouchableWithoutFeedback>
                                )
                            }}
                            
                        />
                    </Posts>
                </SafeAreaView>
            </Container>
        )
    }
}