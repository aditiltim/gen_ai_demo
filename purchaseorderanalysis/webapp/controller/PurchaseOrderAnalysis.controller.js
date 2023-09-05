sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("hac2build.purchaseorderanalysis.controller.PurchaseOrderAnalysis", {
            onInit: function () {
                var sServiceUrl1 = this.getOwnerComponent().getModel("cdsModel").sServiceUrl; 
			    $.ajax({
				context: this,
				type: "GET",
				url: sServiceUrl1 + "/purchaseOrder",
				dataType: "json",
				contentType: 'application/json; charset=utf-8',
				success: function (data) {
					console.log(data.value);
                    // this.getView().setModel(sServiceUrl1, "AlertsModel");
				},
				error: function (error) {
				},
			});
            }
        });
    });
