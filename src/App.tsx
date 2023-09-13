import { FC, Fragment, useState } from 'react';

import './style.css';
import { v4 as uuidv4 } from 'uuid';
import CommentBox from './CommentBox';

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
  const [commentList, setCommentList] = useState<CommentI[]>([]);
  const [openBoxId, setOpenBoxId] = useState<string>("");
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);
  const addComment = () => {
    
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

  const onSubmit = (comment: string) => {
    setCommentList([
      ...commentList,
      {
        id: uuidv4(),
        text: comment,
        replies: [],
        parentId: null,
      },
    ]);
    setShowCommentBox(false);
  };

  const handleReply = (reply: string, commentId: string) => {
    setOpenBoxId("");
    const updatedCommentList = commentList.map(comment => {
      if(comment.id === commentId){
        comment.replies.push({
          id: uuidv4(),
          text: reply,
          replies: [],
          parentId: null,
        })
      }
      return comment;
    });
    setCommentList(updatedCommentList);
  }

  return (
    <div>
      <h1>Nth Level Comment Component</h1>
      <div
        style={{
          border: '1px solid grey',
          borderRadius: '4px',
          padding: '8px',
        }}
      >
        This is a post
      </div>
      <div style={{ margin: '4px 0' }}>
        <button
          // /style={{ float: 'right' }}
          onClick={() => setShowCommentBox(true)}
        >
          Comment
        </button>
      </div>
      {showCommentBox && (
        <CommentBox onSubmit={(comment) => onSubmit(comment)} />
      )}
      <div style={{margin: '4px 0 4px 8px'}}>
      {commentList.map((comment) => (
        <Fragment key={comment.id}>
          <div style={{ border: '1px solid black' }}>
            <p>User {comment.id}</p>
            <p>{comment.text}</p>
            <button onClick={() => setOpenBoxId(comment.id)}>
              Reply
            </button>
          </div>
          {openBoxId === comment.id && (
          <div style={{margin: '4px 0'}}>
            <CommentBox onSubmit={(reply) => handleReply(reply, comment.id)} />
          </div>
          )}
          {
            <div style={{ marginLeft: '16px', marginTop: '8px' }}>
              {renderReplies(comment.replies)}
            </div>
          }
        </Fragment>
      ))}
      </div>
    </div>
  );
};
