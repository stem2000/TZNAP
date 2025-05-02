import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default class iBootable implements IBootable, IInjectable{
    constructor(){}
    _inject_(container: ServiceContainer): void {}
    _init_(): void {}

}
