import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { Constructor } from "./ServiceLocator";

const {ccclass, property} = cc._decorator;

@ccclass
export default class iBootableComponent extends cc.Component implements IInjectable, IBootable{
    _init_(): void {}
    _inject_(): void {}

    public get _ctor_(): Constructor{
        return this.constructor as Constructor<this>;
    }
}
