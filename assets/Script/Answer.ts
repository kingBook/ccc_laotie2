const {ccclass, property} = cc._decorator;

@ccclass
export default class Answer extends cc.Component {
    @property(cc.Texture2D)
    private yesTexture:cc.Texture2D=null;
    @property(cc.Texture2D)
    private noTexture:cc.Texture2D=null;
    
    private _curTexture:cc.Texture2D;
    
    public start():void{
        let sprite=this.node.getComponent(cc.Sprite);
        sprite.spriteFrame=new cc.SpriteFrame(this._curTexture);
    }
    
    public setTexture(yes:boolean):void{
        this._curTexture=yes?this.yesTexture:this.noTexture;
    }
}
