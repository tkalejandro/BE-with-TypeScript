import mongoose, { mongo } from 'mongoose'
import bcrypt from 'bcrypt'
import config from 'config'

export interface SchemaDocument extends mongoose.Document {
    user: SchemaDocument['_id'];
    name: string;
    valid: boolean;
    userAgent: string;
    /**
     * TimeStamps is true
     */
    createdAt: Date;
    /**
     * TimeStamps is true
     */
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: {type: String}
},
    {
        timestamps: true
    })

//Missing type. More info here -> https://github.com/Automattic/mongoose/issues/11449

const SessionModel = mongoose.model("Session", sessionSchema)

export default SessionModel