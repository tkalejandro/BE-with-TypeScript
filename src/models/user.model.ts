import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    /**
     * TimeStamps is true
     */
    createdAt: Date;
    /**
     * TimeStamps is true
     */
    updatedAt: Date;
    comparePassword(candidatePassword : string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
},
    {
        timestamps: true
    })

//Missing type. More info here -> https://github.com/Automattic/mongoose/issues/11449

//Password is always emcrypted.
userSchema.pre('save', async function (next: (err?: Error) => void) {
    let user = this as UserDocument
    if (!user.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))

    const hash = bcrypt.hashSync(user.password, salt)

    user.password = hash;

    return next()
})

userSchema.methods.comparePassword = async function(candidatePassword: string) : Promise<boolean>{
    const user = this as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false)
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel