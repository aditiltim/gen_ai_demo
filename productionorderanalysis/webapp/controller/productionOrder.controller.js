sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox) {
        "use strict";

        return Controller.extend("hac2build.productionorderanalysis.controller.productionOrder", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            },
 
            onAvailabilityCheckPress: function (oEvent) {
                var that = this;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var token;
                $.ajax({
                    url: sUrl,
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "FETCH",
                    },
                    success: function(result, xhr, data){
                        token = data.getResponseHeader("X-CSRF-Token");
                    },
                    error: function(result, xhr, data){
                        console.log("Error");
                    }
                });

                var odata = {
                    "newsData": {"company_name": "1000200", "delivery_date": "2023-09-05"}
                }

                $.ajax({
                    url: sUrl + "getNewsSummaryData",
                    method: "POST",
                    async: false,
                    headers: {
                        "X-CSRF-Token": token
                    },
                    data: JSON.stringify(odata),
                    contentType: "application/json",
                    success: function(oData){
                        if(oData.value){
                            MessageBox.success("Success");
                            console.log(oData.value);
                        }
                    },
                    error: function(e){
                        MessageBox.error(e);
                    } 
                })
            }
        });
    });
