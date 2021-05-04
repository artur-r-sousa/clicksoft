import React, { Component } from 'react';
import { FlatList, SafeAreaView, ActivityIndicator, TouchableWithoutFeedback, Text, View, ScrollView, SectionList } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Title, Posts, PostText, UserName, Item, AppBar } from '../styles.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Home extends Component{
    constructor(props: {}){
        super(props); 
        this.isLoading = true;
        this.state = {
            isLoading: true,
            postData: [],
            userData: [],
        };
        
        
    } 

    componentDidMount(){ 
        this.checkForKey();
        this.fetchUsersFromApi();
        this.props.navigation.addListener('focus', () => {
            this.props.route.params == undefined ? "" : this.addToState();

        })
        
    }


    async checkForKey(){
        try{
            const key = await AsyncStorage.getItem('1');
            key==null ? this.fetchFromApi() : this.getData();

        }catch(error){
            console.log('ho')
            return false;
        }
    }


    async getData () {
        try{
            console.log('got')
            const keys = await AsyncStorage.getAllKeys();
            let arrayHolder = []
            if(keys!=undefined){
                for(let value of keys) {
                    if(value != undefined) {
                        let item = await AsyncStorage.getItem(value);
                        
                        arrayHolder.push(JSON.parse(item))
                    }
                }
            }   
            console.log(arrayHolder[9]['id'], 'arrayHolder')
            this.setState({postData : arrayHolder})
            this.isLoading = false;
        } catch(error) {
            console.log(error)

        }
    }
    fetchFromApi(){  
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {  
                this.setState({postData: response.data});  
                this.isLoading = false;
                
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
        axios.delete('https://jsonplaceholder.typicode.com/posts/'+itemId).then(() => {
        this.deleteFromState(itemId)
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

    async storeData (item) {
        try{
            const itemId = JSON.stringify(item.id)
            const itemString = JSON.stringify(item)
            await AsyncStorage.setItem(
                itemId,
                itemString
            );
        } catch(error) {
            console.error(error);
        }
    }

    addToState() {
        let posts = []
        for(let item of this.state.postData){            
            item.id = item.id+1
            posts.push(item) 
        }
        this.props.route.params.newPostData.id = 1
        posts.unshift(this.props.route.params.newPostData)
        for (let item of posts){
            this.storeData(item) 
        }    
        this.setState({postData: posts})
        this.isLoading = false;
        
    } 

    render() {
        
        const { postData, userData } = this.state; 
        const { navigate } = this.props.navigation;  

        return ( 
            <Container>
                <AppBar>
                    <Title> Empresa X </Title>
                </AppBar>

                        <SafeAreaView>
                            {this.isLoading ? <ActivityIndicator /> : (
                                <FlatList 
                                    contentContainerStyle={{ paddingBottom: 150 }}
                                    data={postData}
                                    keyExtractor={(item) => item["id"].toString()}
                                    renderItem={({item}) => {
                                        return (
                                            <Posts>
                                                    
                                                <TouchableWithoutFeedback onPress={() => {
                                                    navigate('Details', {itemId: item.id})} 
                                                }
                                                    >
                                                    <Item> 
                                                        
                                                        <TouchableWithoutFeedback onPress ={()=>{navigate('UserProfile', {userId: userData[item.userId - 1]['id']})}}>
                                                            <UserName>{userData[item.userId - 1]['name']}</UserName> 
                                                        </TouchableWithoutFeedback>
                                                        <View>
                                                            <Text>{item.title}</Text> 
                                                        </View>
                                                        <PostText>{item.body}</PostText>

                                                    </Item>
                                                </TouchableWithoutFeedback> 
                                                    <Icon name="delete-outline" size={30} color="black" onPress={()=>{
                                                        this.deleteItemFromApi(item.id)
    
                                                    }}></Icon>

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