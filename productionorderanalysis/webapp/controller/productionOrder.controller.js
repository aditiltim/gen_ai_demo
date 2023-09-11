sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "hac2build/productionorderanalysis/model/formatter",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/ObjectStatus",
    "sap/m/VBox",
    "sap/m/Text"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, formatter, Button, Dialog, ObjectStatus, VBox, Text) {
        "use strict";

        return Controller.extend("hac2build.productionorderanalysis.controller.productionOrder", {
            formatter: formatter,
            onInit: function () {
                this.oBusyDialog = new sap.m.BusyDialog();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.onLoadTabData();
            },

            // Loading data into model for table
            onLoadTabData: function () {
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                jQuery.ajax({
                    url: sUrl + "PrdData",
                    type: "GET",
                    async: false,
                    contentType: "application/json",
                    success: function (data) {
                        var tempJSONModel = new sap.ui.model.json.JSONModel();
                        tempJSONModel.setData(data.value);
                        var a = this.getView().setModel(tempJSONModel, "oTableModel");
                    }.bind(this),
                    error: function (e) {
                        // sap.m.MessageBox.error("Unable to fetch the details");
                    }.bind(this)
                });
            },

            //  on Selecting item on table
            onSelectedRow: function (oEvent) {
                var oSelectedItem = this.getView().byId("productionOrderTable").getSelectedItem().getBindingContext("oTableModel").getObject();
                var oRowModel = new sap.ui.model.json.JSONModel();
                oRowModel.setData(oSelectedItem);
                this.getView().setModel(oRowModel, "oRowModel");
            },

            // on press of generate reliastic date
            onAvailabilityCheckPress: function (oEvent) {
                this.oBusyDialog.open();
                var that = this;
                var sPath = this.getView().byId("productionOrderTable").getSelectedItem().getBindingContext("oTableModel").sPath;
                var sContext = this.getView().byId("productionOrderTable").getSelectedItem().getBindingContext("oTableModel");
                var sCustomer = this.getView().getModel("oRowModel").oData.Customer_Name;
                var dDeliveryDate = this.getView().getModel("oRowModel").oData.PO_Delivery_Date;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                var token;
                // fetching x-csrf token 
                $.ajax({
                    url: sUrl,
                    method: "GET",
                    async: true,
                    headers: {
                        "X-CSRF-Token": "FETCH",
                    },
                    success: function (result, xhr, data) {
                        token = data.getResponseHeader("X-CSRF-Token");
                    },
                    error: function (result, xhr, data) {
                        console.log("Error");
                    }
                });

                // payload for getNewsSummaryData API call
                var odata = {
                    "newsData": { "company_name": sCustomer, "delivery_date": dDeliveryDate }
                }

                // API call - getNewsSummaryData
                $.ajax({
                    url: sUrl + "getNewsSummaryData",
                    method: "POST",
                    async: true,
                    headers: {
                        "X-CSRF-Token": token
                    },
                    data: JSON.stringify(odata),
                    contentType: "application/json",
                    success: function (oData) {
                        // setting new date from the API call along with Predicated finish date
                        that.oBusyDialog.close();
                        var dUpdatedDate = oData.updated_delivery_date;
                        var iNegativeSentiment = oData.percentage_negative_news;
                        iNegativeSentiment = iNegativeSentiment.toFixed(2);
                        var predictedFinishDate = new Date(dUpdatedDate);
                        predictedFinishDate.setDate(predictedFinishDate.getDate() + 5);
                        var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
                        var formattedResponseDate = dateFormat.format(new Date(dUpdatedDate));
                        var formattedDeliveryDate = dateFormat.format(new Date(dDeliveryDate));
                        var formattedPredictedDate = dateFormat.format(new Date(predictedFinishDate));
                        if (formattedResponseDate > formattedDeliveryDate) {
                            sContext.getModel("oTableModel").setProperty(sPath + "/GEN_AI_Delivery_Date", formattedResponseDate);
                            sContext.getModel("oTableModel").setProperty(sPath + "/Predicted_Finish_Date", formattedPredictedDate);
                            // sContext.getModel("oTableModel").setProperty(sPath + "/Sentiment", iNegativeSentiment);
                            sContext.getModel("oTableModel").setProperty(sPath + "/Feed", oData.news_summarization);
                        } else {
                            sContext.getModel("oTableModel").setProperty(sPath + "/GEN_AI_Delivery_Date", formattedResponseDate);
                            sContext.getModel("oTableModel").setProperty(sPath + "/Predicted_Finish_Date", formattedPredictedDate);
                        //     // sContext.getModel("oTableModel").setProperty(sPath + "/Sentiment", iNegativeSentiment);
                        //     sContext.getModel("oTableModel").setProperty(sPath + "/Feed", oData.news_summarization);
                        }
                    },
                    error: function (e) {
                        that.oBusyDialog.close();
                        MessageBox.error("Gateway Timeout");
                    }
                })
            },

            // on press of reschedule production order
            onReschedulePress: function () {
                MessageBox.show(
                    "Prodution order has been rescheduled.", {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "Reschedule Production Order",
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function (oAction) { / * do something * / }
                }
                );
            },

            // Opening LLM chatbot window
            onOpenChat: function (oEvent) {
                var oUrl = 'https://llm-chatbot-app-wacky-puku-dt.cfapps.eu10.hana.ondemand.com/';
                var topWidth = screen.height - 490;
                var leftWdth = screen.width - 420;
                window.open(oUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + topWidth + ",left=" + leftWdth + ",width=420,height=490");
            },

            onClickSentiment: function (oEvent) {
                var value, value1, value2, icon, icon1, icon2;
                var sentiment = parseInt(oEvent.getSource().getText());
                if (sentiment >= 0 && sentiment <= 30) {
                    value = "Heavy Traffic";
                    icon = "sap-icon://bus-public-transport";
                    value1 = "Weather Conditions";
                    icon1 = "sap-icon://weather-proofing";
                    value2 = "Failed Delivery Attempts.";
                    icon2 = "sap-icon://shipping-status";
                } else if (sentiment > 30 && sentiment <= 60) {
                    value = "Customs(Import)";
                    icon = "sap-icon://travel-itinerary";
                    value1 = "Geo Political Issues";
                    icon1 = "sap-icon://map-2";
                    value2 = "War Situations";
                    icon2 = "sap-icon://globe";
                } else if (sentiment > 60 && sentiment <= 100) {
                    value = "Delay from Supplier";
                    icon = "sap-icon://supplier";
                    value1 = "Financial Crisis"
                    icon1 = "sap-icon://loan";
                    value2 = "Delay in Production Supply";
                    icon2 = "sap-icon://machine";
                }
                var oDialog = new Dialog({
                    title: "Reason for delay",
                    content: [
                        new VBox({
                            items: [
                                new ObjectStatus({ "active": false, text: value, icon: icon }).addStyleClass("spaceBelow"),
                                new ObjectStatus({ "active": false, text: value1, icon: icon1 }).addStyleClass("spaceBelow"),
                                new ObjectStatus({ "active": false, text: value2, icon: icon2 }).addStyleClass("spaceBelow")
                            ],
                            alignItems: "Start"
                        }).addStyleClass("spaceALL")
                    ],
                    beginButton: new Button({
                        text: "Close",
                        press: function () {
                            oDialog.close();
                        }
                    })
                });
                oDialog.open();
            },

            onClickInsights: function (oEvent) {
                var value = oEvent.oSource.mBindingInfos.visible.binding.aValues;
                var oDialog = new Dialog({
                    title: "Order Insights provided by GEN AI",
                    content: [
                        new VBox({
                            // class:"sapUiResponsiveContentPadding",
                            items: [
                                new Text({ text: value }),
                            ],
                            alignItems: "Start",
                        }).addStyleClass("spaceALL")
                    ],
                    beginButton: new Button({
                        text: "Close",
                        press: function () {
                            oDialog.close();
                        }

                    })

                });
                oDialog.open();
            }
        });
    });
