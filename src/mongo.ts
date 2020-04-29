import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
})
const UsersCollection = mongoose.model('User', UserSchema);

export const connectToDb = async (connectionString: string) => {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true
    });
    console.log('connected to mongo db');
}

export const disconnectFromDb = async () => {
    await mongoose.disconnect();
    console.log('disconnected from db');
}

export const insertToDb = async () => {
    await UsersCollection.create({ name: 'amir', email: 'amir@xyz.com' });
    console.log('insert new record to db');
}

export const asyncFindUserInDb = async () => {
    const userFromDb = await UsersCollection.findOne({ name: 'amir'});
    console.log(`fetched user from db with await syntax: ${userFromDb}`);
}

export const promiseFindUserInDb = () => {
    return UsersCollection.findOne({ userFromDb: 'amir'});
}