const {ccclass, property} = cc._decorator;

@ccclass
export default class FuncUtil extends cc.Object {
    public static fixWidgetWithNode(node:cc.Node,target:cc.Node):void{
        if(node.getComponent(cc.Widget)==null){
            let widget=node.addComponent(cc.Widget);
            widget.target=target;
        }
    }

}
