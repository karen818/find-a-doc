var React = require('react');
var FindADocForm = require('FindADocForm');
var ZipSearchMessage = require('ZipSearchMessage');
var findFips = require('findFips');
var findPlans = require('findPlans');
var findProviders = require('findProviders');
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
      hiosPlanIdsArray: '',
      hiosIssuerId: '',
      plansList: '',
      providersList: '',
      providers: '',
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

        var hiosPlanIdsArray = [];

        for (var i = 0; i < plansArray.length; i++) {
          hiosPlanIdsArray.push(plansArray[i].hiosPlanId);
        }
        console.log(hiosPlanIdsArray);


        // Set state to start the render
        that.setState({
          searchZip: resp.zip_code,
          fipsCode: resp.fips_code,
          hiosPlanIdsArray: hiosPlanIdsArray,
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
    var plansList = that.state.plansByCarrier[event.nativeEvent.target[id].text];

    // transform into an array of the planNames
    plansList = plansList.map(plan => plan.planName)

    // Start the render of the plan dropdown
    that.setState({
      planSelectVisible: true,
      plansList: plansList
    })
  },
  handleProvidersList: function (searchZip, hiosPlanIdsArray) {
    var that = this;
    var {searchZip, hiosPlanIdsArray} = this.state;

    findProviders.getProviders(searchZip, hiosPlanIdsArray).then(function (providersList) {

      var providers = [];
      for (var i = 0; i < providersList.length; i++) {
        if (providersList[i].providerStreet2 === null) {
          providers.push(
            providersList[i].providerName + " - " +
            providersList[i].providerSpecialty + " - " +
            providersList[i].providerStreet1 + ", " +
            providersList[i].providerCity
          );
        } else {
          providers.push(
            providersList[i].providerName + " - " +
            providersList[i].providerSpecialty + " - " +
            providersList[i].providerStreet1 + ", " +
            providersList[i].providerStreet2 + ", " +
            providersList[i].providerCity
          );
        }
      }

      that.setState({
        hiosPlanIdsArray: hiosPlanIdsArray,
        providersList: providersList,
        providers: providers
      });
    }, function (e) {
      console.log("error", e)
      that.setState({
        errorMessage: e.message
      });
    });
  },
  render: function () {
    var {searchZip, fipsCode, carriersList, plansList, providersList, providers, inputVisible} = this.state;

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
          return <li key={item} className="renderedList callout">{item}</li>
            ;
        })
      );
    };

    var renderProviderList = (providers) => {
      if (providers.length === 0) {
        return (
          <ul>
            <li className="renderedList callout">This is where your providers will be displayed.</li>
          </ul>)
      }
      else {
        return (
          <ul>
            {renderList(providers) }
          </ul>)
      }

    }

    return (
      <div className='khShop'>
        <div className='khInputPanel'>
          <div className='khInputSection'>
            <h1 className='page-title'>Find A Doctor</h1>
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

          </div>
        </div>

        <div className='khProviderPanel'>
        <div className='khProviderSection'>
          <h1 className='page-title'>List of Providers</h1>
          <div className='planBuffer'><br/></div>
          {renderProviderList(providers) }
          </div>
        </div>

      </div>
    );
  }
});

module.exports = FindADoc;
