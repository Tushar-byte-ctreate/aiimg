import mongoose from 'mongoose'

const conSchema = new mongoose.Schema({
    name:{type:String ,},
    email:{type:String },
    subject:{type:String },
    message:{type:String}
})

export default mongoose.model('Contact',conSchema)