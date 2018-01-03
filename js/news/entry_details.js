import React, { Component } from 'react';
import {WebView,View,Text} from 'react-native';
import Request from '../common/request';



export default class NewsEntry extends Component {
	constructor(props) {
		super(props);
		this.state={
		  link:null
		}
	};
	componentDidMount = () => {
		const { params } = this.props.navigation.state;
	    Request.get('getNewsById/'+params.id)
	      .then((responseJson) => {
	        this.setState({
	          link:responseJson.data.link
	        })
	      }).catch((error) => {
	        console.error(error);
	    });
	};
	render() {

		if(this.state.link) {
			return (
			<WebView
		        source={{uri: 'https://www.agrising.cn/'+this.state.link}}
		        style={{marginTop: 20}}
		        javaScriptEnabled={true}
		        mediaPlaybackRequiresUserAction={true}
		        mixedContentMode="always"
		        allowsInlineMediaPlayback={true}
		     />
			);
		}else{
			return <Text>加载中......</Text>
		}
		
	}
}