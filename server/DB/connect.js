import mongoose from "mongoose";

export const connectDB = () => {
   mongoose
     .connect(process.env.MONGO_URL, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     })
     .then((res) => console.log(`mongo db is connected`))
     .catch((err) => console.log(err));
};
