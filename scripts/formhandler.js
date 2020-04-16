(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;  //import jQuery and assigning it to $

    function FormHandler(selector) {
        if(!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.lenght === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {  //listen for submit events
        console.log('Setting submit handler for form')

        this.$formElement.on('submit', function(event) {    //similiar to addEventListener
            event.preventDefault();

            //Extracting the data - serializeArray -> jquery method -> get array of objects from form data
            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;                   
                console.log(item.name + ' is ' + item.value);
            });

            console.log(data);
            fn(data);   //pass data object that contains user input to "fn" function 
            this.reset();   //resets the form upon hitting the submit button 
            this.elements[0].focus(); //focus first form element upon reset
        });
    };

    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {     // CHECKS TO SEE IF EMAIL IS CORRECT AND A COMPANY EMAIL 
                event.target.setCustomValidity('');     
            } else {
                message = emailAddress + ' is not an authorized email address';
                event.target.setCustomValidity(message);    //display warning message
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App; 
}) (window);