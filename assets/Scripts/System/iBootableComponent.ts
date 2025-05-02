import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { Constructor, ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class iBootableComponent extends cc.Component implements IInjectable, IBootable{
    _init_(): void {}
    _inject_(container: ServiceContainer): void {}

    public get _ctor_(): Constructor{
        return this.constructor as Constructor<this>;
    }
}
