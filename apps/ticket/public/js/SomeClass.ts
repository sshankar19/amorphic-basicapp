import { RxDrug } from "./RxData";

function delayPromise(duration) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve();
        }, duration)
    });
  }

export class SomeClass {
    static async createStuff() {
        await delayPromise(500);
        console.log('delaying by 500');
        let sup = new RxDrug();
        await delayPromise(500);
        console.log('delaying by another 500');
        return sup;
    }
}