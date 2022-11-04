import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export const hashPassword = (password: string) => {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hashedPassword}`;
}

export const comparePassword = (password: string, encrypted: string) => {
    const [salt, hashed] = encrypted.split(':')
    const hashedPassword = scryptSync(password, salt, 64);
    const bufferedEcnrypted = Buffer.from(hashed, 'hex');
    return timingSafeEqual(hashedPassword, bufferedEcnrypted);
}
