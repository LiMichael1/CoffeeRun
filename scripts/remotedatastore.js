(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function RemoteDataStore() {

        this.database = firebase.database();
    }

    RemoteDataStore.prototype.add = function (key, val) {
        // $.post(this.serverUrl, val, function (serverResponse) { //who to talk to , what to say, what to do with information when it gets back to you
        //     console.log(serverResponse);
        // });
        key = key.replace('.', ',')
        console.log(key);
        this.database.ref(key).set(val, function (error) {
            if(error) {
                console.log('Error: ' + error);
            } else {
                console.log('Firebase Database Entry Successful!');
            }
        });
    };

    RemoteDataStore.prototype.getAll = function (cb) {
        // $.get(this.serverUrl, function (serverResponse) {
        //     console.log(serverResponse);
        //     cb(serverResponse);
        // });
        var db = this.database.ref();
        db.on('value', function (snapshot) {
            var orders = {}
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                orders[childKey] = childData;
            });

            console.log(orders);
            cb(orders);
        });
    };

    RemoteDataStore.prototype.get = function (key, cb) {
        // $.get(this.serverUrl + '/' + key, function (serverResponse) {
        //     console.log(serverResponse);
        //     cb(serverResponse);
        // });
        val = this.database.ref(key);
        console.log(val);
        cb(val);
    };

    RemoteDataStore.prototype.remove = function (key) {
        // $.ajax(this.serverUrl + '/' + key, {
        //     type: 'DELETE'
        // });
        key = key.replace('.', ',');
        var db_element = this.database.ref(key);
        db_element.remove();
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App; 

}) (window);