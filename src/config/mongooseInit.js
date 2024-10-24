import { connect } from "mongoose";

export default function mongooseInit() {
        const url = process.env.DB_URL; 
        connect(url, {dbName: 'volcanoes'})
            .then(() => console.log('DB conected.'))
            .catch((err) => console.log(`DB failed:${err}`)) 
};