import {Supertype, supertypeClass, property, remote, Remoteable, amorphicStatic} from 'amorphic';

@supertypeClass({toClient: true, toServer: true})
export class Customer extends Remoteable(Supertype) {
    @property()
    name: string;

    @property({toClient: ['ticket']})
    onlyServer: string;

    @property({toServer: ['ticket']})
    onlyClient: string;



    constructor() {
        super();
    }

}