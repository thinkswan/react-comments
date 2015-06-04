var CommentForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();

    var authorField = React.findDOMNode(this.refs.author);
    var textField = React.findDOMNode(this.refs.text);
    var author = authorField.value.trim();
    var text = textField.value.trim();

    if (!text || !author) {
      return;
    }

    this.props.onCommentSubmit({ author: author, text: text });

    authorField.value = '';
    textField.value = '';

    return;
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }

});
