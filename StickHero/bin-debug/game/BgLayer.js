var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BgLayer = (function (_super) {
    __extends(BgLayer, _super);
    function BgLayer(bgMove) {
        if (bgMove === void 0) { bgMove = false; }
        var _this = _super.call(this) || this;
        _this.init(bgMove);
        return _this;
    }
    BgLayer.prototype.init = function (bgMove) {
        var bgIndex = Math.floor(Math.random() * 5 + 1);
        var bg1 = new egret.Bitmap();
        bg1.texture = RES.getRes('bg' + bgIndex + '_jpg');
        this.addChild(bg1);
        this.bg1 = bg1;
        //背景图2要添加月亮
        if (bgIndex == 2) {
            var moon = new egret.Bitmap();
            moon.texture = RES.getRes('moon_png');
            this.addChild(moon);
            moon.y = moon.height / 10;
        }
        if (bgMove) {
            var bg2 = new egret.Bitmap();
            bg2.texture = RES.getRes('bg' + bgIndex + '_jpg');
            this.addChild(bg2);
            bg2.x = bg1.width;
            this.bg2 = bg2;
            //创建计时器，不停更新背景
            var timer = new egret.Timer(1000 / 60, 0);
            timer.addEventListener(egret.TimerEvent.TIMER, this.bgMove, this);
            this.timer = timer;
        }
    };
    //背景循环滚动
    BgLayer.prototype.bgMove = function () {
        var bg1 = this.bg1;
        var bg2 = this.bg2;
        //获取两张背景图的x坐标
        var x1 = bg1.x;
        var x2 = bg2.x;
        var speed = 1;
        x1 -= speed;
        x2 -= speed;
        //图片宽度
        var bgWidth = bg1.width;
        if (x1 <= -bgWidth) {
            x2 = 0;
            x1 = bgWidth;
        }
        if (x2 <= -bgWidth) {
            x1 = 0;
            x2 = bgWidth;
        }
        bg1.x = x1;
        bg2.x = x2;
    };
    return BgLayer;
}(egret.Sprite));
__reflect(BgLayer.prototype, "BgLayer");
