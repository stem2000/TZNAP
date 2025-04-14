const {ccclass, property} = cc._decorator;


@ccclass()
export default abstract class ServiceRegistration extends cc.Component{

    public abstract RegisterAll();
}
