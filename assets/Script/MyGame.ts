const {ccclass, property} = cc._decorator;

@ccclass
export default class MyGame extends cc.Component {
    @property(cc.Node)
    private titleNode:cc.Node=null;
    @property(cc.Node)
    private selectLevelNode:cc.Node=null;
    @property([cc.Node])
    private levelIntroList:cc.Node[]=[];
    
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
        this.levelIntroList[level-1].active=true;
    }
}
