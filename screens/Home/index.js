import React, { Component } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import axios from "axios";
import { Container, Title, Posts, PostText, UserName, Item, AppBar } from '../styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.fetchUsersFromApi();
        this.state = {
            isLoading: true,
            postData: [],
            userData: [],

        };
    }




    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {
                this.setState({postData: response.data});
                this.setState({isLoading: false})
            }
        )
        .catch((error)=>{
            console.log(error);
        })
    }

    fetchUsersFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/users').then((response)=> {
            this.setState({userData: response.data});    
        })
        .catch((error)=>{
            console.warn(error);
        })
    }
   
    deleteItemFromApi(itemId) {
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+itemId).then((response) => {

        })
        .catch((error)=>{
            console.warn(error);
        })

    }

    deleteFromState(itemId) {
        let posts = []
        for(let item of this.state.postData){
            if(item.id != itemId){
                posts.push(item)
            }
        }
        this.setState({postData: posts})
    }

    render() {
        
        const { postData, isLoading } = this.state;
        const { userData } = this.state;
        const { navigate } = this.props.navigation;

        return ( 
            <Container>
                <AppBar>
                    <Title> Empresa X </Title>
                </AppBar>
                
                <SafeAreaView>
                    {isLoading ? <ActivityIndicator /> : (
                        <FlatList
                            data={postData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => {
                                return (
                                    <Posts>
                                        
                                        <TouchableWithoutFeedback onPress={() => {
                                            navigate('Details', {itemId: item.id})}
                                        }
                                            >
                                            <Item>
                                                <TouchableWithoutFeedback onPress={()=>{navigate('UserProfile', {userId: userData[item.userId]['id']})}}>
                                                    <UserName>{userData[item.userId - 1]['name']}</UserName>
                                                </TouchableWithoutFeedback>

                                                <PostText>{item.body}</PostText>

                                            </Item>
                                        </TouchableWithoutFeedback>

                                        <TouchableWithoutFeedback>
                                            <Icon name="delete-outline" size={30} color="black" onPress={()=>{
                                                this.deleteItemFromApi(item.id)
                                                this.deleteFromState(item.id)
                                            }}></Icon>
                                        </TouchableWithoutFeedback> 
                                    </Posts>
                                        
                                )
                            }}
                        />
                    )}                   
                </SafeAreaView>
            </Container>
        )
    }
}