// Communicates with Data Storage
(function (window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId; //unique identifier for the Truck 
        this.db = db;  //DataStore instance
    }

    Truck.prototype.createOrder = function (order) {      //order =  a python-like dictionary to be stored 
        console.log('Adding order for ' + order.emailAddress);  
        // order identified by the email address
        this.db.add(order.emailAddress, order);   //(Customer Email = key, Order = Value) in the DataStore instance 
    };

    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);  //customerId should be the email address
        this.db.remove(customerId);     //removes order from datastore after it is delivered to customer
    };

    Truck.prototype.printOrders = function () {
        //Gets all the keys from the datastore and stores in into an array object
        var customerIdArray = Object.keys(this.db.getAll()); //emails only

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (Id){  //for each email address/ pending orders in the truck 
            console.log(this.db.get(Id));       //print out the orders 
        }.bind(this));  // CallBack has no owners, so bind it to the Truck instance
    };

    App.Truck = Truck; 
    window.App = App;
}) (window);