import React, { Component } from 'react';
import { View, Card, Button, Text, Form, Item, Label, Input } from 'native-base';

const API_KEY = '5kMDuVV8bMJOK85DvE83hdLYCBPgV3hCOIei45HL';
class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            asteroidID: null,

        }
    }
    
    // componentWillMount = ()=>{
    //     this.setState({
    //         asteroidID: null
    //     });
    // }
    getRandomIndex = (max)=>{
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomAsteroid = ()=>{
        console.log('random function');
      fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key='+ API_KEY).then(response=> response.json()).then(response=>{
              let dataArray = response.near_earth_objects;
              const randomIndex = this.getRandomIndex(response.page.size);
              console.log(randomIndex, response.page.size);
              const asteroidID = dataArray[randomIndex].id;
              this.commonPageCall(asteroidID);
      }).catch(error=>{

      })
    };

    navigateToDetailPage = ()=>{
      this.commonPageCall(this.state.asteroidID);
    }

    commonPageCall = (asteroidID)=>{
        this.props.navigation.navigate('Detail', asteroidID);
    }

    textChangeHandler = (e)=>{
        if(!!e){
            this.setState({
                asteroidID: e.replace(/[^0-9]/g, '')
            });
        }else{
            this.setState({
                asteroidID: null
            });
        }
    }
    render() {
        const asteroidID = this.state.asteroidID;
        return (
            <Card style={{padding: 15}}>
                <Form>
                    <Item floatingLabel>
                        <Label>Enter Asteroid ID</Label>
                        <Input value={asteroidID}
                        onChangeText = {this.textChangeHandler}
                        maxLength={7}
                        autoCorrect={false} />
                    </Item>
                    </Form>
                    <View style={{flexDirection: "row", justifyContent: 'flex-end', marginVertical: 10}}>
                        <Button 
                        primary 
                        style={{marginHorizontal: 5, padding: 10}}onPress={this.navigateToDetailPage} 
                        disabled = {!!!asteroidID}
                        ><Text>Submit</Text></Button>

                        <Button success style={{marginHorizontal: 5, padding: 10}}onPress={this.getRandomAsteroid}><Text>Random Asteroid</Text></Button>
                    </View>
               
            </Card>
        );
    }
}

export default HomeScreen;