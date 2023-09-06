import { FC, useState } from 'react';

import './style.css';

const commentsArr = [
  {
    id: 1,
    text: 'This is comment 1',
    replies: [
      { id: 2, text: 'This is reply 1', replies: [] },
      { id: 3, text: 'This is reply 2', replies: [] },
    ],
  },
  { id: 4, text: 'This is comment 2', replies: [] },
];

export const App: FC<{ name: string }> = ({ name }) => {
  const [comments, setComments] = useState<any>(commentsArr);
  const addComment = () => {
    setComments([
      ...comments,
      {
        id: comments.length + 1,
        text: `This is comment ${comments.length + 1}`,
        replies: [],
      },
    ]);
  };

  const addReply = (commentId) => {
    const newArr = comments.map((comment) => {
      if (comment.id === commentId) {
        comment.replies.push({
          id: comment.replies.length + 1,
          text: `This is comment ${comment.replies.length + 1}`,
          replies: [],
        });
      }
    });
    setComments([...comments]);
  };

  const add = { replies: [{ replies: [{ replies: [] }] }] };
  const renderReplies = (replies) => {
    if (add.replies.length === 0) {
      return null;
    }
    // for(let i = 0; i < add.length; i++){
    return renderReplies(add.replies);
    // return(
    //   <div
    //           style={{
    //             border: '1px solid black',
    //             marginLeft: '16px',
    //             marginTop: '8px',
    //           }}
    //         >
    //           <p>User {'reply.id'}</p>
    //           <p>{'reply.text'}</p>
    //           <button>Reply</button>
    //         </div>
    // )
    //}
  };
  return (
    <div>
      <h1>Nth Level Comment Component</h1>
      <button onClick={addComment}>Add Comment</button>
      {comments.map((comment) => (
        <>
          <div style={{ border: '1px solid black' }}>
            <p>User {comment.id}</p>
            <p>{comment.text}</p>
            <button onClick={() => addReply(comment.id)}>Reply</button>
          </div>
          {renderReplies(comment.replies)}
          {/* {comment.replies.map((reply) => (
            
          ))} */}
        </>
      ))}
    </div>
  );
};
