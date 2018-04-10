import LevelBase from "./LevelBase";
import Answer from "./Answer";
import MyGame from "./MyGame";
import CountDown from "./CountDown";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Level1 extends LevelBase {
    @property(cc.Prefab)
    private circlePrefab:cc.Prefab=null;
    @property(cc.Node)
    private obsMaskNode:cc.Node=null;
    
    private _cfgList:number[][]=[
        [3,2],
        [4,3],
        [5,3],
        [6,3],
        [7,3]
    ];
    
    private _lifeId:number;
    private _idCount:number;
    private _listSource:cc.Node[];
    private _listMatch:cc.Node[];
    private _xmin:number=-240;
    private _xmax:number=240;
    private _topY:number=250;
    private _midY:number=0;
    private _botY:number=-180;
    private _botY2:number=-350;
    private _cutCircleNode:cc.Node;
    private _startWaitMoveTime:number=2;//开始时准备进入漏斗等待的时间<秒>
    private _timeOutId:number=-1;
    
    public onEnable():void{
        this._lifeId=0;
        this._idCount=0;
        this._listSource=[];
        this._listMatch=[];
        this.obsMaskNode.active=false;
        super.onEnable();
    }
    
    public start():void{
        super.start();
    }
    
    protected onCountDownFinish():void{
        this.obsMaskNode.active=true;
        this.createSourceCircles();
        this._timeOutId=setTimeout(() => {
            this.onInitWaitComplete();
        }, this._startWaitMoveTime*1000);
    }
    
    private onInitWaitComplete():void{
        for(let i=0;i<this._listSource.length;i++){
            let circle=this._listSource[i];
            let moveTo=cc.moveTo(0.5,circle.x*0.6,this._midY);
            if(i<this._listSource.length-1){
                circle.runAction(moveTo);
            }else{
                let onComplete=cc.callFunc(this.onMoveToMid,this);
                circle.runAction(cc.sequence(moveTo,onComplete));
            }
        }
    }
    private onMoveToMid():void{
        let cutID=(Math.random()*this._listSource.length)|0;
        this._cutCircleNode=this._listSource[cutID];
        this._listSource.splice(cutID,1);
       
        this.sortPosWithList(this._listSource,this._xmin,this._xmax,this._midY);
        
        for(let i=0;i<this._listSource.length;i++){
            let circle=this._listSource[i];
            let moveTo=cc.moveTo(0.5,circle.x,this._botY);
            if(i<this._listSource.length-1){
                circle.runAction(moveTo);
            }else{
                let onComplete=cc.callFunc(this.onMoveToBot,this);
                circle.runAction(cc.sequence(moveTo,onComplete));
            }
        }
    }
    private onMoveToBot():void{
        this.createMatchCircles();
        for(let i=0;i<this._listMatch.length;i++){
            this._listMatch[i].on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        }
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let isPass=e.target==this._cutCircleNode;
        this.onPreEnd(isPass);
    }
    
    protected onPostEnd(isPass:boolean):void{
        super.onPostEnd();
        if(isPass){
            if(this._lifeId>=this._cfgList.length-1 && this._idCount>=this._cfgList[this._cfgList.length-1][1]){
                this.node.active=false;
                this.myGame.win();
            }else{
                this.nextHandler();//重建
            }
        }else{
            this.node.active=false;
            this.myGame.failure();//失败
        }
    }
    
    private nextHandler():void{
        this.destroyMySelf();
        this.createSourceCircles();
        this._timeOutId=setTimeout(() => {
            this.onInitWaitComplete();
        }, this._startWaitMoveTime*1000);
    }
    
    
    private createSourceCircles():void{
        let total=this._cfgList[this._lifeId][0];
        for(let i=0;i<total;i++){
            let circle=cc.instantiate(this.circlePrefab);
            circle.scale=0.7;
            circle.active=true;
            circle.parent=this.contentNode;
            this._listSource.push(circle);
            
            let widget=circle.addComponent(cc.Widget);
            widget.target=this.contentNode;
        }
        this.sortPosWithList(this._listSource,this._xmin,this._xmax,this._topY);
        
        
        this._idCount++;
        if(this._idCount>=this._cfgList[this._lifeId][1]){
            if(this._lifeId<this._cfgList.length-1){
                this._idCount=0;
                this._lifeId++;
            }
        }
    }
    
    private createMatchCircles():void{
        let total=this._listSource.length;
        this._listMatch.push(this._cutCircleNode);
        for(let i=0;i<total-1;i++){
            let circle=cc.instantiate(this.circlePrefab);
            circle.scale=0.7;
            circle.active=true;
            circle.parent=this.contentNode;
            this._listMatch.push(circle);
            
            let widget=circle.addComponent(cc.Widget);
            widget.target=this.contentNode;
        }
        //打乱供选择的圆
        this._listMatch.sort((a:cc.Node,b:cc.Node)=>{
            return Math.random()-0.5;
        });
        //
        this.sortPosWithList(this._listMatch,this._xmin,this._xmax,this._botY2);
    }
    
    private sortPosWithList(list:cc.Node[],xmin:number,xmax:number,y:number):void{
        let total=list.length;
        let d=xmax-xmin;
        let space=d/total;
        for(let i=0;i<total;i++){
            let x=space*i-(total-1)*space*0.5;
            list[i].setPosition(x,y);
        }
    }
    
    protected destroyMySelf():void{
        for(let i=0;i<this._listMatch.length;i++){
            this._listMatch[i].off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
            this._listMatch[i].destroy();
        }
        this._listMatch=[];
        
        for(let i=0;i<this._listSource.length;i++){
            this._listSource[i].destroy();
        }
         this._listSource=[];
        if(this._timeOutId>-1)clearTimeout(this._timeOutId);
        super.destroyMySelf();
    }
    
    public onDisable():void{
        super.onDisable();
    }
    
    public onDestroy():void{
        super.onDestroy();
    }
    
}
