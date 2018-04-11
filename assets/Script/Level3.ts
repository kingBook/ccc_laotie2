import LevelBase from "./LevelBase";

const {ccclass, property} = cc._decorator;
/**移动图形 */
@ccclass
export default class Level3 extends LevelBase {
    @property(cc.Node)
    private rangeRect:cc.Node=null;
    @property(cc.Prefab)
    private blockPrefab:cc.Prefab=null;
    
    private _blocksList:cc.Node[];
    private _blocksSourceList:cc.Node[];
    private _blocksMatchList:cc.Node[];
    
    private _createBlockTotal:number=2;//创建的方块数
    private _frequencyTotal:number=2;//出现的次数
    private _frequencyCount:number=0;
    
    
    public onEnable(){
        this._blocksList=[];
        this._blocksSourceList=[];
        super.onEnable();
    }
    
    public start(){
        super.start();
    }
    
    protected onCountDownFinish():void{
        this.createBlocksSource();
        this.scheduleOnce(this.createBlocksMatch,1);
        this.scheduleOnce(this.startRandomMove,2);
    }
    
    private createBlocksSource():void{
        for(let i=0;i<this._createBlockTotal;i++){
            this._blocksSourceList.push(this.createOneBlock());
        }
        this._frequencyCount++;
        if(this._frequencyCount>=this._frequencyTotal){
            this._createBlockTotal++;
            this._frequencyTotal++;
            this._frequencyCount=0;
        }
    }
    
    private createBlocksMatch():void{
        let total=this._blocksSourceList.length;
        for(let i=0;i<total;i++){
            this._blocksMatchList.push(this.createOneBlock());
        }
    }
    
    private createOneBlock():cc.Node{
        let block=cc.instantiate(this.blockPrefab);
        let bounds=this.rangeRect.getBoundingBox();
        this.setNodeToGoodRandomPos(block,bounds,this._blocksList);
        block.parent=this.contentNode;
        return block;
    }
    
    private startRandomMove():void{
        for(let i=0;i<this._blocksList.length;i++){
            
        }
    }
    
    protected destroyMySelf():void{
        for(let i=0;i<this._blocksList.length;i++){
            this._blocksList[i].destroy();
        }
        this._blocksList=[];
        this._blocksSourceList=[];
        super.destroyMySelf();
    }
	
}