import React, { Component } from 'react';
import { StyleSheet , View , Button , TouchableOpacity } from 'react-native';
import { Thumbnail,Text, } from 'native-base';


const styles = StyleSheet.create({
  view:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  view_thumb:{
    marginTop:10,
    marginLeft:6,
    marginRight:6
  }
});

export default class SearchBarExample extends Component {
  
  render() {
    const { navigate } = this.props.navigator
    return (
      <View>
        <View style={styles.view}>
          <TouchableOpacity
          onPress={() => navigate('Pedia')}>
            <View style={styles.view_thumb}>
               <Thumbnail source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
               <Text>农技视频</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.view_thumb}>
            <Thumbnail source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text>农技视频</Text>
          </View>
          <View style={styles.view_thumb}>
            <Thumbnail source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text>农技视频</Text>
          </View>
          <View style={styles.view_thumb}>
            <Thumbnail source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text>农技视频</Text>
          </View>
          <View style={styles.view_thumb}>
            <Thumbnail source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'}} />
            <Text>农技视频</Text>
          </View>
        </View>
      </View>
    );
  }
}