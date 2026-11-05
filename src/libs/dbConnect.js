import dns from 'dns';
dns.setServers(['1.1.1.1', '1.0.0.1']);
import mongoose from 'mongoose';
// A.  GET THE MONGO URI
const MONGODB_URI = process.env.MONGODB_URI;

// B.  IF IT DOESN'T EXIST THROW AN ERROR
if (!MONGODB_URI) {
throw new Error('MONGODB_URI environment variable is not defined.');
}

// 1. CHECK IF A GLOBAL CACHE ALREADY EXISTS; IF NOT, INITIALIZE IT IMMEDIATELY
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async () => {
    // 2. IF ALREADY CONNECTED, RETURN THE EXISTING CONNECTION IMMEDIATELY
    if (cached.conn) {
        return cached.conn;
    }

    // 3. IF A CONNECTION ISN'T IN PROGRESS, START A NEW ONE
    if (!cached.promise) {
        const opts = {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        family: 4,
    };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongoose) => {
                return mongoose;
        });
    }

    // 4. AWAIT THE CONNECTION AND SAVE IT TO THE CACHE
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        // Clear the promise on failure so the next request can retry.
        cached.promise = null;
        throw error;
    }
    console.log('Mongodb connected')
    
    // RETURN THE CONNECTION
    return cached.conn;
}

// EXPORT THE INSTANCE
export default dbConnect;