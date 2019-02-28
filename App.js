import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Button, ActivityIndicator,} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import CodePush from "react-native-code-push";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
// noinspection JSAnnotator
export default class App extends Component<Props> {

  state = {receivedBytes : 0, totalBytes : 0, showProcess: false, showIndicator:false};

  _handleUpdate = async () => {
    this.setState({showIndicator: true});

    // checkForUpdate 返回promise，包含了服务端安装包的各种信息，包的大小版本之类的,
    // 如果要构建构建个性化更新界面，需要用到此方法
    const updateMessage = await CodePush.checkForUpdate() || {};

    // console.log(updateMessage);
    // return;

    // 执行更新
    await CodePush.sync(
      // 第一个参数吗，是个对象，可定义更新的动作
      {
        // 安装模式 'IMMEDIATE' 立刻安装， ON_NEXT_RESUME 下次启动安装
        installMode: CodePush.InstallMode.ON_NEXT_RESUME,

        // 强制更新模式下的安装，默认是IMMEDIATE 直接安装
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,

        //更新确认弹窗设置，设置系统自带弹窗中的内容
        updateDialog:{
          mandatoryUpdateMessage:'强制更新内容: '+updateMessage.description,
          mandatoryContinueButtonLabel:'强制更新/确认',
          optionalIgnoreButtonLabel:'取消',
          optionalInstallButtonLabel:'安装',
          optionalUpdateMessage:'本次更新内容: '+updateMessage.description,
          title:'发现新版本'
        }},
      // 第二个参数，更新状态检测，返回数字
      //0 已经是最新，1 安装完成、等待生效，2 忽略更新，3 未知错误，4 已经在下载了，5 查询更新，6 弹出了更新确认界面，7 下载中，8下载完成
      (status)=>{

        switch (status){
          case 0: alert('已经是最新版本');
            break;
          case 1 : !updateMessage.isMandatory && alert('更新完成, 再启动APP更新即生效');
            break;
          case 3: alert('出错了，未知错误');
            break;
          case 7 : this.setState({showProcess: true});
            break;
          case 8 : this.setState({showProcess: false});
            break;
        }
      },
      // 第三个参数，检测下载过程
      ({receivedBytes,totalBytes})=>{
        // console.log('DownloadProgress: ', receivedBytes, totalBytes);
        this.setState({receivedBytes: (receivedBytes/1024).toFixed(2), totalBytes: (totalBytes/1024).toFixed(2)})
      },
    );
    this.setState({showIndicator: false});
  };

  handleUpdate = () => this._handleUpdate().catch(()=>{
    this.setState({showIndicator: false});
    alert('网络错误')
  });

  componentDidMount() {
     // 组件加载完毕之后，隐藏启动页
     SplashScreen.hide();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#4f6d7a'}
          barStyle={'light-content'}
        />
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>

        {
          !this.state.showIndicator
          ? <Button title={'update'} onPress={this.handleUpdate} color={Platform.OS === 'ios' ? '#fff' : '#000'}/>
          : <ActivityIndicator size={'large'} color={'#fff'}/>
        }

        {
          this.state.showProcess && <Text style={styles.ratio}>
            下载进度：{this.state.receivedBytes} kb / {this.state.totalBytes} kb
            {'\n'}
            完成率: {this.state.receivedBytes / this.state.totalBytes * 100 || 0}%
          </Text>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4f6d7a',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#f5fcff',
  },
  instructions: {
    textAlign: 'center',
    color: '#f5fcff',
    marginBottom: 5,
  },
  ratio:{
    fontSize:20,
    color:'#fff'
  }
});
