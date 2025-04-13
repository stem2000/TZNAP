import { Queue } from "./Queue";

export default class EliminationQueue<T>{
    queue: Queue<T> = new Queue<T>();
    maxSize: number = 2;


    constructor(maxSize: number){
        this.maxSize = maxSize;
    }

    public enqueue(element: T) :  T {
        this.queue.enqueue(element);

        if(this.queue.size() >= this.maxSize){
            return this.queue.dequeue();
        }

        console.log("real queue- " + this.queue)
        
        return undefined;
    }
    
}
