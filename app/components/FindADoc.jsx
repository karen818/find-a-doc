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
        //console.log(plansByCarrier);

        var carriersList = Object.keys(plansByCarrier);
        //console.log(carriersList);

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
  render: function () {
    var {searchZip, fipsCode, carriersList, plansList, inputVisible} = this.state;

    var renderList = function (array) {
      return (
        _.map(array, function (item) {
          return <option key={item}>{item}</option>;
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
                {renderList(carriersList) }
              </select></label>
            <label>3. Choose Your Insurance Plan
              <select onChange='' ref="selectCarrier">
                {renderList(plansList) }
              </select></label>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FindADoc;
