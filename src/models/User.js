import mongoose from "mongoose";
import {hash, compare} from "bcrypt";

const {Schema, model} = mongoose;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
			unique: true,
		},
		lastName: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Must use a valid email address"],
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
		},
	},
	// set this to use virtual below
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
userSchema.pre("save", async function (next) {
	if (this.isNew || this.isModified("password")) {
		const saltRounds = 10;
		this.password = await hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
	return compare(password, this.password);
};

export const User = model("User", userSchema);