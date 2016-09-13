var React = require('react');
var zippo = require('zippo');

var FindADocForm = React.createClass({

  handleSubmit: function(e){
    e.preventDefault();
    var searchZip = this.refs.searchZip.value;

    if(zippo.validate(searchZip)){
      this.refs.searchZip.value = '';
      this.props.onSearchZip(searchZip);
    } else {
      this.refs.searchZip.focus();
    }
  },
  render: function(){
    return(
      <div>
        <form onSubmit={this.handleSubmit} ref="form" className="findadoc-form">
          <input type='number' ref='searchZip' placeholder='Enter your 5 digit zip code'/>
          <button className='button expanded'>Search</button>
        </form>
      </div>
    )
  }
});

module.exports = FindADocForm;
