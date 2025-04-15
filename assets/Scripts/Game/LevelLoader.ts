import { IBootable, IInjectable } from "../Interfaces/Interfaces";
import iBootable from "../System/iBootable";
import iBootableComponent from "../System/iBootableComponent";
import { ServiceLocator } from "../System/ServiceLocator";
import LevelBuilder from "./LevelBuilder";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelLoader extends iBootable{
    private levelBuilder: LevelBuilder;

    _init_(): void {}
    
    _inject_(): void {
        let servloc = ServiceLocator.getGlobal();

        this.levelBuilder = servloc.get(LevelBuilder);
    }

    public loadOneSegmentedLevel(){
        this.levelBuilder.buildOneSegmentedLevel();
    }

}
