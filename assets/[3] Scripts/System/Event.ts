export default class Event {
    subsribers: Function[];

    public constructor(){
        this.subsribers = [];
    }

    public Subscribe(subsriber: Function){
        if(!this.subsribers.includes(subsriber))
            this.subsribers.push(subsriber);
    }

    public Unsubscribe(subsriber: Function){
        const index = this.subsribers.indexOf(subsriber);

        if(index != -1){
            this.subsribers.splice(index, 1);
        }
    }

    public Invoke(): void{
        this.subsribers.forEach(subsriber => {
            subsriber();
        });
    }
}


