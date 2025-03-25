import { loginUser } from '../models/LoginModel.js';

export const login = async (req, res) => {
    const {username, password} = req.body;
    const result = await loginUser(username, password);
    return res.json(result);
};