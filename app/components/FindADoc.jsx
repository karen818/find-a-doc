var React = require('react');
var FindADocForm = require('FindADocForm');
var ZipSearchMessage = require('ZipSearchMessage');
var findFips = require('findFips');
var findPlans = require('findPlans');
var _ = require('lodash');
// var GetCarriersAndPlans = require('GetCarriersAndPlans');

var FindADoc = React.createClass({
  getInitialState: function () {
    return {
      searchZip: '',
      fipsCode: '',
      carriersList: '',
      plansArray: [],
      plansByCarrier: '',
      hiosIssuerId: '',
      plansList: '',
      inputVisible: false
    }
  },
  handleSearchZip: function (searchZip) {
    var that = this;
    this.setState({
      searchZip: searchZip
    });
    findFips.getFipsCode(searchZip).then(function(fipsCode){
      that.setState({
        searchZip: searchZip,
        fipsCode: fipsCode,
        inputVisible: true
      });
      findPlans.getPlans(searchZip, fipsCode).then(function(plansArray){

        var plansByCarrier = _.groupBy(plansArray, function(obj){
          return obj.carrierName;
        });

        console.log(plansByCarrier);

        var carriersList = Object.keys(plansByCarrier);
        console.log(carriersList);


        that.setState({
          plansByCarrier: plansByCarrier,
          carriersList: carriersList,
          inputVisible: true
        });
      });
    }, function(e){
      that.setState({
        errorMessage: e.message
      });
    });

  },
  handleChooseCarrier: function(){
    var {plansArray} = this.state;
    var plans = plansArray.filter((plan) => {
      if(plan.carrierName === this.refs.selectCarrier){
        console.log(plan);
      }
      else{console.log(plan);}
    });
  },
  render: function() {
    var {searchZip, fipsCode, carriersList, plansArray, inputVisible, plansByCarrier} = this.state;

    var renderList = function(array){
      return (
        _.map(array, function(item){
          return <option>{item}</option>;
        })
      );
    };

    return (
      <div>
        <div className='row'>
          <div className='columns small-11 medium-6 large-4 small-centered'>
            <h3 className='page-title'>Find A Doctor</h3>
            <FindADocForm onSearchZip={this.handleSearchZip} />
            <label>2. Choose Your Insurance Carrier</label>
            <select onChange={this.handleChooseCarrier} ref="selectCarrier">
              {renderList(carriersList)}
            </select>
            <label>3. Choose Your Insurance Plan</label>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
