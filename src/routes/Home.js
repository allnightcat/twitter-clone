import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  doc,
} from "firebase/firestore";
import Tweet from "../components/Tweet";

function Home({ userObj }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "tweets"), (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTweets(tweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "tweets"), {
        text: tweet,
        createdAt: Date.now(),
        userId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setTweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div className="Home">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="tweet" onClick={onSubmit}></input>
      </form>
      <div>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.userId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
