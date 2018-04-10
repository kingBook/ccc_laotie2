import MyGame from "./MyGame";
import CountDown from "./CountDown";
import Answer from "./Answer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBase extends cc.Component {
    @property(cc.Prefab)
    protected countDownPrefab:cc.Prefab=null;
    @property(cc.Node)
    protected contentNode:cc.Node=null;
    @property(cc.Prefab)
    protected answerPrefab:cc.Prefab=null;
    @property(MyGame)
    protected myGame:MyGame=null;
    
    protected _countDownNode:cc.Node=null;
    protected _answerNode:cc.Node;
    
    private _secondCount:number;
    private _onTimerCallback:Function=null;
    
    
    
    public onEnable():void{
        this.startTimer(3,this.onCountDown,0.9);
    }
    
    public start():void{
        
    }
    
    private onCountDown(secCount:number):void{
        if(secCount<=0){
            this._countDownNode.active=false;
            this.onCountDownFinish();
        }else{
            if(this._countDownNode==null){
                this._countDownNode=cc.instantiate(this.countDownPrefab);
                this._countDownNode.setPosition(0,0);
                this._countDownNode.parent=this.node;
                let widget=this._countDownNode.addComponent(cc.Widget);
                widget.target=this.node;
            }
            this._countDownNode.active=true;
            this._countDownNode.getComponent(CountDown).setTexture(secCount);
        }
    }
    
    protected onCountDownFinish():void{
        
    }
    
    /**
     * 
     * @param secondCount 
     * @param onTimerCallback function (secCount:number):void
     * @param secondDelay 
     */
    protected startTimer(secondCount:number=1,onTimerCallback:Function=null,secondDelay:number=1):void{
        this._secondCount=secondCount|0;
        this._onTimerCallback=onTimerCallback;
        this.schedule(this.onTimerPrivate,secondDelay,this._secondCount-1);
        this.onTimerPrivate();
    }
    private onTimerPrivate():void{
        if(this._onTimerCallback!=null){
            this._onTimerCallback(this._secondCount--);
        }
        
    }
    
    /**阶段性结束前*/
    protected onPreEnd(isPass:boolean):void{
        this._answerNode=cc.instantiate(this.answerPrefab);
        this._answerNode.getComponent(Answer).setTexture(isPass);
        this._answerNode.setPosition(0,0);
        this._answerNode.parent=this.node;
        
        this.scheduleOnce(()=>{
            this.onPostEnd(isPass);
        },1);
    }
    protected onPostEnd(isPass:boolean):void{
        
    }
    
    protected destroyMySelf():void{
        if(this._answerNode){
            this._answerNode.destroy();
            this._answerNode=null;
        }
        if(this._countDownNode){
            this._countDownNode.destroy();
            this._countDownNode=null;
        }
    }
    
    public onDisable():void{
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.destroyMySelf();
    }
    
    public onDestroy():void{
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
        this.destroyMySelf();
    }
}
