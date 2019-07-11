class Director{
    public static instance:Director = null;
    private root:Main = null;
    
    public static getInstance(){
        if(Director.instance == null){
            Director.instance = new Director();
        }
        return Director.instance;
    }

    public setRoot(root:Main){
        if(this.root == null){
            this.root = root;
        }
    }

    public runScene(layer:egret.DisplayObject){
        if(this.root != null && layer != null){
            this.root.removeChildren();
            this.root.addChild(layer);
        }
    }
}