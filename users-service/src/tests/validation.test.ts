import { isValidUsername, isValidEmail, isValidGender, isValidName, isValidPassword, isValidBirthday, isConfirmedPassword } from "../validation/UserValidation"

describe('user validation', () => {
    
    it('should return true if username is valud', () => {
        expect(isValidUsername('')).toBeFalsy()
        expect(isValidUsername('mohamed-/*')).toBeFalsy()
        expect(isValidUsername('mo')).toBeFalsy()
        expect(isValidUsername('m'.repeat(300))).toBeFalsy()
        expect(isValidUsername('mohamedcherif_1')).toBeTruthy()
    })

    it('should return true if email is valid', () => {
        expect(isValidEmail('')).toBeFalsy()
        expect(isValidEmail('mohamedcherif')).toBeFalsy()
        expect(isValidEmail('mohamedcherif@gmail.com')).toBeTruthy()
    })

    it('should return true if name is valid', () => {
        expect(isValidName('')).toBeFalsy()
        expect(isValidName('mo')).toBeFalsy()
        expect(isValidName('m'.repeat(256))).toBeFalsy()
        expect(isValidName('m'.repeat(254))).toBeTruthy()
        expect(isValidName('mohamedcherif')).toBeTruthy()
    })

    it('should return true if birthday is valid', () => {
        expect(isValidGender('')).toBeFalsy()
        expect(isValidGender('MALE')).toBeTruthy()
        expect(isValidGender('FEMALE')).toBeTruthy()
    })

    it('should return true if password is valid', () => {
        expect(isValidPassword('')).toBeFalsy();
        expect(isValidPassword('passw')).toBeFalsy();
        expect(isValidPassword('password')).toBeTruthy();
    })

    it('should return true if birthday is valid', () => {
        expect(isValidBirthday('2023-03-25')).toBeFalsy();
        expect(isValidBirthday('2021-13-25')).toBeFalsy();
        expect(isValidBirthday('2021-12-32')).toBeFalsy();
        expect(isValidBirthday('2021-02-30')).toBeFalsy();
        expect(isValidBirthday('2001-03-25')).toBeTruthy();

        expect(isValidBirthday('2001-02-29')).toBeFalsy();
        expect(isValidBirthday('2001-02-28')).toBeTruthy();
        expect(isValidBirthday('2000-02-29')).toBeTruthy();
    })

    it('should return true if confirm password matches password', () => {
        expect(isConfirmedPassword('password', 'password')).toBeTruthy();
        expect(isConfirmedPassword('password', 'password-')).toBeFalsy();
    })

})