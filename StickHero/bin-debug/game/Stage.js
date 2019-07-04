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
var Stage = (function (_super) {
    __extends(Stage, _super);
    function Stage() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Stage.prototype.init = function () {
        var stageSprite = new egret.Bitmap();
        stageSprite.texture = RES.getRes('stage1_png');
        stageSprite.anchorOffsetX = stageSprite.width / 2;
        stageSprite.anchorOffsetY = 0;
        this.addChild(stageSprite);
        this.stageSprite = stageSprite;
    };
    return Stage;
}(egret.Sprite));
__reflect(Stage.prototype, "Stage");
