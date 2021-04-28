import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from "axios";
import styles from '../styles.js';

//what

export default class Home extends Component{
    constructor(props: {}){
        super(props);
        this.fetchFromApi();
        this.state = {
            postData: []
        };
        this.styles=styles;
    }

    fetchFromApi(){
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=> {
            this.setState({postData: response.data})
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        
        const { postData } = this.state;

        return ( 
            <View style={this.styles.container}>
                <View style={this.styles.header}>
                    <Text style={this.styles.titleText}> Empresa X </Text>
                </View>

                <View style={this.styles.posts}> 
                    <FlatList
                        data={postData}
                        keyExtractor={(item) => item.id.toString()}
                        style={this.styles.posts}
                        renderItem={({item}) => {
                            //change id for user Names
                            return (
                                <View>
                                    <Text style={this.styles.userId}>{item.id}</Text>
                                    <Text style={this.styles.postText}>{item.body}</Text>
                                </View>
                            )
                        }}
                        
                    />
                </View>
            </View>
        )
    }
}