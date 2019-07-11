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
var ShareTips = (function (_super) {
    __extends(ShareTips, _super);
    function ShareTips() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    ShareTips.prototype.initView = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.touchEnabled = true;
        //绘制背景
        var shp = new egret.Shape();
        shp.graphics.beginFill(0x000000, 0.85);
        shp.graphics.drawRect(0, 0, stageW, stageH);
        shp.graphics.endFill();
        this.addChild(shp);
        //添加指向右上角的提示箭头
        var tips = new egret.Bitmap();
        tips.texture = RES.getRes('arrow_png');
        this.addChild(tips);
        tips.anchorOffsetX = tips.width;
        tips.scaleX = tips.scaleY = 2;
        tips.x = stageW;
        //添加文本提示
        var tipsLabel = new egret.TextField();
        this.addChild(tipsLabel);
        tipsLabel.textAlign = 'center';
        tipsLabel.text = '请点击右上角按钮\n选择【分享到朋友圈】';
        tipsLabel.size = 80;
        tipsLabel.anchorOffsetX = tipsLabel.width / 2;
        tipsLabel.x = stageW / 2;
        tipsLabel.y = tips.height * tips.scaleX;
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnded, this);
    };
    ShareTips.prototype.onTouchEnded = function (e) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ShareTips;
}(egret.Sprite));
__reflect(ShareTips.prototype, "ShareTips");
