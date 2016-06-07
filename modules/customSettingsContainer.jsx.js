/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
"use strict";

var React = require('react');

var CustomSettingsContainer = React.createClass({
  displayName: "CustomSettingsContainer",

  getDefaultProps: function getDefaultProps() {
    return {
      "placeholderText": ""
    };
  },
  render: function render() {
    var that = this;

    if (typeof that.props.customSettingsComponent !== 'function') {
      console.log("Couldn't find valid template.");
      return React.createElement("div", null);
    }

    return React.createElement(that.props.customSettingsComponent, null);
  }
});

module.exports = CustomSettingsContainer;
