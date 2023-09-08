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
            debugger      
              var oDelDate = new Date(delDate);
              var oGenDate = new Date(genDate);
              var diffDays = oGenDate.getDate() - oDelDate.getDate(); 
              if(diffDays > 0){
                return "Error";    
              }else if(diffDays < 0){
                return "Success";           
              }else{
                return "None";
              }
		}
	};


});