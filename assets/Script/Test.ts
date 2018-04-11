const {ccclass, property} = cc._decorator;

@ccclass
export default class Test extends cc.Component {
    private _count:number=2;
    
    private _obj={
        onTimer:function(count:number):void{
            cc.log("count:",count);
            if(count==0){
                cc.log("complete");
            }
        }
    };
    
	public start():void{
        this.schedule(this.onTimer,1,this._count-1);
    }
    
    private onTimer():void{
        this._count--;
        this._obj.onTimer(this._count);
    }
    
    
}
