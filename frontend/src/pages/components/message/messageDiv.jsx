import "./messageDiv.css";

function MessageDiv(props) {
  return (
    <div className="message-popup">
      <h1>{props.message}</h1>
    </div>
  );
}

export default MessageDiv;
