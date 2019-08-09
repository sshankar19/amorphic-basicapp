export class RxDrug {
    codeType: string;
    code: string;
    drugName: string;
    impairments: Array<number>;
    prescriptionStartDate: Date;
    prescriptionEndDate: Date;

    constructor(){
        this.codeType = 'yo';
        this.code = 'this is my';
        this.drugName = 'drug name is here';
        this.impairments = [1, 3, 5, 6, 7, 8];
        this.prescriptionEndDate = new Date();
        this.prescriptionStartDate = new Date();
    }
    
    someFunc() {
        return 'yo'
    }
}
