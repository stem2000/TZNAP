import { GlobalEvent } from "../Game/GlobalEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartButton extends cc.Component {

    private button : cc.Button;

    onEnable(){
        this.button = this.getComponent(cc.Button);
    }

    private StartGame(callback: Function){
        callback();
    }

}
