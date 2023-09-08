sap.ui.define(function () {
    'use strict';
    var Formatter = {
        formatDateFn: function (status) {
            if (status === 'Normal') {
                return 'Success';
            } else if (status === 'Error') {
                return 'Error';
            }
        }

    }
    return Formatter;


});