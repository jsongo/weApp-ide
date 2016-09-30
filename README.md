## 微信小程序的IDE用了reactjs + flux的架构  
可以分析它的源码学习这套框架  
首先非常感谢 https://github.com/gavinkwoe/weapp-ide-crack 的作者gavinkwoe的这个项目  
上方的破解文件的使用方法可以参考gavinkwoe项目的说明文件，如果觉得麻烦，而且你也正巧用的mac，可以直接下载我传到百度云上的软件直接使用：https://pan.baidu.com/s/1pL6Kysb ，版本 0.9.092300  

刚开始的时候，也是用的他的文件来破解，不过发现了几个问题：  
**创建的项目没有生成demo文件**  
**网络请求大部分域名都发不了**  
于是把整个代码大概浏览了一遍，自己重新折腾了下。（因为之前写过react + flux的代码，所以对这个项目的结构非常熟悉。）  
上面这个问题主要是一个参数，在createstep.js里的addProject函数中，最后一句在执行add方法的时候，第二个参数是needInitQuickStart（在actions/projectActions.js里有说明）表示是否需要创建项目文件，这个要显式的设置为true才会创建。  
网络请求的接口，微信做了一些安全限制，要破解才能给任意地址发请求。本项目的破解文件已经解决了这些问题。  

另外，创建出来的demo项目中，调用wx.login是不能成功的，所以改了demo的代码，在app.js里直接给globalData.userInfo赋值即可。  
```
init: function() {
  this.globalData.userInfo = {
    "nickName": "jason",
    "avatarUrl": "http://wx.qlogo.cn/mmopen/icSHGibMIMB82jDEHibGFA1s6dhwMibWrQAPeRvT2w2y2rpZVM5l3BftVEr3rTgX4fXDlznnMmZY0zYtgkfFw7L3o9r0tTblGTxB/0",
    "gender": 1,
    "province": "广东",
    "city": "深圳",
    "country": "中国",
  };
},
```
然后在`onLaunch`里调用一下init()就ok  


本项目文件的使用方法可以参考 https://github.com/gavinkwoe/weapp-ide-crack   
破解方式我自己重新折腾了一遍，有些地方跟gavinkwoe不太一样，不过都是可以正常运行的。  
版本 0.9.092300 (0.9.092300) 测试过，可以正常使用。  

另外，最近也在编写一些小程序的教程：  
> 《[【微信小程序开发•系列文章一】入门](http://www.jsongo.com/post/js/2016/weapp-1/)》  
> 《【微信小程序开发•系列文章二】视图层(http://www.jsongo.com/post/js/2016/weapp-2/)》  
> 《【微信小程序开发•系列文章三】数据层(http://www.jsongo.com/post/js/2016/weapp-3/)》  


**几个问题说明**  

1. MaxRequestConcurrent报错的问题  
这个在本项目的破解文件里已经直接覆盖了，不会报这个错了。  
（修改：asdebug.js里，搜MaxRequestConcurrent，很简单，直接把它设置成固定数字即可）  

2. 页面切换时会出现route错误的问题  
这个可能是开发工作自身的bug，用一段时间后就会这样，目前还没发现原因，不过解决这个问题很简单，关掉，重新再开就好了。    

3. Failed to load resource: net::ERR_NAME_NOT_RESOLVED  
这个问题gavinkwoe的项目中也说明了，主要是由于代理导致的，打开ide，菜单上选“动作”->“设置”，选直连就行

<p align="center">
<img src="preview.jpg" alt="预览" width="400"/>
</p>

后续还会更新更多的api的破解方式，欢迎大家持续关注  

更多的微信小程序api，可以参考原官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html  
