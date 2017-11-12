export default class EventEmitter{
    constructor(){
        this.events = {};
    }

    on(eventName,listener){
        if(typeof listener === 'function'){
            if(this.events[eventName] && !this.events[eventName].listeners.length){
                this.events[eventName].listener.push(listener);
            }else{
                this.events[eventName] = {
                    listener:[listener],
                    type:eventName
                }
            }
        }

    }
    
    
    off(eventName,listener){
        if(typeof eventName === 'undefined' || typeof eventName === 'function'){
            return;
        }

        if(typeof listener === 'function'){
            let ls = this.events[eventName].listener;
            let index = listener.indexOf(ls);
            return ls.splice(index,1);
        }

        delete this.events[eventName];

    }

    dispatch(eventName){
        let ev = this.events[eventName];
        if(ev){
            ev.listener.forEach( ls => {
                ls.call(this)
            })
        }
    }

}