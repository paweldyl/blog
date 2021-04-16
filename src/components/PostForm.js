import React, { useState } from "react";

const AddPost = ({ createPost, toggleForm }) => {
    const [nicknameValue, setNicknameValue] = useState("");
    const [postTextValue, setPostTextValue] = useState("");

    const clearForm = () => {
        setNicknameValue("");
        setPostTextValue("");
        toggleForm();
    }

    return (
        <form className="post-form">
            <button className="close" onClick={(e) => { e.preventDefault(); toggleForm(); }}>X</button>
            <div className="nickname">
                <label htmlFor="nickname">Nazwa Autora</label>
                <input type="text" name="nickname" value={nicknameValue} onChange={(e) => setNicknameValue(e.target.value)} />
            </div>
            <div>
                <label htmlFor="nickname">Treść Posta:</label>
                <textarea type="text" name="nickname" value={postTextValue} onChange={(e) => setPostTextValue(e.target.value)}> </textarea>
            </div>
            <button className="add-post-button" onClick={(e) => { e.preventDefault(); createPost(nicknameValue, postTextValue); clearForm(); }}>utwórz post</button>
        </form >
    )
}

export default AddPost;
