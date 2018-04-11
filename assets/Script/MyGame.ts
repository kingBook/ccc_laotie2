const {ccclass, property} = cc._decorator;

@ccclass
export default class MyGame extends cc.Component {
    @property(cc.Node)
    private titleNode:cc.Node=null;
    @property(cc.Node)
    private selectLevelNode:cc.Node=null;
    @property([cc.Node])
    private levelIntroList:cc.Node[]=[];
    @property(cc.Node)
    private winUINode:cc.Node=null;
    @property(cc.Node)
    private failureUINode:cc.Node=null;
    
    private _level:number=1;
    private _score:number;
    
    public start():void{
        this.gotoTitle();
    }
    
    public gotoTitle():void{
        this.titleNode.active=true;
    }
    
    public gotoSelectLevel():void{
        this.selectLevelNode.active=true;
    }
    
    public gotoLevel(level:number):void{
        this._score=0;
        this._level=level;
        this.levelIntroList[level-1].active=true;
    }
    
    public win():void{
        this.winUINode.active=true;
    }
    
    public failure():void{
        this.failureUINode.active=true;
    }
    
    public get level():number{return this._level;}
}
