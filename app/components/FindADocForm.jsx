var React = require('react');
var zippo = require('zippo');

var ProvidersList = require('ProvidersList');
var PlansList = require('PlansList');


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
    var {searchZip} = this.props;
    return(
      <div>
        <form onSubmit={this.handleSubmit} ref="form" className="findadoc-form">
          <label>1. Zip Code</label>
          <input type='number' ref='searchZip' placeholder='Enter your 5 digit zip code'/>
          <label>2. Choose Insurance Plan</label>
          <PlansList/>
          <button className='button expanded'>Search for Doctors</button>
        </form>
      </div>
    )
  }
});

module.exports = FindADocForm;
