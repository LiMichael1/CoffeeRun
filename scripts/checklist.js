
(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function CheckList(selector) {
        if(!selector){
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.lenght === 0) {
            throw new Error('Could not find element with selector ' + selector);
        }
    }

    // listens to clicks and bind callback to CheckList instance
    CheckList.prototype.addClickHandler = function (fn) { 
        this.$element.on('click', 'input', function(event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    CheckList.prototype.addRow = function (coffeeOrder) {
        // Remove any existing rows that match the email address
        this.removeRow(coffeeOrder.emailAddress);

        //Create new instance of a row, using the coffee order info
        var rowElement = new Row(coffeeOrder);
        //Add the new row's instance's $element property to the checklist
        this.$element.append(rowElement.$element);
    };

    CheckList.prototype.removeRow = function (email) {
        this.$element   
            .find('[value="' + email + '"]')              //find email
            .closest('[data-coffee-order="checkbox"]')    // in the checklist
            .remove()                                     //remove it 
    };

    //in charge of creating all DOM elements to represent a single coffee order 
    function Row(coffeeOrder) {     //use Jquery to build DOM elements
        //create html elements one at a time and place element inside a DOM subtree
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        // formating the text
        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]'; 

        $label.append($checkbox);   //add checkbox inside the label tag
        $label.append(description); //add description inside label tag
        $div.append($label);        //add label inside div tag

        this.$element = $div;   //subtree available as property of Row instance
    }


    App.CheckList = CheckList;
    window.App = App; 
}) (window);