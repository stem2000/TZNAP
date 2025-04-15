import { IBootable, IInjectable } from "../Interfaces/Interfaces";

const {ccclass, property} = cc._decorator;

@ccclass
export default class iBootable implements IBootable, IInjectable{
    constructor(){}
    _inject_(): void {}
    _init_(): void {}

}
