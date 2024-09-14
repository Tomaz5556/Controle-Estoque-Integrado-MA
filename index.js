const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = "mongodb+srv://tmb5:MexTRyFdDDamqlVZ@clusterteste.lc1jt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTeste";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    try {
        await client.connect();
        const database = client.db("estoque");
        const users = database.collection("users");
        
        const user = await users.findOne({ username: username, password: password });

        if (user) {
            res.send("Login successful! Welcome, " + username);
        } else {
            res.send("Invalid username or password");
        }
    } catch (error) {
        console.error(error);
        res.send("Error connecting to the database");
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

/*usuarios testados admin-1234 tomaz-4567 */