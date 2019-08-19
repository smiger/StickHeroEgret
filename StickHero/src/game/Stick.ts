/**
 * 棍子类
 */
class Stick extends egret.Sprite{
    private growRate:number = 6;
    public stickSprite:egret.Bitmap;
    private stageW:number;
    private stageH:number;
    public timer:egret.Timer;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.initView,this);
    }

    private initView(){
        this.stageW = this.stage.stageWidth;
        this.stageH = this.stage.stageHeight;

        var stickSprite = new egret.Bitmap();
        stickSprite.texture = RES.getRes('stick1_png');
        this.addChild(stickSprite);
        stickSprite.scaleX = 2;
        this.stickSprite = stickSprite;
        this.anchorOffsetX = stickSprite.width;
        this.anchorOffsetY = stickSprite.height;

        var timer = new egret.Timer(1000/60, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.growHeight, this);
        this.timer = timer;
    }

    //
    public growHeight():void{
        //如果长度超过屏幕高度一半，则不再变长
        if(this.stickSprite.height*this.scaleY > this.stageH/2){
            return;
        }
        this.scaleY += this.growRate;
    }
}