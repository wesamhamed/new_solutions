const UserService = require("../services/userService");
const accesToken = require("../utils/jwt/accessToken");
const { hashPassword, comparePassword } = require("../utils/password.js");

const signupUser = async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const hash = await hashPassword(password);


    const user = await UserService.findByEmail(email);

    if (!user) {
        const data = {...req.body, password: hash };
        let result = await UserService.insertOne(data);
        const id = result.id;
        const payload = { id, email };
        const token = accesToken.generate(payload);
        req.isAuthenticated = true;
        req.user = payload;
        return res.status(201).json({ token });

    }
    return res.status(400).json({ message: "User already exist" })

}
const signinUser = async(req, res) => {
    const { email, password } = req.body;
    //sure that user exist 

    const user = await UserService.findByEmail(email);
    const id = user.id;

    const passwordValid = await comparePassword(password, user.password);
    if (user && passwordValid) {
        const payload = { id, email };
        const token = accesToken.generate(payload);
        req.isAuthenticated = true;
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Your unauthorized" })

}
const signoutUser = async(req, res) => {
    req.isAuthenticated = false;
    // res.redirect("/api/v1/signin");
    res.send("you're signout")
}
module.exports = { signupUser, signinUser, signoutUser };