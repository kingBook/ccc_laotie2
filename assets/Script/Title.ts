import MyGame from "./MyGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Title extends cc.Component {
    @property(cc.Node)
    private startNode:cc.Node=null;
    @property(cc.Node)
    private shareNode:cc.Node=null;
    @property(MyGame)
    private myGame:MyGame=null;
    
    public start():void{
       this.startNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
       this.shareNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let targetName=e.target.name;
        if(targetName=="start"){
            this.node.active=false;
            this.myGame.gotoSelectLevel();
        }else if(targetName=="share"){
            
        }
    }
    
    public onDestroy():void{
        this.startNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.shareNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
}
