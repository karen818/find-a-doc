var React = require('react');
var _ = require('lodash');

var FindADocForm = require('FindADocForm');
var ZipSearchMessage = require('ZipSearchMessage');
var findFips = require('findFips');
var findPlans = require('findPlans');
var findProviders = require('findProviders');
var ProvidersList = require('ProvidersList');
var ProviderFilter = require('ProviderFilter');

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
      providers: '',
      searchText: '',
      disabled: true,
      disabled2: true
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
        if(plansArray.length > 0){
          that.setState({
            searchZip: resp.zip_code,
            fipsCode: resp.fips_code,
            plansByCarrier: plansByCarrier,
            carriersList: carriersList,
            disabled: false
          });
        } else {
          that.setState({
            disabled: true
          });
        }
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

    // transform into an array of obj {name:planName, id:hiosPlanId}
    plansList = plansList.map(plan => {
     return {name:plan.planName, id:plan.hiosPlanId}
    })
    // Start the render of the plan dropdown
    that.setState({
      planSelectVisible: true,
      plansList: plansList,
      disabled2: false
    })
  },
  handleProvidersList: function (event) {
    var that = this;
    var {searchZip} = this.state;

    var id = event.nativeEvent.target.selectedIndex;
    var hiosPlanId = event.nativeEvent.target[id].value;
    hiosPlanId = [hiosPlanId]; // format into an array for API

    findProviders.getProviders(searchZip, hiosPlanId).then(function (providersList) {

      var providers = [];
      for (var i = 0; i < providersList.length; i++) {

        if(providersList[i].providerStreet2 !== 'null'){
          providers.push({
            provName: providersList[i].providerName,
            provSpecialty: providersList[i].providerSpecialty,
            provStreet1: providersList[i].providerStreet1,
            provStreet2: providersList[i].providerStreet2,
            provCity: providersList[i].providerCity,
            provId: providersList[i].providerId
          });
        } else {
          providers.push({
            provName: providersList[i].providerName,
            provSpecialty: providersList[i].providerSpecialty,
            provStreet1: providersList[i].providerStreet1,
            provCity: providersList[i].providerCity,
            provId: providersList[i].providerId
          });
        }
      }

      that.setState({
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
  handleFilterProviders: function (searchText) {
    this.setState({
      searchText: searchText.toLowerCase()
    });
  },
  render: function () {
    var {searchZip, fipsCode, carriersList, plansList, providersList, providers,  searchText, disabled, disabled2} = this.state;

    var filteredProviders = findProviders.filterProviders(providers, searchText);

    var renderCarrierDropdown = function (array) {
      return (
        _.map(array, function (item) {
          return <option key={item}>{item}</option>;
        })
      );
    };

    var renderPlanDropdown = function (array) {
      return (
        _.map(array, function (item) {
          return <option key={item.name} value={item.id}>{item.name}</option>;
        })
      );
    };

    var renderProviderList = (providers) => {
      if (providers.length === 0) {
        return (
          <div>
            <ul>
              <li className="renderedList callout khProviderCardPlaceholder">This is where your providers will be displayed.</li>
            </ul>

          </div>
        )
      }
      else {
        return (
          <div>
            <ProviderFilter onSearch={this.handleFilterProviders}/>
            <ProvidersList providers={filteredProviders} />
          </div>
        )
      }

    }

    return (
      <div className='khShop'>
        <div className='khInputPanel'>
          <div className='khInputSection'>
            <h1 className='page-title'>Find A Doctor</h1>
            <FindADocForm onSearchZip={this.handleSearchZip} />
            <label>2. Choose Your Insurance Carrier
              <select onChange={this.handleChooseCarrier} ref="selectCarrier" disabled={disabled}>
                <option>Select Carrier...</option>
                {renderCarrierDropdown(carriersList) }
              </select></label>
            <label>3. Choose Your Insurance Plan
              <select onChange={this.handleProvidersList} ref="selectCarrier" disabled={disabled2}>
                <option>Select Plan...</option>
                {renderPlanDropdown(plansList) }
              </select></label>

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
