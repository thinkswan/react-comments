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
