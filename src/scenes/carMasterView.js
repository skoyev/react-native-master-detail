import React, { Component } from 'react';
import { Text, View, ListView, FlatList, StyleSheet, TouchableHighlight, ActivityIndicator } from 'react-native';

import Row from '../components/row'
import cars from '../data/cars.json'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    backgroundColor: '#260047'
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  row: {
      flex: 1,
      padding: 12,
      flexDirection: 'row',
      alignItems: 'center',
  }
});

/**
 * Car list view with infinite scrolling option.
 *
 * @author Sergiy Koyev
 */
export default class CarMasterView extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    title: 'FancyCars Mobile App By Sergiy K',
    headerTitleStyle:{
      color: 'white'
    },
    headerStyle: {
     backgroundColor:'#D20A4B'
   }
 });

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      page: 1,
      data: [],
      itemsPerPage: 10
    }
  }

  componentWillMount() {
    this.fetchCarData();
  }

  handleLoadMoreCars = (param) => {
    console.log(param);
    let {data} = this.state;
    if(this.state.data.length-1 <= cars.length-this.state.itemsPerPage){
      this.setState({
        page: param.distanceFromEnd == 0 ? this.state.page+1 : this.state.page,
        data: cars.slice(0, this.state.itemsPerPage*this.state.page)
      });
    }
  }

  /*
   * Load car data from the car json file.
   */
  async fetchCarData(){
    try{
      this.setState({dataSource:
        this.state.dataSource.cloneWithRows(
          cars.slice(0,this.state.itemsPerPage))});
    } catch(error){
      console.error(error);
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ListView
          pagingEnabled={true}
          onEndReachedThreshold={0.5}
          onEndReached={this.handleLoadMoreCars.bind(this)}
          keyExtractor={(item, index) => item.id.toString()}
          contentInset={{bottom:15}}
          automaticallyAdjustContentInsets={false}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow = {
             (rowData) => (
               <TouchableHighlight
                onPress={() => navigate('CarDetailView', {data: rowData})}>
                 <View>
                  <Row name={rowData.name}
                       make={rowData.make}
                       img={rowData.img}
                       year={rowData.year}
                       available={rowData.available}
                  />
                </View>
              </TouchableHighlight>
             )
          }
        />
      </View>
    );
  }
}
