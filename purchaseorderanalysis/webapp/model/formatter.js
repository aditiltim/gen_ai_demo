sap.ui.define(function () {
    'use strict';
    // var Formatter = {
    //     formatDateFn: function (status) {
    //         if (status === 'Normal') {
    //             return 'Success';
    //         } else if (status === 'Error') {
    //             return 'Error';
    //         }
    //     }

    // }
    // return Formatter;
    return {
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
    },
    statusTextSentiment: function(sentiment){
      if(sentiment>=0 && sentiment<=30){
          return "Success";
      } else if(sentiment>30 && sentiment<=55){
          return "Information";
      } else if(sentiment>55){
          return "Error";
      }
  },
  getIcon :  function() {
    var strIcon;
    if(value<30)
      strIcon = "sap-icon://basket"
    else if(value>30 && value<50)
      strIcon = "sap-icon://badge"
    else
      strIcon = "sap-icon://badge"
    return strIcon;
  }
	};


});