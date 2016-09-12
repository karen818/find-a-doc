var React = require('react');

var FindADocForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var searchZip = this.refs.searchZip.value;

    if(searchZip.length > 0){
      this.refs.searchZip.value = '';
      this.props.onEnterZip(searchZip);
    } else {
      this.refs.searchZip.focus();
    }
  },
  render: function(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} ref="form" className="findadoc-form">
          <input type='text' ref='searchZip' placeholder='Enter your zip code'/>
          <button className='button expanded'>Search</button>
        </form>
      </div>
    )
  }
});

module.exports = FindADocForm;
