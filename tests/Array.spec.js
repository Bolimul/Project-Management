import { expect } from "chai";

describe('Arrays', ()=>{

    describe('#sort', ()=>{

        it('Sorting names array', ()=>{
            var names = ['Dani', 'Moshe', 'Adam'];
            expect(names.sort()).to.be.eql(['Adam11', 'Dani', 'Moshe']);
        })
    })
});