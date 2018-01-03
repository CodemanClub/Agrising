// import React, {Component} from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     Button,
//     View,
//     TouchableOpacity
// } from 'react-native';
// import Echarts from 'native-echarts';
// export default class Quotation extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             option: {
//                 title: {
//                     text: '今日活跃',

//                 },
//                 tooltip: {},
//                 legend: {
//                     data: ['销量']
//                 },
//                 xAxis: {
//                     data: ["9:00", "12:00", "15:00", "18:00", "21:00", "24:00"]
//                 },
//                 yAxis: {},
//                 series: [{
//                     name: '活跃人数',
//                     type: 'line',
//                     data: [5, 20, 36, 10, 10, 20]
//                 }]
//             },
//             text: 'text'
//         };
//     }


//     render() {
//         return (
//             <View style={styles.container}>

//                 <Echarts option={this.state.option}

//                          height={200}/>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//         marginTop: 20,
//         marginBottom: 20,
//     },
//     echartstyle: {
//         height: 50,
//         width: 100,
//     },
//     button: {
//         backgroundColor: '#d9534f',
//         padding: 8,
//         borderRadius: 4,
//         marginBottom: 20
//     }
// });