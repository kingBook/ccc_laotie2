import MyGame from "./MyGame";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SelectLevel extends cc.Component {
    
    @property([cc.Node])
    private lvBtnList:cc.Node[]=[];
    @property(cc.Node)
    private backBtn:cc.Node=null;
    @property(MyGame)
    private myGame:MyGame=null;
    
    public start():void{
        this.backBtn.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        for(var i=0;i<this.lvBtnList.length;i++){
            this.lvBtnList[i].on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        }
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let targetName:String=e.target.name;
        if(targetName.indexOf("lv")>-1){//关卡 lv2btn
            let level:number=parseInt(targetName.substr(2,1));
            this.node.active=false;
            this.myGame.gotoLevel(level);
        }else if(targetName=="fanhuibtn"){//返回
            this.node.active=false;
            this.myGame.gotoTitle();
        }
    }
    
    public onDestroy():void{
        this.backBtn.off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        for(var i=0;i<this.lvBtnList.length;i++){
            this.lvBtnList[i].off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        }
    }
}
