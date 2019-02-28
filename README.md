>react native 项目默认是没有图标，并且启动页面只有文字。这个样子并不能算是一个完整的APP，现在就给APP加一个图标和一个适应所有屏幕尺寸的启动图，并且设置启动图遮住项目启动时候的白色闪屏。


我们先创建一个新项目
```
react-native init splashExample
```

#### 图片处理
先从图标开始，一套图标需要各种大大小小的尺寸。
如果没有设计师朋友的话，我们可以用工具批量生成，现在需要一张1024*1024的母版即可。
[图片链接](https://raw.githubusercontent.com/kk412027247/splashExample/master/image/icon.png)
[工具链接](https://apetools.webprofusion.com/app/#/tools/imagegorilla)

![icon_generlator.png](https://upload-images.jianshu.io/upload_images/7505289-02b4f870a0b8975c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


上传之后处理之后，会下载得到一个压缩包，解压之后会看到得到了一堆各种尺寸的图标文件。

![file.png](https://upload-images.jianshu.io/upload_images/7505289-a8ad85313cf46ecc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加IOS图标
- 用`xcode`打开`IOS`项目，把下载好的`IOS`图标拖到`Imagees.xcassets / AppIcon`文件夹中，`xcode`会自动根据图片的大小匹配图标，如果有些图标出现黄色的警告，删掉即可.
>这里要小心，别删错了整个目录。

![drag_IOS.png](https://upload-images.jianshu.io/upload_images/7505289-2d06844debd80c31.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- IOS的图标添加完毕，现在启动项目看看效果了，很简单，已经成功了。

![ios_icon.png](https://upload-images.jianshu.io/upload_images/7505289-23bed9e18a67cd49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### 添加android图标
在`/splashExample/android/app/src/main/res` 目录下 一堆`mipmap`目录，替换掉以下相应目录中的`ic_launcher.png`就可以了。
>（drawable-hdpi相对mipmap-hdpi，以此类推）


![drag_android.png](https://upload-images.jianshu.io/upload_images/7505289-dd8ed99e2c9a8a5c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



- 启动安卓项目的时候，发现图标已经添加成功，简直不要太简单。
![android_icon.png](https://upload-images.jianshu.io/upload_images/7505289-d4ccbe370a0255bc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



---
#### 整理启动屏图片

- 现在开始添加启动页面，启动页面的操作需要写IOS与安卓的源码，但是也没太复杂，跟着一步步来即可。
- 这里提供了三张不同分辨率，但是和图标一样的启动图，这样用户在点击图标的时候，视觉上感觉是进入了app。

[图片1](https://raw.githubusercontent.com/kk412027247/splashExample/master/image/splash.png)   \ [图片2](https://raw.githubusercontent.com/kk412027247/splashExample/master/image/splash%402x.png)  \ [图片3](https://raw.githubusercontent.com/kk412027247/splashExample/master/image/splash%403x.png)

我们先改一下app页面的背景颜色，以及状态栏的颜色，编辑 app.js，整体代码如下


```
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
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
});

```


修改好的页面如下
![app.png](https://upload-images.jianshu.io/upload_images/7505289-8e95599ef1c54813.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 添加IOS启动屏
- 在`xcode`打开`ISO`项目，点击`LaunchScreen.xib`目录，点击`VIew`组件，删除`splashExample `与 `Powered by React Native`这两个原来就有的文本框。
- 点击右下角有个铜钱样子的图标输入`image`，会找到一个一个`Image VIew`，把他拖到`View`的中间。
- 图片样式点击右上角一个倒三角的图标 `Image`选项选择`Image`，`Content Mode` 选择 `Aspet Fit`。这里的意思是选择图片的来源以及不拉伸。
- `View `的背景颜色选择`4f6d7a`。


![set_ios_splash_1.png](https://upload-images.jianshu.io/upload_images/7505289-128c3bf8c993056b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


- 选中中间的图片，再点击右上角的小尺子图标，在`Autoresizing`把四周红线点掉，点亮中间四个箭头。这里的意思是图片根据屏幕自适应大小与位置。


![set_splash_ios_2.png](https://upload-images.jianshu.io/upload_images/7505289-647fe75e16e20c33.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


#### 处理白屏闪烁

- 到这里`ios`的启动页面已经添加完毕，从`xcode`启动项目检查一下。
- 发现启动页面和进入`app`中间有一个短暂的白色闪烁，这是因为这个期间`bundle.js`正在加载。
- 解决方法是让启动页面等`bundle.js`加载完毕再消失，遮住这个闪烁就好。


![ios_flash.gif](https://upload-images.jianshu.io/upload_images/7505289-04f5c0ecff74dd8d.gif?imageMogr2/auto-orient/strip)

这里我们需要添加第三方组件  **[react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)**
> 这里使用的是`3.2.0`版，若版本不同，`API`可能不一致

```
yarn add react-native-splash-screen
react-native link react-native-splash-screen
```

打开`xcode`编辑 `AppDelegate.m`， 全部代码如下
```
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

//引入SplashScreen库
#import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"splashExample"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  //运行SplashScreen库
  [RNSplashScreen show];
  
  return YES;
}

@end

```

修改 `app.js` 添加以下代码
```
import SplashScreen from 'react-native-splash-screen'

export default class App extends Component<Props> {

    componentDidMount() {
        // 组件加载完毕之后，隐藏启动页
        SplashScreen.hide();
    }
}
```

最后一下状态栏的文字颜色，变成统一的白色。

![status_bar_style.png](https://upload-images.jianshu.io/upload_images/7505289-7900ebe6f7bb7400.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

大功告成
![ios_finish.gif](https://upload-images.jianshu.io/upload_images/7505289-d78b560cdc7a52d3.gif?imageMogr2/auto-orient/strip)

#### 添加安卓启动屏
- 首先需要先把不同尺寸的图片放到资源文件夹。
- `splashExample/android/app/src/main/res` 目录下有几个`mipmap`文件夹，根据以下的规则把图片拖进去，然后把文件名统一改成`splash.png`。
```
mipmap-mdpi = splash.png
mipmap-hdpi = splash@2x.png
mipmap-xhdpi = splash@3x.png
mipmap-xxhdpi = splash@3x.png
```
![drag_android_splash.png](https://upload-images.jianshu.io/upload_images/7505289-92f55add69680d2f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- 在`splashExample/android/app/src/main/res`文件夹下新建`layout`文件夹，在`layout`文件夹中新建`launch_screen.xml`

![create_layout.png](https://upload-images.jianshu.io/upload_images/7505289-2bf01f0553e07f46.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 编辑`launch_screen.xml`
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/blue"
    android:gravity="center">

    <ImageView
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:src="@mipmap/splash"
        />
</LinearLayout>
```
> 这个页面也就是启动屏。
如果要调整页面填充拉伸之类的，可以在`Android Atudio` 的`Design可视化模式`调整。


- 在`splashExample/android/app/src/main/res/values`文件夹下新建`colors.xml`，并编辑。
- 到这里定义一个和背景颜色一样的颜色名。
```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="blue">#4F6D7A</color>
</resources>
```

- 编辑`splashExample/android/app/src/main/res/values/styles.xm`文件，增加以下代码。
```
<resources>
    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <!--设置透明背景-->
        <item name="android:windowIsTranslucent">true</item>
    </style>
</resources>
```
>  这个页面会和启动页一起弹起，并且挡在启动页前面，所以要把这页设成透明。
 

- 编辑`/splashExample/android/app/src/main/java/com/splashexample/MainActivity.java`

```
package com.splashexample;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // 这里定义了在加载js的时候，同时弹起启动屏
        // 第二个参数true，是启动页全屏显示，隐藏了状态栏。
        SplashScreen.show(this, true);
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "splashExample";
    }
}
```



- 从`android studio`启动项目，也没出现白色闪屏，大功告成。

![1_tfH-JhMPyMZrJmDAPviQ0w.gif](https://upload-images.jianshu.io/upload_images/7505289-f3e813f510cecd52.gif?imageMogr2/auto-orient/strip)


---
 # 轻松配置react-native热更新


> react-native项目有个优势就是可以动态更新bundle.js，从而更新App。

![1.gif](https://upload-images.jianshu.io/upload_images/7505289-4109595c19e6ddd7.gif?imageMogr2/auto-orient/strip)

### 框架选择
- 使用微软出的热更新套件 [react-native-code-push](https://github.com/Microsoft/react-native-code-push)
- 框架包括客户端SDK，以及配套的服务端。

### 服务端配置

- 要使用`code push`服务，必须在服务端配置好`app`的信息。
- 安装`App Center CLI`，用于服务端信息管理。
```
$ sudo npm install -g appcenter-cli
```
- 登陆`app cetner`。
```
$ appcenter login
```
- 运行以上命令并在命令行确认后，网页会弹出一个要求登陆的页面，登陆后，会得到一串`Access code`，复制粘贴回命令行，成功的话会返回登陆账号。

```
$ appcenter login
Opening your browser... 
? [Visit]:https://appcenter.ms/cli-login?hostname=assetfundeMacBook-Pro.local and enter the code:
? Access code from browser:  0cd185da****36a****7295b3****c8da9ba766a
Logged in as kk412027247
```
- 添加`App`信息，这里要分别添加`安卓`与`iOS`，我的`app`名字是`splashExample `,以此为例
```
// -d 后面接的是app显示的名字，为了区分不同平台后面也写上平台命
// -o 表示运行系统（operation） 安卓/iOS
// -p 表示平台（Platform）这里是 react-native
$ appcenter apps create -d splashExample-android -o Android -p React-Native
$ appcenter apps create -d splashExample-ios -o iOS -p React-Native
```
- 接下来运行一下`appcenter apps list`检测是否添加成功
```
  $  appcenter apps list
  kk412027247/splashExample-android
  kk412027247/splashExample-ios
```
- 将已添加的`app`部署热更新服务，一般会部署两个用于灰度更新，和正式更新，这里分别叫做`Staging`与`Production`。分别给安卓和iOS部署，所以一共要运行四行命令。
> 建议部署其中一个叫做`Staging`，命令行一些默认行为会执行这个部署，如果没有这个名称，推送更新到部署的时候，要指定部署的名称，若不指定则会报错。
```
// -a 是指应用（application），这里要写上“用户名和程序名”

// 部署IOS
$ appcenter codepush deployment add -a kk412027247/splashExample-ios Staging
$ appcenter codepush deployment add -a kk412027247/splashExample-ios Production
// 部署安卓
$ appcenter codepush deployment add -a kk412027247/splashExample-android Staging
$ appcenter codepush deployment add -a kk412027247/splashExample-android Production

```
- 获取`部署码`，运行以上命令之后，命令行会返`部署码`，但是有可能没记下就关掉了命令行
- `appcenter codepush deployment list -a <ownerName>/<appName> <deploymentName> -k`命令可以查看部署码

```
$ appcenter codepush deployment list -a kk412027247/splashExample-ios -k
```
Name|Key
-|-
Staging|mgqluuNp1DTWNA5xn_c2YWWyLKGxBJA67O7UN
Production|miDM42DG-ooHvW0VVa0tdPNAgRH2BJJ6j_X8V
```
$ appcenter codepush deployment list -a kk412027247/splashExample-android -k
```
Name|Key
-|-
Staging|2CFJps8zo4gguRDddWp7POP0psZCrJnAXOQIE
Production|cskcQEjzC5kbOelsPgwA4zaDac6SS1ow0tQIV 
> 运行了一堆命令，最终得到这两组四个`部署码`，接下来须要将这些`部署码`按需配置到客户端里面。
---
### 客户端安装与配置

- 安装依赖包
```
$ npm install --save react-native-code-push
$ react-native link
```
> 运行`react-native link`的时候，命令行会提示输入部署码`What is your CodePush deployment key for Android (hit <ENTER> to ignore) `，这个提示只是第一次输入有效。

- 填写`部署码`，我这里都是输入`Staging`的`部署码`。如果是正式环境，建议写`Production`的`部署码`。
  - iOS平台，修改 `/splashExample/ios/splashExample/Info.plist` 文件,`CodePushDeploymentKey` 标签的值。
![iosDeploymentKey.png](https://upload-images.jianshu.io/upload_images/7505289-d18f111e1998ca05.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
  - 安卓平台，修改 `/splashExample/android/app/src/main/java/com/splashexample/MainApplication.java`。
![androidDeploymentKey.png](https://upload-images.jianshu.io/upload_images/7505289-b1fbc97dc5815a06.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- `api`调用（安静模式）
```
import CodePush from "react-native-code-push";
// 静默方式，app每次启动的时候，都检测一下更新 'ON_APP_RESUME'
const codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };
import _App from './App';
// 在组件根节点的地方设置热更新。
const App = CodePush(codePushOptions)(_App);
```
- 这个安静模式是我最喜欢一种，配置简单，在用户没察觉的情况下就更新了app。在用户打开app的时候，自动下载更新包，下次再启动的时候自动安装更新包。
![0.gif](https://upload-images.jianshu.io/upload_images/7505289-2e2d65dd84c3d02b.gif?imageMogr2/auto-orient/strip)

- `api`调用（自定义模式），在更新之前可以获取更新包的大小，更新的具体信息，监听下载进度等等。
```
import CodePush from "react-native-code-push";
...

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
```
- 这个配置稍微复杂一点，但是自定义程度很高，比如要做下载滚动条，查看更新日志，都可以实现。默认情况下，再次启动app的时候，更新生效。
![1.gif](https://upload-images.jianshu.io/upload_images/7505289-4109595c19e6ddd7.gif?imageMogr2/auto-orient/strip)
### 推送更新
> 设置完客户端之后，须要在服务端推送更细，客户端才能检测到更新。以上效果都是已经从服务端做了更新推送的。
- 推送命令，在项目根目录运行 `appcenter codepush release-react -a <ownerName>/MyApp`。
```
//  在默认情况下，更新会推送到Staging的部署
$ appcenter codepush release-react -a kk412027247/splashExample-ios
$ appcenter codepush release-react -a kk412027247/splashExample-android

//  指定版本更新 -d 加部署名
$ appcenter codepush release-react -a kk412027247/splashExample-ios -d Production
$ appcenter codepush release-react -a kk412027247/splashExample-android -d Production

// 设置更新日志，供前端读取
$ appcenter codepush release-react -a kk412027247/splashExample-ios  --description '1800的更新'
$ appcenter codepush release-react -a kk412027247/splashExample-android  --description '1800的更新'
```
- 强制更新，在项目根目录运行 `appcenter codepush release-react -a <ownerName>/MyApp -m true`
- 其实就是多了个`-m true` 参数而已，强制更新的默认效果是，用弹窗确认更新时候，只有确认键，并且安装成功后是立即生效，所以app可能会闪一下。
```
$ appcenter codepush release-react -a kk412027247/splashExample-ios -m true  --description '1052的更新'
$ appcenter codepush release-react -a kk412027247/splashExample-android -m true  --description '1052的更新'
```
![2.gif](https://upload-images.jianshu.io/upload_images/7505289-3c70f14c65409c76.gif?imageMogr2/auto-orient/strip)

- 查看更新看历史`appcenter codepush deployment history -a <ownerName>/<appName> <deploymentName>
`
```
// 显示历史
$ appcenter codepush deployment history -a kk412027247/splashExample-ios Staging

// 清空历史
$ appcenter codepush deployment clear Staging -a kk412027247/splashExample-ios
```
### 官方资料

[React Native Client SDK安装与配置](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/react-native#getting-started)
[App Center CLI安装与配置](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/cli)
[js api](https://github.com/Microsoft/react-native-code-push/blob/master/docs/api-js.md#syncstatus)

