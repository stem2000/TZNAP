import { IBootable, IInjectable } from "../Interfaces/Interfaces";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gBootable implements IBootable, IInjectable{
    constructor(){}
    _inject_(): void {}
    _init_(): void {}

}
