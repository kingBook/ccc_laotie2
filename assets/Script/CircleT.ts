const {ccclass, property} = cc._decorator;

@ccclass
export default class CircleT extends cc.Component {
    @property([cc.SpriteFrame])
    private spriteFrameList:cc.SpriteFrame[]=[];
    
    private _colorIndex:number=0;
    
    public start():void{
        this.setTexture(this._colorIndex);
    }
    
    public setTexture(index:number):void{
        this._colorIndex=index;
        let sprite=this.getComponent(cc.Sprite);
        sprite.spriteFrame=this.spriteFrameList[this._colorIndex];
    }
    
    public get colorIndex():number{return this._colorIndex;}
}
