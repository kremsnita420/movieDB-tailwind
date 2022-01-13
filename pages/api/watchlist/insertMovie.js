import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

export const config = {
    api: {
        externalResolver: true,
    },
}


export default async function saveToDB(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const client = await
            MongoClient.connect(
                uri);
        const db = client.db();
        const watchlist = db.collection("movies");

        watchlist.findOne({ id: req.body.id }, async function (error, result) {
            if (error) throw error

            if (result === null) {
                const result = await watchlist.insertOne(data);
                console.log("Added", data.name)
                client.close()
                return res.status(201).json({ message: `Data inserted successfully!` });


            } else {
                console.log("Already exists", result.name)
                client.close()
                return res.status(200).json({ message: `Data already exists on your list` });




            }


        })



    }
}

