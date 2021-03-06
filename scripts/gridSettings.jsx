/*
   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
var React = require('react');
var includes = require('lodash/includes');
var without = require('lodash/without');
var find = require('lodash/find');

var GridSettings = React.createClass({
    getDefaultProps: function(){
        return {
            "columns": [],
            "columnMetadata": [],
            "selectedColumns": [],
            "settingsText": "",
            "maxRowsText": "",
            "resultsPerPage": 0,
            "enableToggleCustom": false,
            "useCustomComponent": false,
            "useGriddleStyles": true,
            "toggleCustomComponent": function(){}
        };
    },
    setPageSize: function(event){
        var value = parseInt(event.target.value, 10);
        this.props.setPageSize(value);
    },
    handleChange: function(event){
      var columnName = event.target.dataset ? event.target.dataset.name : event.target.getAttribute('data-name');

      if (event.target.checked === true && includes(this.props.selectedColumns, columnName) === false) {
          this.props.selectedColumns.push(columnName);
          this.props.setColumns(this.props.selectedColumns);
      } else {
        if (this.props.selectedColumns.length > 1) {
          /* redraw with the selected columns minus the one just unchecked */
          this.props.setColumns(without(this.props.selectedColumns, columnName));
        }
      }
    },
    render: function(){
        var that = this;

        var nodes = [];
        //don't show column selector if we're on a custom component
        if (that.props.useCustomComponent === false){
            nodes = this.props.columns.map(function(col, index){
                var checked = includes(that.props.selectedColumns, col);
                //check column metadata -- if this one is locked make it disabled and don't put an onChange event
                var meta  = find(that.props.columnMetadata, {columnName: col});
                var displayName = col;

                if (typeof meta !== "undefined" && typeof meta.displayName !== "undefined" && meta.displayName != null) {
                  displayName = meta.displayName;
                }

                if(typeof meta !== "undefined" && meta != null && meta.locked){
                    return <div className="column"><label className="checkbox"><input type="checkbox" disabled name="check" checked={checked}  data-name={col}/><span></span><span>{displayName}</span></label></div>
                } else if(typeof meta !== "undefined" && meta != null && typeof meta.visible !== "undefined" && meta.visible === false){
                    return null;
                }
                return <div className="griddle-column-selection" key={col} style={that.props.useGriddleStyles ? { "float": "left", width: "20%"} : null }><label className="checkbox"><input type="checkbox" name="check" onChange={that.handleChange} checked={checked} data-name={col}/><span></span><span>{displayName}</span></label></div>
            });
        }

        var toggleCustom = that.props.enableToggleCustom ?
                (<div className="form-group">
                    <label htmlFor="maxRows" className="checkbox"><input type="checkbox" checked={this.props.useCustomComponent} onChange={this.props.toggleCustomComponent} /><span></span><span>{this.props.enableCustomFormatText}</span></label>
                </div>)
                : "";

        var setPageSize = this.props.showSetPageSize ? (<div>
                    <div className="griddle-settings-page-size-title">{this.props.maxRowsText}:</div>
                    <select className="form-control" onChange={this.setPageSize} value={this.props.resultsPerPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
            </div>) : "";


        return (<div className="griddle-settings" style={this.props.useGriddleStyles ? { backgroundColor: "#FFF", border: "1px solid #DDD", color: "#222", padding: "10px", marginBottom: "10px"} : null }>
                <div className="griddle-settings-title">{this.props.settingsText}</div>
                <div className="griddle-columns" style={this.props.useGriddleStyles ? { clear: "both", display: "table", width: "100%", borderBottom: "1px solid #EDEDED", marginBottom: "10px"} : null }>
                    {nodes}
                </div>
                {setPageSize}
                {toggleCustom}
            </div>);
    }
});

module.exports = GridSettings;
