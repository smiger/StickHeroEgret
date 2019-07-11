var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Director = (function () {
    function Director() {
        this.root = null;
    }
    Director.getInstance = function () {
        if (Director.instance == null) {
            Director.instance = new Director();
        }
        return Director.instance;
    };
    Director.prototype.setRoot = function (root) {
        if (this.root == null) {
            this.root = root;
        }
    };
    Director.prototype.runScene = function (layer) {
        if (this.root != null && layer != null) {
            this.root.removeChildren();
            this.root.addChild(layer);
        }
    };
    Director.instance = null;
    return Director;
}());
__reflect(Director.prototype, "Director");
