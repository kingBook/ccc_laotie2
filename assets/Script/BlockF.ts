const {ccclass, property} = cc._decorator;

@ccclass
export default class BlockF extends cc.Component {
    @property([cc.SpriteFrame])
    private textureList:cc.SpriteFrame[]=[];
    private _curIndex:number=0;
    public start():void{
        this.setTexture(this._curIndex);
    }
    
    public setTexture(index:number):void{
        this._curIndex=index;
        let sprite=this.node.getComponent(cc.Sprite);
        sprite.spriteFrame=this.textureList[this._curIndex];
    }
    
    public get colorIndex():number{return this._curIndex;}
}
