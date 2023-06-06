import mongoose from "mongoose";

const connectDb =(uri)=>{

// mongoose.set('strictQuary',true)
mongoose.connect(uri)
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err,"somthing went wrong"))

}
export default connectDb