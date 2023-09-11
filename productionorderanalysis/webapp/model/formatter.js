sap.ui.define(function () {
  'use strict';

  return {
    // formatter for setting date color on realistic generated date
    statusText: function (genDate, delDate) {
      var oDelDate = new Date(delDate);
      var oGenDate = new Date(genDate);
      var diffDays = parseInt((oGenDate - oDelDate) / (1000 * 60 * 60 * 24), 10);
      // var diffDays = oGenDate.getDate() - oDelDate.getDate();
      if (diffDays > 0) {
        return "Error";
      } else if (diffDays <= 0) {
        return "Success";
      }
    },

    statusTextSentiment: function (sentiment) {
      if (sentiment >= 0 && sentiment <= 30) {
        return "Success";
      } else if (sentiment > 30 && sentiment <= 55) {
        return "Information";
      } else if (sentiment > 55) {
        return "Error";
      }
    },

    feedCheck: function (feedInp, genDate, currDate) {
      var oDelDate = new Date(currDate);
      var oGenDate = new Date(genDate);
      var diffDays = parseInt((oGenDate - oDelDate) / (1000 * 60 * 60 * 24), 10);
      if (feedInp !== null && diffDays > 0) {
        return true;
      } else {
        return false;
      }
    }
  };
});