import { Request, Response, NextFunction } from "express";

export const signin = (req: Request, res: Response, next: NextFunction) => {

}

export const signup = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, name, gender, birthday, password, confirmPassword } = req.body;

    
}