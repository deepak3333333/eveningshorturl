const { default: mongoose } = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    salt: String,
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;

    // Create a 16-byte salt and convert it to a hexadecimal string
    const salt = randomBytes(16).toString("hex");

    // Generate the hashed password
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    // Assign salt and hashed password to the user object
    user.salt = salt;
    user.password = hashedPassword;
    next();
});

userSchema.static("matchingPassword", async function (email, password) {
    console.log("Email received:", email);
    
    const user = await this.findOne({ email });
    if (!user) {
        console.error("User with this email not found");
        throw new Error("User not found");
    }

    const salt = user.salt;
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
console.log(hashedPassword,user.password);

    if (hashedPassword !== user.password) {
        console.error("Password does not match");
        throw new Error("Password not matched");
    }
    
    console.log("User authenticated successfully");
    return user;
});


const User = mongoose.model("User", userSchema);

module.exports = User;
