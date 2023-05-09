import React, { useState } from "react";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { dbService } from "../fbase";

function Tweet({ tweetObj, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 이 트윗을 지우겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `tweets/${tweetObj.id}`));
    }
  };
  const onToggle = () => {
    setIsEditing((prev) => !prev);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const ref = doc(dbService, `tweets/${tweetObj.id}`);
    await updateDoc(ref, {
      text: newTweet,
    });
    setIsEditing(false);
  };
  return (
    <div className="Tweet">
      {isEditing ? (
        isOwner && (
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={newTweet}
                placeholder="트윗을 입력해 주세요."
                onChange={onChange}
                required
              />
              <input type="submit" value="Update Tweet" />
              <button onClick={onToggle}>Cancel</button>
            </form>
          </>
        )
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Tweet</button>
              <button onClick={onToggle}>Edit Tweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
