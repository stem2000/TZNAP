const {ccclass, property} = cc._decorator;


@ccclass()
export default abstract class ServiceRegistrationStrategy extends cc.Component{

    public abstract RegisterAll();
}
