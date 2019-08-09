import { Supertype, supertypeClass, property, remote, amorphicStatic, Remoteable } from 'amorphic';
import { Customer } from "../../../common/js/Customer";
import { SomeClass } from "./SomeClass";


@supertypeClass
export abstract class AbstractController extends Remoteable(Supertype) {

    @remote()
    onClickServer() {

    }

    @remote()
    onClickServer2() {

    }
}