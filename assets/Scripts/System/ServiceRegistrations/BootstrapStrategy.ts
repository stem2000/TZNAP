const {ccclass, property} = cc._decorator;


@ccclass()
export default abstract class BootstrapStrategy extends cc.Component{

    public abstract Boot();
}
