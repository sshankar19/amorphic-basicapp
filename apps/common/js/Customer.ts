import {Supertype, supertypeClass, property, remote, Remoteable, amorphicStatic} from 'amorphic';

@supertypeClass({toClient: ['ticket']})
export class Customer extends Remoteable(Supertype) {
    @property()
    name: string;

    @property({toClient: ['Test', 'ticket']})
    onlyServer: string;

    constructor() {
        super();
    }

}