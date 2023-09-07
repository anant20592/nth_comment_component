import { FC, useState } from 'react';

import './style.css';
import { v4 as uuidv4 } from 'uuid';

const commentsArr = [
  {
    id: 1,
    text: 'This is comment 1',
    replies: [
      {
        id: 2,
        text: 'This is reply 1',
        replies: [
          {
            id: 4,
            text: 'This is sub reply 1',
            replies: [{ id: 6, text: 'This is sub sub reply 1', replies: [] }],
          },
        ],
      },
      {
        id: 3,
        text: 'This is reply 2',
        replies: [{ id: 5, text: 'This is sub reply 2', replies: [] }],
      },
    ],
  },
  { id: 4, text: 'This is comment 2', replies: [] },
];

interface CommentI {
  id: string;
  text: string;
  replies: CommentI[];
  parentId: null | string;
}

export const App: FC<{ name: string }> = ({ name }) => {
  const [comments, setComments] = useState<CommentI[]>([]);
  const [comment, setComment] = useState<string>('');
  const addComment = () => {
    setComments([
      ...comments,
      {
        id: uuidv4(),
        text: comment,
        replies: [],
        parentId: null,
      },
    ]);
  };

  const addReply = (commentId: string, replies) => {
    console.log(commentId, replies);
    const arr = replies.map((comment: CommentI) => {
      if (comment.id === commentId) {
        comment.replies.push({
          id: uuidv4(),
          text: `This is comment ${comment.replies.length + 1}`,
          replies: [],
          parentId: null,
        });
        return comment;
      } else {
        return addReply(commentId, comment.replies);
      }
    });
    console.log(arr);
    setComments([...arr]);
  };

  const renderReplies = (replies: CommentI[]) => {
    return (
      <>
        {replies.map((reply: CommentI) => (
          <>
            <div
              style={{
                border: '1px solid black',
              }}
            >
              <p>User {'reply.id'}</p>
              <p>
                {reply.text} {reply.parentId}
              </p>
              <button onClick={() => addReply(reply.id, comments)}>
                Reply11
              </button>
            </div>
            {reply.replies.length > 0 && (
              <div style={{ marginLeft: '16px', marginTop: '8px' }}>
                {renderReplies(reply.replies)}
              </div>
            )}
          </>
        ))}
      </>
    );
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <h1>Nth Level Comment Component</h1>
      <textarea value={comment} onChange={handleChange} />
      <button onClick={addComment}>Add Comment</button>
      {comments.map((comment) => (
        <>
          <div style={{ border: '1px solid black' }}>
            <p>User {comment.id}</p>
            <p>{comment.text}</p>
            <button onClick={() => addReply(comment.id, comments)}>
              Reply
            </button>
          </div>
          {
            <div style={{ marginLeft: '16px', marginTop: '8px' }}>
              {renderReplies(comment.replies)}
            </div>
          }
        </>
      ))}
    </div>
  );
};
