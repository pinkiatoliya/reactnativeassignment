import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Card, CardItem, Body, Spinner, H3 } from 'native-base';

const API_KEY = '5kMDuVV8bMJOK85DvE83hdLYCBPgV3hCOIei45HL';

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            asteroidData: {},
            isDataFound: false,
            isLoading: true
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        fetch('https://api.nasa.gov/neo/rest/v1/neo/' + this.props.route.params + '?api_key=' + API_KEY).then(res => res.json()).then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                asteroidData: res,
                isDataFound: true,
                isLoading: false
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                asteroidData: {},
                isDataFound: false,
                isLoading: false
            })
        })
    }
    render() {
        const localAsteroidData = this.state.asteroidData;
        return (
            <View style={styles.screen}>
                 {this.state.isLoading?  <Spinner color='blue' /> : 
                 (this.state.isDataFound && !this.state.isLoading) ? 
                 <Card style={styles.card}>
                 <CardItem header bordered>
                     <H3>Asteroid Details</H3>
                 </CardItem>
                 <CardItem bordered>
                     <Body>
                         <Text>Name: &nbsp; {localAsteroidData.name} </Text>
                         <Text>nasa_jpl_url:&nbsp; {localAsteroidData.nasa_jpl_url} </Text>
                         <Text>is_potentially_hazardous_asteroid:&nbsp; {localAsteroidData.is_potentially_hazardous_asteroid ? 'True': 'False' } </Text>
                     </Body>
                 </CardItem>
             </Card>
         : <Text>No Data Found</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        width: '90%'
    }
})
export default DetailScreen;