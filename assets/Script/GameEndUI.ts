import MyGame from "./MyGame";
import FuncUtil from "./FuncUtil";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameEndUI extends cc.Component {
    @property(cc.Node)
    private backNode:cc.Node=null;
    @property(cc.Node)
    private againNode:cc.Node=null;
    @property(cc.Label)
    private scoreLabel:cc.Label=null;
    @property(cc.Label)
    private scoreMax:cc.Label=null;
    @property(MyGame)
    private myGame:MyGame=null;
    
    public start():void{
        this.againNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.backNode.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
       
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        if(e.target==this.againNode){
            this.node.active=false;
            this.myGame.gotoLevel(this.myGame.level);
        }else if(e.target==this.backNode){
            this.node.active=false;
            this.myGame.gotoSelectLevel();
        }
    }
    
    public onDestroy():void{
        this.againNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.backNode.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }
}
