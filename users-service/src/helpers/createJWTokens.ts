import jwt from "jsonwebtoken";

export const createAccessToken = (_id: string) => {
    return jwt.sign({
        _id
    }, process.env.JWT_ACCESS_TOKEN_SECRET!, {
        expiresIn: 60 * 15
    })
}

export const createRefreshToken = (_id: string) => {
    return jwt.sign({
        _id
    }, process.env.JWT_REFRESH_TOKEN_SECRET!, {
        expiresIn: 60 * 60 * 24 * 30
    })
}