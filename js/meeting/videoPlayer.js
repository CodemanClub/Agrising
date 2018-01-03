import React, { Component } from 'react';
import { View, Text,ScrollView } from 'react-native';
import VideoPlayer from 'react-native-video-player';

import Request from '../common/request';

const VIMEO_ID = '179859217';

export default class Video extends Component {
  constructor() {
    super();

    this.state = {
      video: { width: 100, height: 100, duration: undefined },
      video: null,
    };
  };
  componentDidMount=()=>{
    const { params } = this.props.navigation.state;
    Request.get('getMeetingByKeyId/'+params.id)
        .then((responseJson) => {
          this.setState({
            video:responseJson.data
          })
        }).catch((error) => {
          console.error(error);
    });
  };

  render() {
    if (this.state.video) {
      return (
        <View>
          <ScrollView>
            <Text style={{ fontSize: 22, marginTop: 22 }}>{this.state.video.name}</Text>

            <VideoPlayer
              endWithThumbnail
              fullScreenOnLongPress={true}
              thumbnail={{ uri: this.state.video.cover }}
              video={{ uri: this.state.video.video_url }}
            />
            
            <Text style={{ fontSize: 22, marginTop: 22 }}>{this.state.video.introduction}</Text>
          </ScrollView>
        </View>
      );
    }else{
      return <Text>加载中.....</Text>
    }
    
  }
}