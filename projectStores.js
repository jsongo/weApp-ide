"use strict";

function init() {
    function e(e) {
        var r = 0, t = void 0, o = void 0, i = void 0;
        if (0 === e.length) return r;
        for (t = 0, i = e.length; t < i; t++) o = e.charCodeAt(t), r = (r << 5) - r + o, 
        r |= 0;
        return r > 0 ? r :0 - r;
    }
    function r() {
        localStorage.setItem("projectLists", JSON.stringify(j));
    }
    function t(e, r) {
        if (r) {
            var t = e.projectpath, c = o.join(__dirname, "../weapp/newquick/");
            try {
                var p = s.sync("./**/**", {
                    cwd:c
                });
                p.forEach(function(e) {
                    var r = o.join(c, e), n = o.join(t, e), s = i.lstatSync(r);
                    if (s.isDirectory()) a.sync(n); else {
                        var p = i.readFileSync(r);
                        i.writeFileSync(n, p);
                    }
                });
            } catch (u) {
                n.error("projectStores.js initProject error " + u.toString());
            }
        }
    }
    var o = require("path"), i = require("fs"), n = require("../common/log/log.js"), s = require("glob"), a = require("mkdir-p"), c = require("../common/request/request.js"), p = require("../config/urlConfig.js"), u = require("../config/errcodeConfig.js"), f = require("../weapp/commit/unpack.js"), d = require("events").EventEmitter, j = JSON.parse(localStorage.getItem("projectLists")) || [], g = {}, h = !1, l = {
        Network:{
            RequestDomain:[],
            WsRequestDomain:[],
            UploadDomain:[],
            DownloadDomain:[]
        },
        Setting:{
            MaxLocalstorageSize:10,
            MaxCodeSize:5,
            MaxWebviewDepth:5,
            MaxBackgroundLifespan:300,
            MaxRequestConcurrent:5,
            MaxUploadConcurrent:1,
            MaxDownloadConcurrent:5
        }
    };
    j.forEach(function(r) {
        r.hash = e(r.projectid);
    });
    var S = Object.assign({}, d.prototype, {
        getProjectByHash:function(e) {
            return e = parseInt(e), j.find(function(r) {
                return r.hash === e;
            });
        },
        getProjectByID:function(e) {
            return j.find(function(r) {
                return r.projectid === e;
            });
        },
        getProjectList:function() {
            return n.info("projectStores.js getProjectList " + JSON.stringify(j)), j;
        },
        addVerifyProject:function(t, i) {
            var s = this;
            t.hash = e(t.projectid);
            var a = t.projectpath;
            f(o.join(a, "source.wx"), function(e, o) {
                e ? i(e) :(t.projectpath = o, t.isVerify = !1, j.unshift(t), r(), n.info("projectStores.js add " + JSON.stringify(t)), 
                s.emit("ADD_PROJECT", j), i(null, o));
            });
        },
        add:function(o, i) {
            o.hash = e(o.projectid), j.unshift(o), t(o, i), r(), n.info("projectStores.js add " + JSON.stringify(o)), 
            this.emit("ADD_PROJECT", j);
        },
        del:function(e) {
            var t = j.findIndex(function(r) {
                return r.projectid === e;
            });
            if (t > -1) {
                var o = j[t];
                delete localStorage["projectattr" + o.hash], j.splice(t, 1), r(), n.info("projectStores.js del " + e), 
                this.emit("DEL_PROJECT", j);
            }
        },
        close:function() {
            this.emit("CLOSE_PROJECT");
        },
        restart:function(e) {
            this.emit("RESTART_PROJECT", e);
        },
        getProjectConfig:function(e) {
            return g[e.hash];
        },
        setProjectConfig:function(e, r) {
            if (!h) {
                var t = "projectattr" + e.hash, o = JSON.parse(localStorage.getItem(t));//, i = e.isTourist;
                /*if (i) {
                    var s = Object.assign({}, l);
                    return s.appid = e.appid, g[e.hash] = s, void r();
                }*/
                h = !0, o && (g[e.hash] = o, r());
                var a = p.getWeappAttrURL, f = a + "?appid=" + e.appid + "&_r=" + Math.random();
                n.info("projectStores.js begin get projectAttr " + f), c({
                    url:f,
                    body:JSON.stringify({
                        appid_list:[ e.appid ]
                    }),
                    method:"post",
                    needToken:1
                }, function(i, s, a) {
                    //a = '{"baseresponse": {"errcode": 0}, "is_admin": 1, "attr_list": []}';
                    if (h = !1, i) return void n.error("projectStores.js end get projectAttr network error: " + JSON.stringify(i));
                    n.info("projectStores.js end get projectAttr " + a);
                    /*var c = void 0;
                    try {
                        c = JSON.parse(a);
                    } catch (p) {
                        return n.error("projectStores.js end get projectAttr parse body error: " + a + " " + JSON.stringify(i)), 
                        void (!o && alert("系统错误 " + a));
                    }*/
                    //var f = c.baseresponse, d = f ? parseInt(f.errcode) :0;
                    var d = 0;
                    if (0 === d) {
                        //var j = c.attr_list[0];
                        var j = {};
                        g[e.hash] = j, localStorage.setItem(t, JSON.stringify(j)), o || r();
                    } else {
                        if (d === u.DEV_App_Not_Band) {
                            alert("当前开发者未绑定此 appid ，请到 mp 后台操作后重试"), nw.Shell.openExternal("https://mp.weixin.qq.com/"), 
                            n.error("projectStores.js setProjectConfig error " + d);
                            var l = require("./webviewStores.js");
                            return void l.emit("NOT_LOGIN");
                        }
                        !o && alert("系统错误 " + a);
                    }
                });
            }
        }
    });
    _exports = S;
}

var _exports;

init(), module.exports = _exports;
