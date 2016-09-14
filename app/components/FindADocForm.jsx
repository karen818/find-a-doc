var React = require('react');
var zippo = require('zippo');

var ProvidersList = require('ProvidersList');
var CarriersList = require('CarriersList');
var PlansList = require('PlansList');
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
          <label>2. Choose Insurance Carrier</label>
          <CarriersList />
          <label>3. Choose Insurance Plan</label>
          <PlansList />

          <button className='button expanded'>Search for Doctors</button>
        </form>
      </div>
    )
  }
});

module.exports = FindADocForm;
