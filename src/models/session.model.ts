import mongoose, { mongo } from 'mongoose'
import { UserDocument } from './user.model'

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
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

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema)

export default SessionModel