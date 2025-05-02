import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import { ServiceContainer } from "./ServiceContainer";

const {ccclass, property} = cc._decorator;

@ccclass
export default abstract class aBootableService implements IBootable, IInjectable{
    constructor(){}
    _inject_(container: ServiceContainer): void {}
    _init_(): void {}

}
