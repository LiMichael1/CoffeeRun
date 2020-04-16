// Data Storage 
(function (window) {
    'use strict'
    var App = window.App || {};   //if window.App object does not exist, App = new custom Object 

    // Object Constructor
    function DataStore() {
        console.log('running the datastore function');
        this.data = {}; //property used to internally store the data
    }

    //Functions for the custom Object 
    DataStore.prototype.add = function (key, val) {     //declared as "obj.add('key', 'value');"
        this.data[key] = val;
    };

    DataStore.prototype.get = function (key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };

    DataStore.prototype.remove = function (key) {
        delete this.data[key];
    };

    App.DataStore = DataStore; //Attach DataStore Object to App 
    window.App = App;   //Attach App properties to windows.App
})(window);     //global namespace