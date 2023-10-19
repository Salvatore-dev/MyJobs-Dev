import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_SECOND_URI;

const collection = process.env.MONGODB_SECOND_NAME_COLLECTION;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export async function insertKeyword(keyword) {
  try {
    await client.connect();
    const database = client.db(collection);
    const usersCollection = database.collection("searchKeywords");
    const result = await usersCollection.insertOne(keyword);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export async function findKeyword(keyTofind) {
  try {
    await client.connect();
    const database = client.db(collection);
    const keywords = database.collection("searchKeywords");
    const query = { keyword: keyTofind };
    const keyword = await keywords.findOne(query);
    //console.log(keyword);
    return keyword;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function insertChapters(chapter) {
  try {
    await client.connect();
    const database = client.db(collection);
    const usersCollection = database.collection("chapters");
    const result = await usersCollection.insertOne(chapter);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export async function findChapter(chapterTofind) {
  try {
    await client.connect();
    const database = client.db(collection);
    const chapters = database.collection("chapters");
    const query = { chapter: chapterTofind };

    const chapter = await chapters.findOne(query);
    //console.log(keyword);
    return chapter;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function insertUser(user) {
  try {
    await client.connect();
    const database = client.db(collection);
    const usersCollection = database.collection("users");
    const result = await usersCollection.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

export async function findUser(usernameToFind) {
  try {
    await client.connect();
    const database = client.db(collection);
    const chapters = database.collection("users");
    const query = { username: usernameToFind };
    const user = await chapters.findOne(query);
    //console.log(keyword);
    return user;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await client.close();
  }
}

export async function upDateFavorite(userToUpdate, insertNewData) {
  try {
    await client.connect();
    const database = client.db(collection);
    const users = database.collection("users");
    const filter = { username: userToUpdate };
    //console.log(users);
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        favoriteVerses: insertNewData,
      },
    };
    const result = await users.updateOne(filter, updateDoc, options);
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}
