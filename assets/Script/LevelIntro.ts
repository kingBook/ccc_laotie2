import MyGame from "./MyGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelIntro extends cc.Component {
    @property(cc.Integer)
    private levelNO:number=1;
    @property(cc.Node)
    private startNode:cc.Node=null;
    @property(MyGame)
    private myGame:MyGame=null;
    @property(cc.Node)
    private levelNode:cc.Node=null;
    
    public start():void{
        this.startNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let targetName:string=e.target.name;
        if(targetName=="startLevelBtn"){
            this.node.active=false;
            this.levelNode.active=true;
        }
    }
    
    public onDestroy():void{
        this.startNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    
}
