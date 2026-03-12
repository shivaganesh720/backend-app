import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

/* ---------------- ADMIN LOGIN PAGES ---------------- */

const login = async (req, res) => {
    res.render("auth/login");
};

const validateUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email, role: "admin" });

    if (!user) {
        return res.redirect("/auth/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.redirect("/auth/login");
    }

    req.session.user = user;
    res.redirect("/");
};

/* ---------------- REGISTER PAGE ---------------- */

const register = async (req, res) => {
    res.render("auth/register");
};

const registerUser = async (req, res) => {
    const body = req.body;

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;

    await userModel.create(body);

    res.redirect("/auth/login");
};

/* ---------------- API SIGNUP ---------------- */

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "User already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/* ---------------- API SIGNIN ---------------- */

const signin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "User not registered. Please signup first."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid password"
            });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

/* ---------------- LOGOUT ---------------- */

const logout = (req, res) => {
    req.session.destroy();
    res.locals.user = null;
    res.render("auth/login");
};

export {
    login,
    validateUser,
    register,
    registerUser,
    logout,
    signup,
    signin
};