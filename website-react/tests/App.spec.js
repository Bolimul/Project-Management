const chai = require('chai')

function password_validation(password){
    var password_user = 'abc234!';
    return password_user == password;
}
  
  describe('password validation', ()=>{

    describe('#password_validation', ()=>{

        it('successful password validation', ()=>{
            const userPassword = 'abc234!';
            chai.expect(password_validation(userPassword)).to.be.eql(true);
        })

        it('unsuccessful password validation', ()=>{
            const password1 = 'a1111';
            chai.expect(password_validation(password1)).to.be.eql(false);
        })
    })
});
