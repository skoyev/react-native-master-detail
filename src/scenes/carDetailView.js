import React, { Component } from 'react';
import { Alert, Text, Button, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 10,
    backgroundColor: '#260047',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  name: {
    color: '#D20A4B',
    fontSize: 24,
    padding:10,
    textAlign:'center',
    marginTop:10
  },
  text:{
    color:'white',
    fontSize:16,
    textAlign:'center',
    padding:5
  }
});

/**
 * Car Detail component.

 * @author Sergiy Koyev
 */
export default class CarDetailView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    title: 'Car Details',
    headerTitleStyle:{
      color: 'white'
    },
    headerStyle: {
     backgroundColor:'#D20A4B'
   }
 });

 onPurchaseCar(){
   Alert.alert('Purchase Car!');
 }

  render() {
    const { params } = this.props.navigation.state;
    return(
      <View style={styles.container}>
        <View style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
          <Image
              source={{uri: params.data.img}}
              style={{width: 128, height: 128, margin: 10}}
            />
          <Text style={styles.name}>{params.data.name}</Text>
          <Text style={styles.text}>Car Make: {params.data.make}</Text>
          <Text style={styles.text}>Car Year: {params.data.year}</Text>
          {
            params.data.available === 'In Dealership' ?
              <Button onPress={this.onPurchaseCar}
                      title="Buy Car"
                      color="#841584"/> : null
          }
        </View>

      </View>
    );
  }
}
