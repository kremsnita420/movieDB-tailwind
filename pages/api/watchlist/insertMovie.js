import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react"
const uri = process.env.MONGODB_URI;

export const config = {
    api: {
        externalResolver: true,
    },
}


export default async function saveToDB(req, res) {
    const session = await getSession({ req })

    if (req.method === "POST") {
        const data = req.body;
        const client = await
            MongoClient.connect(
                uri);
        const db = client.db();
        const watchlist = db.collection("movies");

        watchlist.findOne({ id: req.body.id, userEmail: session.user.email }, async function (error, result) {
            if (error) throw error

            if (!result) {
                const result = await watchlist.insertOne(data);
                console.log("Added", data.name)
                client.close()
                return res.status(201).json({ message: `Data inserted successfully!` });


            } else {
                console.log("Already exists")
                client.close()
                return res.status(200).json({ message: `Data already exists on your list` });




            }


        })



    }
}

