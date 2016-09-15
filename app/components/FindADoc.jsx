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

        //plansByCarrier is now an object of carriers/plans
        var carriersList = [];

        _.forEach(plansByCarrier, function(value, key){
          carriersList.push(key);
        });
        console.log("Carriers List: " + carriersList);

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
  render: function() {
    var {searchZip, fipsCode, carriersList, inputVisible} = this.state;

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
            <select>
              {renderList(carriersList)}
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
