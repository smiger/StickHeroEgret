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
 * 游戏场景
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.stageW = 0;
        _this.stageH = 0;
        _this.curStage = 1;
        _this.isRunning = false;
        _this.isPerfect = false;
        _this.needFalldown = false;
        _this.stageOriginX = 0;
        _this.curScore = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.initView, _this);
        return _this;
    }
    GameScene.prototype.initView = function () {
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        this.stageOriginX = this.stageW / 6;
        //添加背景
        var bgLayer = new BgLayer(true);
        this.addChild(bgLayer);
        this.bgLayer = bgLayer;
        //分数背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes('scoreBg_png');
        this.addChild(scoreBg);
        scoreBg.anchorOffsetX = scoreBg.width / 2;
        scoreBg.x = this.stageW / 2;
        scoreBg.y = scoreBg.height / 2;
        //初始化分数标签
        var scoreLabel = new egret.TextField();
        this.addChild(scoreLabel);
        scoreLabel.x = scoreBg.x;
        scoreLabel.y = scoreBg.y + scoreBg.height / 2;
        scoreLabel.size = 100;
        scoreLabel.textAlign = 'center';
        scoreLabel.text = '0';
        scoreLabel.anchorOffsetX = scoreLabel.width / 2;
        scoreLabel.anchorOffsetY = scoreLabel.height / 2;
        this.scoreLabel = scoreLabel;
        //添加台阶
        this.addStage();
        //创建棍子
        var stick1 = new Stick();
        var stick2 = new Stick();
        this.addChild(stick1);
        this.addChild(stick2);
        this.stick1 = stick1;
        this.stick2 = stick2;
        //添加英雄
        var hero = new Hero(GameManager.getHeroIndex());
        hero.x = this.stage1.stageSprite.width * this.stage1.scaleX * 0.7;
        hero.y = this.stage1.y;
        this.addChild(hero);
        this.hero = hero;
        //添加红点
        var redPoint = new egret.Bitmap();
        redPoint.texture = RES.getRes('lovered_png');
        redPoint.anchorOffsetX = redPoint.width / 2;
        redPoint.scaleX = redPoint.scaleY = 1.5;
        redPoint.x = this.stage2.x;
        redPoint.y = this.stage2.y;
        this.addChild(redPoint);
        this.redPoint = redPoint;
        //创建perfect提示
        var perfect = new egret.Bitmap();
        perfect.texture = RES.getRes('scoreAdd1_png');
        perfect.anchorOffsetX = perfect.width / 2;
        perfect.anchorOffsetY = perfect.height;
        this.addChild(perfect);
        this.perfect = perfect;
        //触摸屏幕
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegan, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    //添加台阶
    GameScene.prototype.addStage = function () {
        var stageW = this.stageW;
        var stageH = this.stageH;
        var stage1 = new Stage();
        var stage2 = new Stage();
        this.addChild(stage1);
        this.addChild(stage2);
        stage1.scaleX = 30;
        stage1.x = stage1.stageSprite.width * stage1.scaleX / 2;
        stage1.y = stageH - stage1.height;
        stage2.scaleX = 30;
        stage2.x = stage2.stageSprite.width * stage2.scaleX / 2 + stageW / 2;
        stage2.y = stageH - stage1.height;
        this.stage1 = stage1;
        this.stage2 = stage2;
    };
    //触摸开始
    GameScene.prototype.touchBegan = function (e) {
        var curStage = this.curStage;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        this.isRunning = true;
        if (curStage == 1) {
            if (stick1.visible == false) {
                stick1.visible = true;
            }
            stick1.scaleY = 1;
            stick1.rotation = 0;
            stick1.x = stage1.x + stage1.stageSprite.width * stage1.scaleX / 2;
            stick1.y = stage1.y + stick1.stickSprite.width * stick1.scaleX / 2;
            //棍子开始变长
            stick1.timer.start();
        }
        else if (curStage == 2) {
            if (stick2.visible == false) {
                stick2.visible = true;
            }
            stick2.scaleY = 1;
            stick2.rotation = 0;
            stick2.x = stage2.x + stage2.stageSprite.width * stage2.scaleX / 2;
            stick2.y = stage1.y + stick2.stickSprite.width * stick2.scaleX / 2;
            //棍子开始变长
            stick2.timer.start();
        }
    };
    //触摸结束
    GameScene.prototype.touchEnd = function (e) {
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        if (!this.isRunning) {
            return;
        }
        this.touchEnabled = false;
        if (stick1.timer.running) {
            stick1.timer.stop();
        }
        if (stick2.timer.running) {
            stick2.timer.stop();
        }
        //播放踢棍子的动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData('kick');
        hero.heroMC.play(1);
        hero.heroMC.addEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
    };
    //踢倒棍子回调
    GameScene.prototype.heroKickDone = function () {
        this.hero.heroMC.removeEventListener(egret.Event.COMPLETE, this.heroKickDone, this);
        if (this.curStage == 1) {
            var tw = egret.Tween.get(this.stick1);
            tw.to({ rotation: 90 }, 300);
            tw.call(this.heroMove, this);
        }
        else {
            var tw = egret.Tween.get(this.stick2);
            tw.to({ rotation: 90 }, 300).call(this.heroMove, this);
        }
    };
    //英雄移动
    GameScene.prototype.heroMove = function () {
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var hero = this.hero;
        var redPoint = this.redPoint;
        var stickLength = 0; //棍子长度
        var distance1 = 0; //到达第二个台阶的左边
        var distance2 = 0; //到达第二个台阶的右边
        var distance3 = 0; //到达红点的左边
        var distance4 = 0; //到达红点的右边
        var posX = 0; //英雄移动终点X坐标
        var posY = 0; //英雄移动终点Y坐标
        //如果当前台阶为1，则英雄移动到台阶2上
        if (this.curStage == 1) {
            //如果棍子没有到达下一个台阶或者超出下一个台阶，则英雄掉落，棍子旋转180度
            stickLength = stick1.stickSprite.height * stick1.scaleY;
            distance1 = stage2.x - stage1.x - stage1.stageSprite.width * stage1.scaleX / 2 - stage2.stageSprite.width * stage2.scaleX / 2;
            distance2 = distance1 + stage2.stageSprite.width * stage2.scaleX;
            distance3 = distance1 + stage2.stageSprite.width * stage2.scaleX / 2 - redPoint.width * redPoint.scaleX / 2;
            distance4 = distance3 + redPoint.width * redPoint.scaleX;
            //砸中红点
            if (stickLength >= distance3 && stickLength <= distance4) {
                this.isPerfect = true;
                //显示perfect提示
                this.showPerfect();
                //设置英雄移动终点
                posX = stage2.x + stage2.stageSprite.width * stage2.scaleX / 2 - hero.heroSprite.width;
                posY = stage2.y;
            }
            else if (stickLength >= distance1 && stickLength <= distance2) {
                posX = stage2.x + stage2.stageSprite.width * stage2.scaleX / 2 - hero.heroSprite.width;
                posY = stage2.y;
            }
            else {
                posX = stick1.x + stick1.stickSprite.height * stick1.scaleY;
                posY = stick1.y;
                this.needFalldown = true;
            }
        }
        else if (this.curStage == 2) {
            //如果棍子没有到达下一个台阶或者超出下一个台阶，则英雄掉落，棍子旋转180度
            stickLength = stick2.stickSprite.height * stick2.scaleY;
            distance1 = stage1.x - stage2.x - stage2.stageSprite.width * stage2.scaleX / 2 - stage1.stageSprite.width * stage1.scaleX / 2;
            distance2 = distance1 + stage1.stageSprite.width * stage1.scaleX;
            distance3 = distance1 + stage1.stageSprite.width * stage1.scaleX / 2 - redPoint.width * redPoint.scaleX / 2;
            distance4 = distance3 + redPoint.width * redPoint.scaleX;
            //砸中红点
            if (stickLength >= distance3 && stickLength <= distance4) {
                this.isPerfect = true;
                //显示perfect提示
                this.showPerfect();
                //设置英雄移动终点
                posX = stage1.x + stage1.stageSprite.width * stage1.scaleX / 2 - hero.heroSprite.width;
                posY = stage1.y;
            }
            else if (stickLength >= distance1 && stickLength <= distance2) {
                posX = stage1.x + stage1.stageSprite.width * stage1.scaleX / 2 - hero.heroSprite.width;
                posY = stage1.y;
            }
            else {
                posX = stick2.x + stick2.stickSprite.height * stick2.scaleY;
                posY = stick2.y;
                this.needFalldown = true;
            }
        }
        //播放英雄行走动画
        hero.heroMC.movieClipData = this.hero.mcDataFactory.generateMovieClipData('walk');
        hero.heroMC.play(-1);
        var tw = egret.Tween.get(hero);
        tw.to({ x: posX, y: posY }, 1000).call(this.heroMoveDone, this);
    };
    //显示perfect提示
    GameScene.prototype.showPerfect = function () {
        var perfect = this.perfect;
        var redPoint = this.redPoint;
        perfect.alpha = 1;
        perfect.x = redPoint.x;
        perfect.y = redPoint.y;
        var tw = egret.Tween.get(perfect);
        tw.to({ x: perfect.x, y: perfect.y - perfect.height * 10, alpha: 0 }, 500);
    };
    //英雄移动结束后
    GameScene.prototype.heroMoveDone = function () {
        var hero = this.hero;
        //停止背景移动
        this.bgLayer.timer.stop();
        //播放英雄站立动画
        hero.heroMC.movieClipData = hero.mcDataFactory.generateMovieClipData('stay');
        hero.heroMC.play(-1);
        //判断英雄是否掉落
        if (this.needFalldown) {
            if (this.curStage == 1) {
                var tw = egret.Tween.get(this.stick1);
                tw.to({ rotation: 180 }, 300);
            }
            else if (this.curStage == 2) {
                var tw = egret.Tween.get(this.stick2);
                tw.to({ rotation: 180 }, 300);
            }
            var tw = egret.Tween.get(hero);
            tw.to({ y: this.stageH + hero.heroSprite.height }, 300);
            tw.call(this.heroFalldown, this);
            return;
        }
        //移动台阶
        this.moveStage();
    };
    //英雄掉落回调
    GameScene.prototype.heroFalldown = function () {
        var _this = this;
        //隐藏英雄
        this.hero.visible = false;
        this.needFalldown = false;
        //屏幕震动
        var tw = egret.Tween.get(this);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.to({ x: this.x + 20, y: this.y + 20 }, 100, egret.Ease.bounceOut);
        tw.to({ x: this.x - 20, y: this.y - 20 }, 100, egret.Ease.bounceIn);
        tw.call(function () { _this.x = 0; _this.y = 0; });
        tw.call(this.showFailedLayer, this);
    };
    //失败界面
    GameScene.prototype.showFailedLayer = function () {
        this.touchEnabled = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegan, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        GameManager.setCurScore(this.curScore);
        this.scoreLabel.text = this.curScore + '';
        var layer = new FailedLayer();
        this.addChild(layer);
    };
    //移动台阶
    GameScene.prototype.moveStage = function () {
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        var stick1 = this.stick1;
        var stick2 = this.stick2;
        var hero = this.hero;
        var redPoint = this.redPoint;
        //先将两个台阶同时移动
        var moveDis = 0;
        if (this.curStage == 1) {
            moveDis = stage2.x + stage2.stageSprite.width * stage2.scaleX / 2 - this.stageOriginX;
        }
        else if (this.curStage == 2) {
            moveDis = stage1.x + stage1.stageSprite.width * stage1.scaleX / 2 - this.stageOriginX;
        }
        egret.Tween.get(stick1).to({ x: stick1.x - moveDis }, 300);
        egret.Tween.get(stick2).to({ x: stick2.x - moveDis }, 300);
        egret.Tween.get(stage1).to({ x: stage1.x - moveDis }, 300);
        egret.Tween.get(stage2).to({ x: stage2.x - moveDis }, 300);
        egret.Tween.get(redPoint).to({ x: redPoint.x - moveDis }, 300);
        egret.Tween.get(hero).to({ x: hero.x - moveDis }, 300).call(this.moveStageDone, this);
    };
    //台阶移动结束
    GameScene.prototype.moveStageDone = function () {
        //更新分数，如果砸中红点分数翻倍
        var score = 1;
        if (this.isPerfect) {
            score = 2;
            this.isPerfect = false;
        }
        this.curScore += score;
        GameManager.setCurScore(this.curScore);
        this.scoreLabel.text = this.curScore + '';
        var tw = egret.Tween.get(this.scoreLabel);
        tw.to({ scaleX: 1.3, scaleY: 1.3 }, 200).to({ scaleX: 1.0, scaleY: 1.0 }, 200);
        if (this.curStage == 1) {
            this.curStage = 2;
            this.randomSetStage(this.stage1);
        }
        else if (this.curStage == 2) {
            this.curStage = 1;
            this.randomSetStage(this.stage2);
        }
    };
    //随机设置台阶
    GameScene.prototype.randomSetStage = function (mystage) {
        var stageW = this.stageW;
        var stageOriginX = this.stageOriginX;
        var redPoint = this.redPoint;
        var hero = this.hero;
        //台阶随机10-40倍宽度
        var scaleX = Math.floor(Math.random() * 31 + 10);
        mystage.scaleX = scaleX;
        //将台阶放在屏幕右外边
        mystage.x = stageW + mystage.stageSprite.width;
        //红点放在台阶上
        redPoint.x = mystage.x;
        //随机一个位置，在前一个台阶的右边，在屏幕之内
        var posx = Math.floor(Math.random() *
            (stageW - mystage.stageSprite.width * mystage.scaleX - stageOriginX - hero.heroSprite.width)
            + stageOriginX + mystage.stageSprite.width * mystage.scaleX / 2 + hero.heroSprite.width);
        var tw1 = egret.Tween.get(mystage);
        tw1.to({ x: posx }, 300);
        tw1.call(this.stepOver, this);
        var tw2 = egret.Tween.get(redPoint);
        tw2.to({ x: posx }, 300);
    };
    //
    GameScene.prototype.stepOver = function () {
        this.touchEnabled = true;
        this.isRunning = false;
        //清除缓动动画
        egret.Tween.removeAllTweens();
    };
    return GameScene;
}(egret.Sprite));
__reflect(GameScene.prototype, "GameScene");
