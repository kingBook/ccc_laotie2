const {ccclass, property} = cc._decorator;

export default interface MyData {
    a:string;
    b:string;
};
@ccclass
export default class Test extends cc.Component {
	public start():void{
        this.node.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this)
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let data:MyData=new MyData();
        data.a="a";
        data.b="b";
        cc.log(data);
    }
}
