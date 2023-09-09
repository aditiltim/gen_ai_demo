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
		statusText: function (genDate, delDate ) {
            // debugger      
              var oDelDate = new Date(delDate);
              var oGenDate = new Date(genDate);
              var diffDays = oGenDate.getDate() - oDelDate.getDate(); 
              if(diffDays > 0){
                return "Error";    
              }else{
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
  }
	};


});