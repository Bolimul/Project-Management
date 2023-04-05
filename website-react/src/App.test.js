import { render, screen } from '@testing-library/react';
import App from './App';


function password_validation(password){
  password_user = 'abc234!';
  return password_user == password;
}
  

test('successful password validation',() =>{
    const userPassword = 'abc234!';
    expect(password_validation(userPassword)).to.be.eql(true);
});


test('unsuccessful password validation',() =>{
  const password1 = 'a1111';
  expect(password_validation(password1)).not.toBe(true);
});