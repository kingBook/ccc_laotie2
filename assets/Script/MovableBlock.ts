const {ccclass, property} = cc._decorator;

@ccclass
export default class MovableBlock extends cc.Component {
	@property([cc.SpriteFrame])
    private block1List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block2List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block3List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block4List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block5List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block6List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block7List:cc.SpriteFrame[]=[];
    @property([cc.SpriteFrame])
    private block8List:cc.SpriteFrame[]=[];
    
    private _list:cc.SpriteFrame[][];
    private _type:number=0;
    private _color:number=0;
    
    public start():void{
        this._list=[this.block1List,this.block2List,this.block3List,this.block4List,this.block5List,this.block6List,this.block7List,this.block8List];
    }
    
    /**
     * 
     * @param type 0~7
     * @param color 0-4
     */
    public setTexture(type:number,color:number):void{
        let sprite=this.node.getComponent(cc.Sprite);
        sprite.spriteFrame=this._list[type][this._color];
    }
}
