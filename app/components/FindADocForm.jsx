var React = require('react');
var zippo = require('zippo');

// var GetProvidersList = require('GetProvidersList');
var GetCarriersAndPlans = require('GetCarriersAndPlans');
// var GetPlansList = require('GetPlansList');
var findPlans = require('findPlans');


var FindADocForm = React.createClass({

  handleEnterZip: function(e){
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
    var {searchZip, carriersList} = this.props;
    return(
      <div>
        <form onSubmit={this.handleSubmit} ref="form" className="findadoc-form">
          <label>1. Enter Zip Code</label>
          <input type='number' ref='searchZip' placeholder='Enter your 5 digit zip code'/>
          <button className='button expanded' onClick={this.handleEnterZip}>Enter Zip Code</button>
          
        </form>
      </div>
    )
  }
});

module.exports = FindADocForm;
