import React, { useState } from "react";

const Comment = ({ comment, deleteComment, editComment }) => {
    const [editingComment, setEditingComment] = useState(false);
    const [editingCommentValue, setEditingCommentValue] = useState("");

    const startEditingComment = () => {
        setEditingComment(true);
        setEditingCommentValue(comment.text);
    }

    return (
        <article className="comment">
            <header>
                <div className="user">
                    <div className="nickname">{comment.nickname}</div>
                    <div className="date">utworzono: {comment.date}</div>
                </div>
                <div className="edit" onClick={startEditingComment}>edytuj</div>
                <div className="delete" onClick={() => deleteComment(comment.id)} > X</div>
            </header>


            {
                editingComment ? <form>
                    <textarea value={editingCommentValue} onChange={(e) => setEditingCommentValue(e.target.value)} /><br />
                    <button className="small-confirm-button" onClick={e => { e.preventDefault(); editComment(comment.id, editingCommentValue); setEditingComment(false) }}>Edytuj!</button>
                </form> :
                    <div className="article-text">
                        {comment.text}
                    </div>
            }



        </article>
    )
}

export default Comment;
