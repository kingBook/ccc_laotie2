import LevelBase from "./LevelBase";
import BlockF from "./BlockF";
import CircleT from "./CircleT";

const {ccclass, property} = cc._decorator;


export default interface ColorScaleData {
    colorIndex:number;
    scale:number;
};

@ccclass
export default class Level2 extends LevelBase {
    @property(cc.Prefab)
    private blockFPrefab:cc.Prefab=null;
    @property(cc.Prefab)
    private circleTPrefab:cc.Prefab=null;
    @property(cc.Node)
    private rangeRect1:cc.Node=null;
    @property(cc.Node)
    private rangeRect2:cc.Node=null;
    
    private _colorIdList:number[];
    private _blockFNodeList:cc.Node[];
    private _circlesNodeList:cc.Node[];
    private _scaleList:number[]=[0.2,0.4,0.6,0.8,1,1.2,1.4,1.6];//length:8
    
    public onEnable(){
        this.rangeRect1.active=false;
        this.rangeRect2.active=false;
        this._colorIdList=[];
        this._blockFNodeList=[];
        this._circlesNodeList=[];
        super.onEnable();
    }
    
    public start(){
        super.start();
    }
    
    protected onCountDownFinish():void{
        this.rangeRect1.active=true;
        this.rangeRect2.active=true;
        this.createBlocks();
        this.createCircles();
    }
    
    private createBlocks():void{
        let scaleXList=this._scaleList.concat();
        let x=0;
        let y0=140;
        let count=((Math.random()*4)|0)+3;//3-6
        for(let i=0;i<count;i++){
            let colorIndex=(Math.random()*8)|0;//0-7
            let scaleXIndex=(Math.random()*scaleXList.length)|0;
            let block=cc.instantiate(this.blockFPrefab);
            block.getComponent(BlockF).setTexture(colorIndex);
            block.scaleX=scaleXList[scaleXIndex];
            scaleXList.splice(scaleXIndex,1);
            block.parent=this.contentNode;
            this._blockFNodeList.push(block);
        }
        this._blockFNodeList.sort((a:cc.Node,b:cc.Node)=>{
            return b.scaleX-a.scaleX;
        });
        for(let i=0;i<this._blockFNodeList.length;i++){
            let block=this._blockFNodeList[i];
            block.setPosition(x,y0+i*30);
        }
    }
    
    private createCircles():void{
        let colorScaleList:ColorScaleData[]=[];
        for(let i=0;i<this._blockFNodeList.length;i++){//从底部最大的到顶部最小的
            let cs=new ColorScaleData();
            cs.colorIndex=this._blockFNodeList[i].getComponent(BlockF).colorIndex;
            cs.scale=this._blockFNodeList[i].scaleX;
            colorScaleList.push(cs);
        }
        let matchNode=this.createOneCirclesNode(colorScaleList,this.contentNode,0,0,"matchNode");
        this._circlesNodeList.push(matchNode);
        //创建随机个数
        let randomCount=((Math.random()*4)|0)+3;//3-6
        for(let i=0;i<randomCount;i++){
            let ranCirclesNode=this.createRandomCirclesNode(this.contentNode,0,0);
            this._circlesNodeList.push(ranCirclesNode);
        }
        
        let bounds=this.rangeRect2.getBoundingBox();
        for(let i=0;i<this._circlesNodeList.length;i++){
            let nd=this._circlesNodeList[i];
            //打乱位置
            let x=bounds.xMin+Math.random()*bounds.width;
            let y=bounds.yMin+Math.random()*bounds.height;
            nd.setPosition(x,y);
            //侦听触摸
            nd.on(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
        }
    }
    
    private onTouchEnd(e:cc.Event.EventTouch):void{
        let isPass=e.target.name=="matchNode";
        this.onPreEnd(isPass);
    }
    
    protected onPostEnd(isPass:boolean){
        if(isPass){
            this.nextHandler();
        }else{
            this.node.active=false;
            this.myGame.failure();//失败
        }
    }
    
    private nextHandler():void{
        this.destroyMySelf();
        this.createBlocks();
        this.createCircles();
    }
    
    private createRandomCirclesNode(parentNode:cc.Node,x:number=0,y:number=0,name?:string):cc.Node{
        let colorScaleList:ColorScaleData[]=[];
        
        let circleCount=((Math.random()*4)|0)+3;//3-6
        let scaleXList=this._scaleList.concat();
        for(let i=0;i<circleCount;i++){
            let sc=new ColorScaleData();
            sc.colorIndex=(Math.random()*8)|0;//0-7
            
            let scaleXIndex=(Math.random()*scaleXList.length)|0;
            sc.scale=scaleXList[scaleXIndex];
            scaleXList.splice(scaleXIndex,1);
            
            colorScaleList.push(sc);
        }
        colorScaleList.sort((a:ColorScaleData,b:ColorScaleData)=>{
            return b.scale-a.scale;
        });
        return this.createOneCirclesNode(colorScaleList,parentNode,x,y,name);
    }
    
    
    private createOneCirclesNode(colorScaleList:ColorScaleData[],parentNode:cc.Node,x:number=0,y:number=0,name?:string):cc.Node{
        let node=new cc.Node(name);
        node.setPosition(x,y);
        node.parent=parentNode;
        let len=colorScaleList.length;
        let maxSize:cc.Size;
        for(let i=0;i<len;i++){
            let child=cc.instantiate(this.circleTPrefab);
            child.getComponent(CircleT).setTexture(colorScaleList[i].colorIndex);
            child.scale=colorScaleList[i].scale/this._scaleList[this._scaleList.length-1];//除以最大的一个，得出缩放的比例
            child.setPosition(0,0);
            child.parent=node;
            if(i==0)maxSize=child.getContentSize();
        }
        node.setContentSize(maxSize);
        return node;
    }
    
    protected destroyMySelf():void{
        if(this._blockFNodeList){
            for(let i=0;i<this._blockFNodeList.length;i++){
                this._blockFNodeList[i].destroy();
            }
            this._blockFNodeList=null;
        }
        if(this._circlesNodeList){
            for(let i=0;i<this._circlesNodeList.length;i++){
                this._circlesNodeList[i].off(cc.Node.EventType.TOUCH_END,this.onTouchEnd,this);
                this._circlesNodeList[i].destroy();
            }
            this._circlesNodeList=null;
        }
        super.destroyMySelf();
    }
}
