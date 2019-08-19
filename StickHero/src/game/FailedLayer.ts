/**
 * 失败界面
 */
class FailedLayer extends egret.Sprite{
    private stageW:number;
    private stageH:number;
    private shareTips:ShareTips;

    constructor(){
        super();
        this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE,this.initView,this);
    }
    private initView():void{
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;
        
        //获取当前分数
        var curScore = GameManager.getCurScore();
        //绘制背景
        var shp:egret.Shape = new egret.Shape();
        shp.graphics.beginFill(0x000000,0.7);
        shp.graphics.drawRect(0,0,this.stageW,this.stageH);
        shp.graphics.endFill();
        this.addChild(shp);

        //添加结束标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes('uires_9_png');
        title.anchorOffsetX = title.width/2;
        title.anchorOffsetY = title.height/2;
        title.x = this.stageW/2;
        title.y = title.height*1.5;
        this.addChild(title);

        //添加成绩背景
        var scoreBg = new egret.Bitmap();
        scoreBg.texture = RES.getRes('uires_3_png');
        scoreBg.anchorOffsetX = scoreBg.width/2;
        scoreBg.anchorOffsetY = scoreBg.height/2;
        scoreBg.x = this.stageW/2;
        scoreBg.y = scoreBg.height*1.3;
        this.addChild(scoreBg);

        //添加当前分数标签
        var curScoreLabel = new egret.TextField();
        this.addChild(curScoreLabel);
        curScoreLabel.x = scoreBg.x;
        curScoreLabel.y = scoreBg.y - scoreBg.height/8;
        curScoreLabel.size = 110;
        curScoreLabel.textAlign = 'center';
        curScoreLabel.textColor = 0x000000;
        curScoreLabel.text = curScore + '';
        curScoreLabel.anchorOffsetX = curScoreLabel.width/2;
        curScoreLabel.anchorOffsetY = curScoreLabel.height/2;

        //添加最佳分数标签
        var maxScoreLabel = new egret.TextField();
        this.addChild(maxScoreLabel);
        maxScoreLabel.x = scoreBg.x - scoreBg.width/8;
        maxScoreLabel.y = scoreBg.y + scoreBg.height*5/16;
        maxScoreLabel.size = 100;
        maxScoreLabel.textAlign = 'center';
        maxScoreLabel.textColor = 0x000000;
        //先获取存档分数
        var maxScoreStr = egret.localStorage.getItem('maxScore');
        var maxScore = parseInt(maxScoreStr);
        if(!maxScore || maxScore < curScore){
            maxScore = curScore;
            egret.localStorage.setItem('maxScore',maxScore+'');
        }
        maxScoreLabel.text = maxScore +'';
        maxScoreLabel.anchorOffsetX = maxScoreLabel.width/2;
        maxScoreLabel.anchorOffsetY = maxScoreLabel.height/2;

        //添加排名标签
        var rankLabel = new egret.TextField();
        this.addChild(rankLabel);
        rankLabel.x = scoreBg.x + scoreBg.width/8;
        rankLabel.y = scoreBg.y + scoreBg.height*5/16;
        rankLabel.size = 60;
        rankLabel.textAlign = 'center';
        rankLabel.textColor = 0x000000;
        rankLabel.text = '9999';
        rankLabel.anchorOffsetX = rankLabel.width/2;
        rankLabel.anchorOffsetY = rankLabel.height/2;

        //添加分享微信好友
        var shareBtn1 = new egret.Bitmap();
        shareBtn1.texture = RES.getRes('weixinhaoyou_png');
        this.addChild(shareBtn1);
        shareBtn1.anchorOffsetX = shareBtn1.width/2;
        shareBtn1.anchorOffsetY = shareBtn1.height/2;
        shareBtn1.x = this.stageW/4;
        shareBtn1.y = this.stageH/2;
        shareBtn1.touchEnabled = true;
        shareBtn1.addEventListener(egret.TouchEvent.TOUCH_END,this.shareBtnCallback,this);
        //添加分享微信朋友圈
        var shareBtn2 = new egret.Bitmap();
        shareBtn2.texture = RES.getRes('weixinpyquan_png');
        this.addChild(shareBtn2);
        shareBtn2.anchorOffsetX = shareBtn2.width/2;
        shareBtn2.anchorOffsetY = shareBtn2.height/2;
        shareBtn2.x = this.stageW*0.75;
        shareBtn2.y = this.stageH/2;
        shareBtn2.touchEnabled = true;
        shareBtn2.addEventListener(egret.TouchEvent.TOUCH_END,this.shareBtnCallback,this);
        
        //添加返回主菜单按钮
        var homeBtn = new egret.Bitmap();
        homeBtn.texture = RES.getRes('uires_8_png');
        this.addChild(homeBtn);
        homeBtn.anchorOffsetX = homeBtn.width/2;
        homeBtn.anchorOffsetY = homeBtn.height/2;
        homeBtn.x = this.stageW/6;
        homeBtn.y = this.stageH/2 + homeBtn.height*1.5;
        homeBtn.touchEnabled = true;
        homeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.homeBtnCallback,this);
        //添加重玩按钮 
        var restartBtn = new egret.Bitmap();
        restartBtn.texture = RES.getRes('uires_5_png');
        this.addChild(restartBtn);
        restartBtn.anchorOffsetX = restartBtn.width/2;
        restartBtn.anchorOffsetY = restartBtn.height/2;
        restartBtn.x = this.stageW*5/6;
        restartBtn.y = homeBtn.y;
        restartBtn.touchEnabled = true;
        restartBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.restartBtnCallback,this);

        //添加更多游戏按钮
        var moreGame = new egret.Bitmap();
        moreGame.texture = RES.getRes('scoreBg_png');
        this.addChild(moreGame);
        moreGame.anchorOffsetX = moreGame.width/2;
        moreGame.anchorOffsetY = moreGame.height/2;
        moreGame.scaleX = moreGame.scaleY = 1.5;
        moreGame.x = this.stageW/2;
        moreGame.y = homeBtn.y;
        //添加文本
        var moreGameLabel = new egret.TextField();
        this.addChild(moreGameLabel);
        moreGameLabel.x = moreGame.x;
        moreGameLabel.y = moreGame.y;
        moreGameLabel.size = 80;
        moreGameLabel.textAlign = 'center';
        moreGameLabel.bold = true;
        moreGameLabel.text = '更多游戏';
        moreGameLabel.touchEnabled = true;
        moreGameLabel.anchorOffsetX = moreGameLabel.width/2;
        moreGameLabel.anchorOffsetY = moreGameLabel.height/2;
        moreGameLabel.addEventListener(egret.TouchEvent.TOUCH_END,this.moreGameCallback,this);

        //添加分享提示
        this.shareTips = new ShareTips();
    }

    //分享按钮回调
    private shareBtnCallback(e:egret.TouchEvent):void{
        this.addChild(this.shareTips);
    }
    //home按钮回调
    private homeBtnCallback(e:egret.TouchEvent):void{
        Director.getInstance().runScene(new StartScene());
    }
    //restart按钮回调
    private restartBtnCallback(e:egret.TouchEvent):void{
        Director.getInstance().runScene(new GameScene());
    }
    //moreGame回调
    private moreGameCallback(e:egret.TouchEvent){
        window.open('http://www.baidu.com');
    }
}