import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "./models/user.js";
import dotenv from "dotenv";

dotenv.config()
const MONGODB_URI =
process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/seederDB";

const num_users = 100;

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('conncted to DB')

    } catch (err) {
        console.log('connection got an error', err);
        process.exit(1)

    }

}

function generateFakeUser() {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        firstName,
        lastName,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        username: faker.internet.username({ firstName, lastName }).toLowerCase(),
        password: faker.internet.password({ length: 12 }),
        dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
        phone: faker.phone.number(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: faker.location.country()
        },
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        createdAt: faker.date.past({ years: 2 }),
        isActive: faker.datatype.boolean({ probability: 0.9 }) // 90% active
    };
}
    
async function seeddatabase(){
try{
    console.log('clearing existing user');
    await User.deleteMany({});
    console.log('cleared existing user');
    const batch_size  =100;
    const batches =Math.ceil(num_users/batch_size)
    console.log(`1Generating ${num_users} users in batch ${batches}`);
    for (let i =0; i<batches;i++){
        const userInBatch = Math.min(batch_size, num_users-(i*batch_size));
        const users = []
        for (let j =0; j<userInBatch;j++){
            users.push(generateFakeUser())
        }
        await User.insertMany(users, {ordered:false})
        console.log(`batch ${i+1}/${batches} complete ${users.length} users`);
    }
    console.log(`succesfully seeded ${num_users} users`);

}catch (err){
    console.log('seeding error:',err);
    throw err; 
}



}
async function main() {
    await connectDB()
    await seeddatabase()
    await mongoose.connection.close()
    console.log('connection closes succesfully');
    process.exit(0)

}
main().catch(Error=>{
console.error('fatal errror' ,Error);
process.exit(1)

});
