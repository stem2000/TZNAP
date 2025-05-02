import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { Constructor, ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class aBootableServiceComponent extends cc.Component implements IInjectable, IBootable{
    abstract _init_();
    abstract _inject_(container: ServiceContainer);

    public get _ctor_(): Constructor{
        return this.constructor as Constructor<this>;
    }
}
