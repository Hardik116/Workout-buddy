const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')




const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Static method to sign up a user
userSchema.statics.signup = async function(email, password) {
    //validation
    if(!email || !password){
        throw Error('all feilds are required')
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid Email id")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    // Check if email is already registered
    const exists = await this.findOne({ email });
    if (exists) throw Error('Email already registered');

    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashedPassword });
    return user;
};


userSchema.statics.login= async function(email,password){
    if(!email || !password){
        throw Error('all feilds are required')
    }
    const user= await this.findOne({ email });
    if (!user) throw Error('Incorrect Email');

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error("Incorrect Password")
    }
    return user
}


const User = mongoose.model('User', userSchema);

module.exports = User;
