
class BgLayer extends egret.Sprite{
    private bg1:egret.Bitmap;

    constructor(){
        super();
        this.init();
    }

    private init():void{
        var bgIndex = Math.floor(Math.random()*5 + 1);
        var bg1 = new egret.Bitmap();
        bg1.texture = RES.getRes('bg' + bgIndex + '_jpg');
        this.addChild(bg1);
        this.bg1 = bg1;

        //背景图2要添加月亮
        if(bgIndex == 2){
            var moon = new egret.Bitmap();
            moon.texture = RES.getRes('moon_png');
            this.addChild(moon);
            moon.y = moon.height/10;
        }
    }
}