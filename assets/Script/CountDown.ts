const {ccclass, property} = cc._decorator;

@ccclass
export default class CountDown extends cc.Component {
    @property([cc.Texture2D])
    private textureList:cc.Texture2D[]=[];
    private _second:number=3;
    
    public start():void{
        this.setTexture(this._second);
    }
    
    public setTexture(second:number):void{
        this._second=second;
        let sprite=this.node.getComponent(cc.Sprite);
        sprite.spriteFrame=new cc.SpriteFrame(this.textureList[this._second-1]);
    }
}
