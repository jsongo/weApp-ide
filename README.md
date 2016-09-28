**微信小程序的IDE用了reactjs + flux的架构，可以分析它的源码学习这套框架**
首先非常感谢：https://github.com/gavinkwoe/weapp-ide-crack 的作者gavinkwoe的这个项目，刚开始的时候，也是用的他的方法来破解，不过发现了个问题：  
# 创建的项目没有生成demo文件  
于是把整个代码大概浏览了一遍。（因为之前写过react + flux的代码，所以对这个项目的结构非常熟悉。）  
上面这个问题主要是一个参数，在createstep.js里的addProject函数中，最后一句在执行add方法的时候，第二个参数是needInitQuickStart（在actions/projectActions.js里有说明）表示是否需要创建项目文件，这个要显示的设置为true才会创建。  

另外，创建出来的demo项目中，调用wx.login是不能成功的，所以改了demo的代码，在app.js里直接给globalData.userInfo赋值即可。  
`
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
`
然后在`onLaunch`里调用一下init()就ok

本项目文件的使用方法可以参数 https://github.com/gavinkwoe/weapp-ide-crack   
破解方式我自己重新折腾了一遍，有些地方跟gavinkwoe不太一样，不过都是可以正常运行的。  
后续还会更新更多的api的破解方式，欢迎大家持续关注  


更多的微信小程序api，可以参考原官方文档：https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html  