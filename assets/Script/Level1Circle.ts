const {ccclass, property} = cc._decorator;

@ccclass
export default class Level1Circle extends cc.Component {
    @property(cc.Node)
    private bgNode:cc.Node=null;
    @property(cc.Node)
    private suziNode:cc.Node=null;
    @property(cc.Texture2D)
    private bgTextureList:cc.Texture2D[]=[];
    @property(cc.Texture2D)
    private suziTextureList:cc.Texture2D[]=[];
    
    private _bgId:number=0;
    private _suziId:number=0;
    
    public start():void{
        let bgSprite=this.bgNode.getComponent(cc.Sprite);
        bgSprite.spriteFrame=new cc.SpriteFrame(this.bgTextureList[this._bgId]);
        
        let suziSprite=this.suziNode.getComponent(cc.Sprite);
        suziSprite.spriteFrame=new cc.SpriteFrame(this.suziTextureList[this._suziId]);
    }
}
