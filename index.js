import EventEmitter from './event.js';



export default class App{
    constructor(){
        this.middleware = [];
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error',this.errorHandler);

    }   

    errorHandler(){
        console.error('error')
    }


    use(fn){
        if(typeof fn === 'function'){
            this.middleware.push(fn);
        }
        return this;   
    }


    run(){
        try{
            this.compose(this.middleware);
        }catch(e){
            this.eventEmitter.dispatch('error')
            
        }

    }

    compose(middleware){
        let i = 0;
        let self = this;

        function next(){
            let task = middleware[i++]

            if(task){
                task.call(self,()=>{
                    return next()
                })
            }else{
                return;
            }

        }

        next();
    }

}

window.App = App;