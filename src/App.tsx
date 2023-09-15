import { FC, useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';
import CommentBox from './CommentBox';
import ShowReply from './ShowReply';

// const commentsArr = [
//   {
//     id: 1,
//     text: 'This is comment 1',
//     replies: [
//       {
//         id: 2,
//         text: 'This is reply 1',
//         replies: [
//           {
//             id: 4,
//             text: 'This is sub reply 1',
//             replies: [{ id: 6, text: 'This is sub sub reply 1', replies: [] }],
//           },
//         ],
//       },
//       {
//         id: 3,
//         text: 'This is reply 2',
//         replies: [{ id: 5, text: 'This is sub reply 2', replies: [] }],
//       },
//     ],
//   },
//   { id: 10, text: 'This is comment 2', replies: [] },
// ];

export interface CommentI {
  id: string;
  text: string;
  replies: CommentI[];
  parentId: null | string;
}

export const App: FC<{ name: string }> = ({ name }) => {
  const [commentList, setCommentList] = useState<CommentI[]>([]);
  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);

  const addReply = (reply: string, id: string) => {
    let updatedList = [];
    commentList.forEach((comment) => {
      updatedList.push(insertNode(comment, id, reply));
    });
    setCommentList([...updatedList]);
  };

  const insertNode = (comment: CommentI, id: string, reply: string) => {
    if (comment.id == id) {
      comment.replies.push({
        id: uuidv4(),
        text: reply,
        replies: [],
        parentId: null,
      });
      return comment;
    }
    let latestReply = comment.replies.map((child) =>
      insertNode(child, id, reply)
    );
    return { ...comment, replies: latestReply };
  };

  const removeReply = (commentId: string) => {
    let updatedList = [];
    commentList.forEach((comment) => {
      updatedList.push(removeNode(comment, commentId));
    });
    setCommentList([...updatedList]);
  };

  const removeNode = (comment: CommentI, id: string) => {
    if (comment.id == id) {
      comment = null;
      return comment;
    }
    let latestReply = comment.replies.map((child) => removeNode(child, id));
    let notNullReply = latestReply.filter((reply) => reply !== null);
    return { ...comment, replies: notNullReply };
  };

  const renderReplies = (replies: CommentI[]) => {
    return (
      <>
        {replies.map((reply: CommentI) => (
          <div style={{ marginLeft: '16px', marginTop: '8px' }}>
            <ShowReply
              comment={reply}
              onSubmit={(comment, id) => addReply(comment, id)}
              onDelete={(id) => removeReply(id)}
            />
            {reply.replies.length > 0 && (
              <div>{renderReplies(reply.replies)}</div>
            )}
          </div>
        ))}
      </>
    );
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
        <button onClick={() => setShowCommentBox(true)}>Comment</button>
      </div>
      {showCommentBox && (
        <CommentBox onSubmit={(comment) => onSubmit(comment)} />
      )}
      <div style={{ margin: '4px 0 4px 8px' }}>
        {renderReplies(commentList)}
      </div>
    </div>
  );
};
