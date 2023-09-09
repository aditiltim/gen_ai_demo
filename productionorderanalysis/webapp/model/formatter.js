sap.ui.define(function() {
    'use strict';
    
    return {
        // formatter for setting date color on realistic generated date
        statusText: function(genDate, delDate){
            var oDelDate = new Date(delDate);
            var oGenDate = new Date(genDate);
            var diffDays = parseInt((oGenDate - oDelDate) / (1000 * 60 * 60 * 24), 10); 
            // var diffDays = oGenDate.getDate() - oDelDate.getDate();
            if(diffDays > 0){
                return "Error";
            } else if(diffDays <= 0){
                return "Success";
            }
        }
    };
});