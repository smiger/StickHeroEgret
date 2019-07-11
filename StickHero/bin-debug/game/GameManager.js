var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理类
 */
var GameManager = (function () {
    function GameManager() {
    }
    GameManager.setHeroIndex = function (val) {
        this._heroIndex = val;
    };
    GameManager.getHeroIndex = function () {
        return this._heroIndex;
    };
    GameManager.setCurScore = function (val) {
        this._curScore = val;
    };
    GameManager.getCurScore = function () {
        return this._curScore;
    };
    GameManager._heroIndex = 1;
    GameManager._curScore = 0;
    return GameManager;
}());
__reflect(GameManager.prototype, "GameManager");
