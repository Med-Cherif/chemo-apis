import { emailRegex, usernameRegex } from "../constants/regexValidationConstants"
import { isLeapYear } from "../helpers/isLeapYear";

export const isValidUsername = (v: string) => {
    if (!v) return false;
    if (v.length < 3) return false;
    if (v.length > 64) return false;
    return usernameRegex.test(v);
}

export const isValidEmail = (v: string) => {
    if (!v) return false
    return emailRegex.test(v)
}

export const isValidPassword = (v: string) => {
    if (!v) return false
    if (v.length < 6) return false;
    if (v.length > 255) return false;
    return true
}

export const isValidName = (v: string) => {
    if (!v) return false
    if (v.length < 3) return false;
    if (v.length > 255) return false;

    return true

}

export const isValidGender = (v: string) => {
    if (!v) return false
    if (!['MALE', 'FEMALE'].includes(v)) return false;

    return true

}

export const isValidBirthday = (v: string) => {
    if (!v) return false
    const [year, month, day] = v.split('-').map(Number);

    const prevYear = new Date().getFullYear() - 1;

    if (year > prevYear || month > 12 || day > 31) return false;

    if ([4, 6, 9, 11].includes(month) && day > 30) return false;

    if (month === 2 && day > 29) return false;

    if (!isLeapYear(year) && month === 2 && day > 28) return false;

    return true

}

export const isConfirmedPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return false;

    return true
}

export const signupValidate = (formData: { [property: string]: string }) => {
    
    const { name, username, email, birthday, gender, password, confirmPassowrd } = formData
    if (
        !isValidBirthday(birthday) || !isValidEmail(email) || !isValidGender(gender) || !isValidName(name) || !isValidPassword(password) || !isValidUsername(username) || !isConfirmedPassword(password, confirmPassowrd)
    ) return false
    return true
}