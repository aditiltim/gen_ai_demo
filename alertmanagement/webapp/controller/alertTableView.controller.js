sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("hac2build.alertmanagement.controller.alertTableView", {
            onInit: function () {
            //     var sServiceUrl1 = this.getOwnerComponent().getModel("cdsModel").sServiceUrl; 
			//     $.ajax({
			// 	context: this,
			// 	type: "GET",
			// 	url: sServiceUrl1 + "/alerts",
			// 	dataType: "json",
			// 	contentType: 'application/json; charset=utf-8',
			// 	success: function (data) {
			// 		console.log(data.value);
            //         // this.getView().setModel(sServiceUrl1, "AlertsModel");
            //         this.getView().setModel(new sap.ui.model.json.JSONModel({
            //             "results": data
            //         }), "items");
			// 	},
			// 	error: function (error) {
			// 	},
			// });
            }
        });
    });
