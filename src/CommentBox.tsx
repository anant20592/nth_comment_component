import * as React from 'react';
interface CommentBoxProps {
  onSubmit: (comment: string) => void;
}
const CommentBox = ({ onSubmit }: CommentBoxProps) => {
  const [comment, setComment] = React.useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
      <textarea
        value={comment}
        onChange={handleChange}
        style={{ marginRight: '4px' }}
      />
      <button onClick={() => onSubmit(comment)} style={{ alignSelf: 'center' }}>
        Submit
      </button>
    </div>
  );
};

export default CommentBox;
