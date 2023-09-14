import { Fragment, useState } from 'react';
import { CommentI } from './App';
import CommentBox from './CommentBox';

interface ShowReplyProps {
  comment: CommentI;
  onSubmit: (comment: string, id: string) => void;
}

const ShowReply = ({ comment, onSubmit }: ShowReplyProps) => {
  const [addReply, setAddReply] = useState<boolean>(false);
  return (
    <Fragment key={comment.id}>
      <div style={{ border: '1px solid black' }}>
        <p>User {comment.id}</p>
        <p>{comment.text}</p>
        <button onClick={() => setAddReply(true)}>Reply</button>
        <button onClick={() => setAddReply(true)}>Edit</button>
        <button onClick={() => setAddReply(true)}>Delete</button>
      </div>
      {addReply && (
        <div style={{ margin: '4px 0' }}>
          <CommentBox
            onSubmit={(reply) => {
              onSubmit(reply, comment.id);
              setAddReply(false);
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ShowReply;
