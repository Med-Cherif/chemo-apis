import { isLeapYear } from "../helpers/isLeapYear";

it.only('should return true if it is a leap year', () => {
    expect(isLeapYear(2016)).toBeTruthy()
    expect(isLeapYear(2001)).toBeFalsy()
    expect(isLeapYear(1999)).toBeFalsy()
    expect(isLeapYear(2020)).toBeTruthy()
    expect(isLeapYear(2024)).toBeTruthy()
    expect(isLeapYear(2028)).toBeTruthy()
})