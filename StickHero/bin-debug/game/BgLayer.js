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
    function BgLayer() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BgLayer.prototype.init = function () {
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
    };
    return BgLayer;
}(egret.Sprite));
__reflect(BgLayer.prototype, "BgLayer");
