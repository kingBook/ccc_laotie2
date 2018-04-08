const {ccclass, property} = cc._decorator;

@ccclass
export default class Level1 extends cc.Component {
    @property(cc.Prefab)
    private circlePrefab:cc.Prefab=null;
    
    public start():void{
        
    }
}
