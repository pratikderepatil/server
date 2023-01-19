const express = require("express");

const UserModel = require("../models/user.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
	let { email, password } = req.body;

	let user = await UserModel.findOne({ email });
	try {
		if (user) {
			return res
				.status(409)
				.send("This email is already in use try with other email.");
		}

		let newUser = new UserModel({ email, password });
		await newUser.save();
		return res.status(201).send(newUser);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const user = await UserModel.findOne({ email, password });
	if (user) {
		return res.status(200).send({
			message: "Login Success",
			email: user.email,
		});
	} else {
		return res.status(401).send("invalid credentials");
	}
});

module.exports = app;
