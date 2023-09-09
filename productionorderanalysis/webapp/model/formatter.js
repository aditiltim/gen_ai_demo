sap.ui.define(function() {
    'use strict';
    
    return {
        statusText: function(genDate, delDate){
            var oDelDate = new Date(delDate);
            var oGenDate = new Date(genDate);
            var diffDays = oGenDate.getDate() - oDelDate.getDate();
            if(diffDays > 0){
                return "Error";
            } else if(diffDays <= 0){
                return "Success";
            } else{
                return "None";
            }
        },
        statusTextSentiment: function(sentiment){
            if(sentiment>=0 && sentiment<=30){
                return "Success";
            } else if(sentiment>30 && sentiment<=55){
                return "Information";
            } else if(sentiment>55){
                return "Error";
            }
        }
    };
});