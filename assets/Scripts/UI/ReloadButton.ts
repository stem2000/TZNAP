import { GlobalEvent } from "../Game/GlobalEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ReloadButton extends cc.Component {
     private button : cc.Button;
    
        onEnable(){
            this.button = this.getComponent(cc.Button);
    
            this.button.node.on('click', this.ReloadGame, this)
        }
    
        private ReloadGame(){
            cc.systemEvent.emit(GlobalEvent.GameReloaded);
    
            this.button.node.off('click', this.ReloadGame, this);
        }
}
