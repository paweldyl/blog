import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import Comment from "./Comment";

const BlogPost = ({ post, formattedDate, deletePost, editPost }) => {
    const [comments, setComments] = useState([]);
    const [commentsVissible, setCommentsVissible] = useState(false);
    const [nickname, setNickname] = useState("");
    const [commentText, setCommentText] = useState("");
    const [editingPost, setEditingPost] = useState(false);
    const [editingPostValue, setEditingPostValue] = useState("");

    const clearForm = () => {
        setNickname("");
        setCommentText("");
    }

    const addComment = () => {
        setComments([
            ...comments,
            {
                id: uuidv4(),
                nickname: nickname,
                text: commentText,
                date: formattedDate()
            }
        ]);
    }

    const deleteComment = (id) => {
        setComments(
            comments.filter(comment => {
                return comment.id !== id;
            })
        );
    }

    const editComment = (id, text) => {
        setComments(
            comments.map(comment => {
                return comment.id === id ? { ...comment, text: text } : comment;
            })
        );
    }

    const startEditingPost = () => {
        setEditingPost(true);
        setEditingPostValue(post.text);
    }

    return (
        <article className="post">
            <section className="post-section">
                <header>
                    <div className="nickname">{post.nickname}</div>
                    <div className="edit" onClick={startEditingPost}>edytuj</div>
                    <div className="delete" onClick={() => deletePost(post.id)}>X</div>
                </header>
                {
                    editingPost ? <form>
                        <textarea value={editingPostValue} onChange={(e) => setEditingPostValue(e.target.value)} /><br />
                        <button className="small-confirm-button" onClick={e => { e.preventDefault(); editPost(post.id, editingPostValue); setEditingPost(false) }}>Edytuj!</button>
                    </form> :
                        <div className="article-text">
                            {post.text}
                        </div>
                }

                <footer>
                    <button className="toggle-comments" onClick={() => setCommentsVissible(!commentsVissible)}>
                        {
                            commentsVissible ? "ukryj komentarze" : `Pokaż komentarze (${comments.length})`
                        }
                    </button>
                    <div className="date">utworzono: <br />{post.date}</div>
                </footer>
            </section>
            {
                commentsVissible &&
                <section className="comments-section">
                    <div className="add-comment">
                        <form>
                            <div>
                                <label htmlFor="nickname">Nazwa Autora</label>
                                <input type="text" name="nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="nickname">komentarz:</label>
                                <textarea type="text" name="nickname" value={commentText} onChange={e => setCommentText(e.target.value)}> </textarea>
                            </div>
                            <button className="small-confirm-button" onClick={(e) => { e.preventDefault(); addComment(); clearForm(); }}>dodaj komentarz</button>
                        </form>
                    </div>
                    {
                        (comments.length > 0) ? "komentarze:" : "napisz pierwszy komentarz"
                    }
                    <section className="comments">
                        {
                            comments.map(comment => {
                                return <Comment comment={comment} deleteComment={deleteComment} editComment={editComment} key={comment.id} />
                            })
                        }
                    </section>
                </section>
            }
        </article>
    )
}

export default BlogPost;