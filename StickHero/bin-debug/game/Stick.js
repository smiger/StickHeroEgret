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
/**
 * 棍子类
 */
var Stick = (function (_super) {
    __extends(Stick, _super);
    function Stick() {
        var _this = _super.call(this) || this;
        _this.growRate = 6;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    Stick.prototype.initView = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        var stickSprite = new egret.Bitmap();
        stickSprite.texture = RES.getRes('stick1_png');
        this.addChild(stickSprite);
        stickSprite.scaleX = 2;
        this.stickSprite = stickSprite;
        this.anchorOffsetX = stickSprite.width;
        this.anchorOffsetY = stickSprite.height;
        var timer = new egret.Timer(1000 / 60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
        this.timer = timer;
    };
    //
    Stick.prototype.growHeight = function () {
        //如果长度超过屏幕高德一半，则不再变长
        if (this.stickSprite.height * this.scaleY > this.stageH / 2) {
            return;
        }
        this.scaleY += this.growRate;
    };
    return Stick;
}(egret.Sprite));
__reflect(Stick.prototype, "Stick");
