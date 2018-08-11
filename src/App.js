/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
// const defaultArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//   21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
//   44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69];
//const datalist = [{ value: 1, selected: false }]
export default class App extends Component {

  state = {
    selectedArray: [],
    showModal: false,
    sixArray: [],
    defaultArray: [{ value: 1, selected: false }, { value: 2, selected: false }, { value: 3, selected: false }, { value: 4, selected: false }, { value: 5, selected: false },
    { value: 6, selected: false }, { value: 7, selected: false }, { value: 8, selected: false }, { value: 9, selected: false }, { value: 10, selected: false },
    { value: 11, selected: false }, { value: 12, selected: false }, { value: 13, selected: false }, { value: 14, selected: false }, { value: 15, selected: false },
    { value: 16, selected: false }, { value: 17, selected: false }, { value: 18, selected: false }, { value: 19, selected: false }, { value: 20, selected: false },
    { value: 21, selected: false }, { value: 22, selected: false }, { value: 23, selected: false }, { value: 24, selected: false }, { value: 25, selected: false },
    { value: 26, selected: false }, { value: 27, selected: false }, { value: 28, selected: false }, { value: 29, selected: false }, { value: 30, selected: false },
    { value: 31, selected: false }, { value: 32, selected: false }, { value: 33, selected: false }, { value: 34, selected: false }, { value: 35, selected: false },
    { value: 36, selected: false }, { value: 37, selected: false }, { value: 38, selected: false }, { value: 39, selected: false }, { value: 40, selected: false },
    { value: 39, selected: false }, { value: 40, selected: false }, { value: 41, selected: false }, { value: 42, selected: false }, { value: 43, selected: false },
    { value: 44, selected: false }, { value: 45, selected: false }, { value: 46, selected: false }, { value: 46, selected: false }, { value: 47, selected: false },
    { value: 48, selected: false }, { value: 49, selected: false }, { value: 50, selected: false }, { value: 51, selected: false }, { value: 52, selected: false },
    { value: 53, selected: false }, { value: 54, selected: false }, { value: 55, selected: false }, { value: 56, selected: false }, { value: 57, selected: false },
    { value: 58, selected: false }, { value: 59, selected: false }, { value: 60, selected: false }, { value: 61, selected: false }, { value: 62, selected: false },
    { value: 63, selected: false }, { value: 64, selected: false }, { value: 65, selected: false }, { value: 66, selected: false }, { value: 67, selected: false },
    { value: 68, selected: false }, { value: 69, selected: false }],
  }

  componentWillMount() {
    this.state.copyDefaultArray = [...this.state.defaultArray];
  }

  onSelectHandler = (value, index) => {
    const copyDefault = [...this.state.defaultArray];
    const copySelected = [...this.state.selectedArray];
    if (this.state.selectedArray.length < 5) {
      const selectedObj = { ...copyDefault[index] }
      selectedObj.selected = true;
      copyDefault[index] = selectedObj;
    }
    if (this.state.selectedArray.length < 6) {
      copySelected.splice(copySelected.length, 0, value);
    }
    this.setState({ selectedArray: copySelected, defaultArray: copyDefault }, () => {
      if (this.state.selectedArray.length == 5) {
        const splitArray = this.state.copyDefaultArray.slice(0, 26);
        this.setState({
          sixArray: splitArray,
          showModal: true
        })
      } else {
        this.setState({
          showModal: false
        })
      }
    });
  }

  _onPressButton = () => {
    this.setState({ selectedArray: [], defaultArray: this.state.copyDefaultArray })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ justifyContent: 'center', textAlign: 'center' }}> Customer Number </Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity onPress={this._onPressButton}>
              <Text style={{ color: 'red' }}>CLEAR</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.selectedArrayStyle}>
          {this.state.selectedArray.map((item, index) => {
            return <View key={index} style={(index !== 5) ? styles.whiteCircle : styles.redCircle}>
              <Text style={{ color: 'black', textAlign: 'center' }} >{item}</Text>
            </View>
          })
          }
        </View>
        <View style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            <FlatList
              data={this.state.defaultArray}
              numColumns={7}
              keyExtractor={(item) => item}
              renderItem={({ item, index }) => <View style={item.selected ? styles.selectedStyle : styles.unSelected}>
                <Text onPress={() => { this.onSelectHandler(item.value, index) }} disabled={item.selected ? true : false} style={{ color: !item.selected ? 'gray' : "black" }}>{item.value}</Text>
              </View>}
            />
            {this.state.selectedArray.length > 5 && <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.submitText}>Submit Ticket</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        </ScrollView>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={() => {
            this.setState({ showModal: false })
          }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000af',
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            top: 120
          }}>
            <View style={{
              width: 350,
              height: 350,
              backgroundColor: '#fff',
              padding: 10
            }}>
              <View>
                <Text style={{ textAlign: 'center' }}>Powerball Number</Text>
              </View>
              <FlatList
                data={this.state.sixArray}
                numColumns={6}
                keyExtractor={(item) => item}
                renderItem={({ item, index }) => <View style={item.selected ? styles.selectedStyle : null}>
                  <Text onPress={() => { this.onSelectHandler(item.value, index) }} style={{ padding: 15, color: !item.selected ? 'gray' : "black" }}>{item.value}</Text>
                </View>}
              />

            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    height: 56,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0,
    padding: 10
  },
  selectedStyle: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 50,
    height: 40,
    width: 40,
    padding: 8,
    margin: 8
  },
  unSelected: {
    borderColor: '#F5FCFF',
    borderWidth: 4,
    borderRadius: 50,
    height: 30,
    width: 40,
    padding: 8,
    margin: 8
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 5,
    margin: 10,
    marginHorizontal: 70,
    padding: 10
  },
  submitText: {
    textAlign: 'center',
    color: '#fff'
  },
  whiteCircle: {
    elevation: 3,
    height: 40,
    width: 40,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 5,
    borderRadius: 50,
    padding: 5,
    margin: 10
  },
  redCircle: {
    elevation: 3,
    height: 40,
    width: 40,
    borderColor: 'red',
    backgroundColor: 'red',
    borderWidth: 5,
    borderRadius: 50,
    padding: 5,
    margin: 10
  },
  selectedArrayStyle: {
    height: 56,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  }
});
