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
      providersList: '',
      carrierSelectVisible: false,
      planSelectVisible: false
    }
  },
  handleSearchZip: function (searchZip) {
    var that = this;
    // Unneccessary here, will make the next field visible before we're ready
    // Would be a good place for a waiting spinner to start, though
    /*   this.setState({
          searchZip: searchZip
        });*/

    findFips.getZipFipsCode(searchZip).then(function (resp) {

      findPlans.getPlans(resp.zip_code, resp.fips_code).then(function (plansArray) {

        var plansByCarrier = _.groupBy(plansArray, function (obj) {
          return obj.carrierName;
        });

        var carriersList = Object.keys(plansByCarrier);

        // Set state to start the render
        that.setState({
          searchZip: resp.zip_code,
          fipsCode: resp.fips_code,
          plansByCarrier: plansByCarrier,
          carriersList: carriersList,
          carrierSelectVisible: true
        });
      });
    }, function (e) {
      console.log("error", e)
      that.setState({
        errorMessage: e.message
      });
    });

  },
  // The event here will tell us which option was selected
  handleChooseCarrier: function (event) {
    var that = this;
    var id = event.nativeEvent.target.selectedIndex;
    // An array of the plan objects
    var plansList = that.state.plansByCarrier[event.nativeEvent.target[id].text]
    // transform into an array of the planNames
    plansList = plansList.map(plan => plan.planName)

    // Start the render of the plan dropdown
    that.setState({
      planSelectVisible: true,
      plansList: plansList
    })
  },
  handleProvidersList: function(event){
    var that = this;
    var providersList = [1, 2, 3]

    that.setState ({
      providersList: providersList
    });
  },
  render: function () {
    var {searchZip, fipsCode, carriersList, plansList, providersList, inputVisible} = this.state;

    var renderDropdownList = function (array) {
      return (
        _.map(array, function (item) {
          return <option key={item}>{item}</option>;
        })
      );
    };

    var renderList = function (array) {
      return (
        _.map(array, function (item) {
          return <li key={item}>{item}</li>;
        })
      );
    };

    return (
      <div>
        <div className='row'>
          <div className='columns small-11 medium-6 large-4 small-centered'>
            <h3 className='page-title'>Find A Doctor</h3>
            <FindADocForm onSearchZip={this.handleSearchZip} />
            <label>2. Choose Your Insurance Carrier
              <select onChange={this.handleChooseCarrier} ref="selectCarrier">
                <option>Select Carrier...</option>
                {renderDropdownList(carriersList) }
              </select></label>
            <label>3. Choose Your Insurance Plan
              <select onChange={this.handleChooseCarrier} ref="selectCarrier">
                <option>Select Plan...</option>
                {renderDropdownList(plansList) }
              </select></label>
            <button className="button expanded" onClick={this.handleProvidersList}>Search For Doctors</button>
            <ul>
              {renderList(providersList) }
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
