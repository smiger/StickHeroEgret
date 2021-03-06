/**
 * 开始场景
 */
class StartScene extends egret.Sprite{
    private startBtn:egret.Bitmap;
    private stageW:number = 0;
    private stageH:number = 0;
    private stage1Hero:number = 0;
    private stage2Hero:number = 1;
    private stage1:Stage;
    private stage2:Stage;
    private heroVector : Array<Hero>;
    private canChoose:boolean = true;
    private curStage:number = 1;
    private curHero:number = 1;

    constructor(){
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.initView,this);
    }

    private initView(){
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.stageW = stageW;
        this.stageH = stageH;
        //添加背景
        var bg = new BgLayer();
        this.addChild(bg);
        //添加标题
        var title = new egret.Bitmap();
        title.texture = RES.getRes('uires_1_png');
        this.addChild(title);
        title.anchorOffsetX = title.width/2;
        title.anchorOffsetY = title.height/2;
        title.x = stageW/2;
        title.y = title.height;
        //开始按钮
        var startBtn = new egret.Bitmap();
        startBtn.texture = RES.getRes('uires_2_png');
        this.addChild(startBtn);
        startBtn.anchorOffsetX = startBtn.width/2;
        startBtn.anchorOffsetY = startBtn.height/2;
        startBtn.x = stageW/2;
        startBtn.y = stageH/2;
        startBtn.touchEnabled = true;
        this.startBtn = startBtn;
        startBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.startBtnCallback,this);
        //按钮上下移动
        this.startBtnMove();
        //添加台阶
        this.addHeroStage();
        //添加切换按钮
        var heroBtn = new egret.Bitmap();
        heroBtn.texture = RES.getRes('mainqiehuan_png');
        this.addChild(heroBtn);
        heroBtn.anchorOffsetX = heroBtn.width/2;
        heroBtn.anchorOffsetY = heroBtn.height/2;
        heroBtn.x = stageW/2;
        heroBtn.y = this.stage1.y + this.stage1.height/4;
        heroBtn.touchEnabled = true;
        heroBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.heroBtnCallback, this);
        
    }

    //按钮上下移动
    private startBtnMove():void{
        var stageH = this.stageH;
        var startBtn = this.startBtn;
        var tw = egret.Tween.get(startBtn);
        tw.to({y:stageH/2 + startBtn.height/10}, 1500).to({y:stageH/2 - startBtn.height/10}, 1500)
        .call(this.startBtnMove, this);
    }

    //开始按钮回调
    private startBtnCallback():void{
        if(!this.canChoose){
            return;
        }
        GameManager.setHeroIndex(this.curHero);
        var layer = new GameScene();
        Director.getInstance().runScene(layer);
    }

    //添加台阶
    private addHeroStage(){
        var stageH = this.stageH;
        var stageW = this.stageW;

        //先创建两个台阶
        var stage1 = new Stage();
        var stage2 = new Stage();
        stage1.stageSprite.scaleX = 40;
        stage2.stageSprite.scaleX = 40;
        stage1.x = stageW/2;
        stage1.y = stageH - stage1.height;
        stage2.x = stageW*1.5;
        stage2.y = stageH - stage2.height;
        this.addChild(stage1);
        this.addChild(stage2);

        //创建英雄
        var heroVector = [];
        for(var i = 1; i <= 4; i++){
            var hero = new Hero(i);
            heroVector.push(hero);
        }

        //将英雄放在台阶上
        stage1.addChild(heroVector[0]);
        stage1.addChild(heroVector[2]);
        heroVector[2].visible = false;
        this.stage1Hero = 0;
        stage2.addChild(heroVector[1]);
        stage2.addChild(heroVector[3]);
        heroVector[3].visible = false;
        this.stage2Hero = 1;

        this.stage1 = stage1;
        this.stage2 = stage2;
        this.heroVector = heroVector;

        //添加英雄简介1
        var heroLabel1 = new egret.TextField();
        stage1.addChild(heroLabel1);
        heroLabel1.textAlign = 'center';
        heroLabel1.text = '背负着理想和热血的棍子少年';
        heroLabel1.size = 36;
        heroLabel1.y = stage1.height*0.65;
        heroLabel1.width = stage1.width *0.25;
        heroLabel1.anchorOffsetX = heroLabel1.width/2;
        heroLabel1.anchorOffsetY = heroLabel1.height/2;

        //添加英雄简介2
        var heroLabel2 = new egret.TextField();
        stage2.addChild(heroLabel2);
        heroLabel2.textAlign = 'center';
        heroLabel2.text = '背负着理想和热血的棍子少年';
        heroLabel2.size = 36;
        heroLabel2.y = stage2.height*0.65;
        heroLabel2.width = stage2.width *0.25;
        heroLabel2.anchorOffsetX = heroLabel2.width/2;
        heroLabel2.anchorOffsetY = heroLabel2.height/2;
    }

    //切换按钮回调
    private heroBtnCallback(e:egret.TouchEvent):void{
        var stageW = this.stageW;
        var stage1 = this.stage1;
        var stage2 = this.stage2;
        if(!this.canChoose){
            return;
        }
        this.canChoose = false;
        //台阶1在屏幕中间，移出台阶1，移入台阶2
        if(this.curStage == 1){
            this.curStage = 2;
            var tw1 = egret.Tween.get(stage1);
            tw1.to({x:-stageW/2}, 500).call(()=>{stage1.x = stageW*1.5;});

            var tw2 = egret.Tween.get(stage2);
            tw2.to({x:stageW/2},500).call(this.choosenCallback,this);
        }
        //台阶2在屏幕中间，移出台阶2，移入台阶1
        else if(this.curStage == 2){
            this.curStage = 1;
            var tw3 = egret.Tween.get(stage2);
            tw3.to({x:-stageW/2},500).call(()=>{stage2.x = stageW*1.5});

            var tw4 = egret.Tween.get(stage1);
            tw4.to({x:stageW/2},500).call(this.choosenCallback,this);
        }
    }

    //英雄切换后回调
    private choosenCallback():void{
        if(this.curStage == 1){
            //移除英雄2，添加英雄4
            if(this.stage2Hero == 1){
                this.heroVector[1].visible = false;
                this.heroVector[3].visible = true;
                this.stage2Hero = 3;
            }
            //移除英雄4，添加英雄2
            else if(this.stage2Hero == 3){
                this.heroVector[3].visible = false;
                this.heroVector[1].visible = true;
                this.stage2Hero = 1;
            }

            //当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage2Hero - 1 + 4)%4 + 1;
        }else if(this.curStage == 2){
            //移除英雄1，添加英雄3
            if(this.stage1Hero == 0){
                this.heroVector[0].visible = false;
                this.heroVector[2].visible = true;
                this.stage1Hero = 2;
            }
            //移除英雄3，添加英雄1
            else if(this.stage1Hero == 0){
                this.heroVector[2].visible = false;
                this.heroVector[0].visible = true;
                this.stage1Hero = 0;
            }
            //当前展示的英雄索引为下一个台阶上的英雄索引减1
            this.curHero = (this.stage1Hero - 1 + 4)%4 + 1;
        }

        //可继续切换
        this.canChoose = true;
    }
}