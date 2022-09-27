 import { emailRegex, usernameRegex } from "../constants/regexValidationConstants"

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
}