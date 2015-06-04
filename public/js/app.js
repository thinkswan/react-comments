/*
  CommentBox
 */

var CommentBox = React.createClass({
  _makeAjaxCall: function(opts) {
    $.ajax(opts)
      .success(function(data) {
        this.setState({ data: data });
      }.bind(this))
      .error(function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this));
  },

  loadCommentsFromServer: function() {
    var opts = {
      url: this.props.url,
      dataType: 'json',
      cache: false
    };

    this._makeAjaxCall(opts);
  },

  handleCommentSubmit: function(comment) {
    // Optimistically render the new comment to avoid waiting for the roundtrip
    // to the server
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({ data: newComments });

    var opts = {
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment
    };

    this._makeAjaxCall(opts);
  },

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();

    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>

        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

/*
  CommentList
 */

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

/*
  Comment
 */

var Comment = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.children.toString(), { sanitize: true });

    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>

        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />

      </div>
    );
  }
});

/*
  CommentForm
 */

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

/*
  Initialize the app
 */

React.render(
  <CommentBox url="comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
