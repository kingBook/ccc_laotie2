const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelBase extends cc.Component {
    
    private _secondCount:number;
    private _onTimerCallback:Function=null;
    
    
    public start():void{
        
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
    
    public onDisable():void{
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }
    
    public onDestroy():void{
        this.unscheduleAllCallbacks();
        this.node.stopAllActions();
    }
}
