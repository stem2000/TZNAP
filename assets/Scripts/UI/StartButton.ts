import { GlobalEvent } from "../Game/GlobalEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartButton extends cc.Component {

    private button : cc.Button;

    onEnable(){
        this.button = this.getComponent(cc.Button);

        this.button.node.on('click', this.StartGame, this)
    }

    private StartGame(){
        cc.systemEvent.emit(GlobalEvent.StartButtonPressed);

        this.button.node.off('click', this.StartGame, this);
    }

}
