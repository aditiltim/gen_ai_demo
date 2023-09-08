sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("hac2build.criticalpartanalysis.controller.CriticalPartAnalysis", {
            onInit: function () {


                this.salesOrderGraph();
                this.purchaseOrderGraph();
                this.productionOrderGraph();
                
                  
                // this._fnGetService = sap.ushell && 
                // sap.ushell.Container &&
                // sap.ushell.Container.getService; 
                // this._oCrossAppNavigation = this._fnGetService &&
                // this._fnGetService("CrossApplicationNavigation");

                // this._hash = (this._oCrossAppNavigation&&
                // this._oCrossAppNavigation.hrefForExternal({ 

                // target : {
                // semanticObject : "salesorder", 
                // action: "display" 
                // },



                // })) || "";

            },
           
            SalesOrgValueHelpProject: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue();

                this.inputId = oEvent.getSource().getId();
                // create value help dialog
                if (!this.Salesorg) {
                    this.Salesorg = sap.ui.xmlfragment(
                        this.getView().getId(),
                        "hac2build.criticalpartanalysis.view.fragments.SalesOrganization",
                        this
                    );
                    this.getView().addDependent(this.Salesorg);
                }
                // this.deleteDuplicateRecords();
                this.Salesorg.open();
               
              


            },
            // deleteDuplicateRecords : function(oEvent){

            //     var oTable = this.getView().byId("salesOrg");
            //     var aSelectedItems = oTable.getAggregation("items");
            //     for (var i = 0; i < aSelectedItems.length; i++) {
            //         var sItem = aSelectedItems[0].mAggregations.cells[0].mProperties.text;
            //         if (i > 0) {


            //             if (sItem == aSelectedItems[i].mAggregations.cells[0].mProperties.text) {
            //                 oTable.removeItem(aSelectedItems[i])
            //             }
            //         }
            // }

            // },
            CustomerValueHelp: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue();
                this.inputId = oEvent.getSource().getId();
                // create value help dialog
                if (!this.cust) {
                    this.cust = sap.ui.xmlfragment(
                        "hac2build.criticalpartanalysis.view.fragments.Customers",
                        this
                    );
                    this.getView().addDependent(this.cust);
                }
                this.cust.open();

            },
           
            salesOrderGraph: function (oEvent) {
                var that = this;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                this.salesOrderArr = [];
                $.ajax({
                    url: sUrl + "SODataView?$apply=groupby((Sales_Order,Status),aggregate($count as SalesOrderCount))",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (data) {
                        for (var i = 0; i < data.value.length; i++) {
                            var obj = {
                                SalesOrderCount: data.value[i].SalesOrderCount,
                                Sales_Order: data.value[i].Sales_Order,
                                Status: data.value[i].Status

                            }
                            that.salesOrderArr.push(obj);

                        }
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(that.salesOrderArr);
                        that.getOwnerComponent().setModel(oModel, "appModel");




                    },
                    error: function (response) {
                        MessageBox.error(response.responseText);

                    }
                });
            },

            purchaseOrderGraph: function (oEvent) {
                var that = this;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                this.purchaseOrderArr = [];
                $.ajax({
                    url: sUrl + "PODataView?$apply=groupby((PO,Status),aggregate($count as SalesOrderCount))",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (data) {
                        for (var i = 0; i < data.value.length; i++) {
                            var obj = {
                                PurchaseOrder  : data.value[i].PO,
                                PurchaseOrderCount: data.value[i].SalesOrderCount,
                                Status: data.value[i].Status

                            }
                            that.purchaseOrderArr.push(obj);
                           

                        }
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(that.purchaseOrderArr);
                        that.getOwnerComponent().setModel(oModel, "poModel");




                    },
                    error: function (response) {
                        MessageBox.error(response.responseText);

                    }
                });
            },
            productionOrderGraph: function (oEvent) {
                var that = this;
                var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
                this.purchaseOrderArr = [];
                $.ajax({
                    url: sUrl + "PODataView?$apply=groupby((PO,Status),aggregate($count as SalesOrderCount))",
                    method: "GET",
                    async: false,
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (data) {
                        for (var i = 0; i < data.value.length; i++) {
                            var obj = {
                                ProductionOrder  : data.value[i].PO,
                                ProdductionOrderCount: data.value[i].SalesOrderCount,
                                Status: data.value[i].Status

                            }
                            that.purchaseOrderArr.push(obj);
                           

                        }
                        var oModel = new sap.ui.model.json.JSONModel();
                        oModel.setData(that.purchaseOrderArr);
                        that.getOwnerComponent().setModel(oModel, "productionModel");




                    },
                    error: function (response) {
                        MessageBox.error(response.responseText);

                    }
                });
            },
            SuppliersValueHelp: function (oEvent) {
                var sInputValue = oEvent.getSource().getValue();
                this.inputId = oEvent.getSource().getId();
                // create value help dialog
                if (!this.suppliers) {
                    this.suppliers = sap.ui.xmlfragment(
                        "hac2build.criticalpartanalysis.view.fragments.Supplier",
                        this
                    );
                    this.getView().addDependent(this.suppliers);
                }
                this.suppliers.open();

            },
            onSalesorgCancel: function () {
                this.Salesorg.close();
            },
            onCustomerCancel: function () {
                this.cust.close();
            },
            onSupplierCancel: function () {
                this.suppliers.close();
            },
            // handleSearch: function (oEvent) {
            //     var query = this.getView().byId("input11").getValue();
            //     if (query == "" || query == undefined || query == null) {
            //         this.getView().byId("_IDGenText1").setVisible(true);
            //         this.getView().byId("_IDGenText2").setVisible(true);
            //         this.getView().byId("_IDGenText3").setVisible(true);

            //     }
            //     if (query === this.getView().byId("_IDGenText1").getText().split('  :')[0]) {
            //         this.getView().byId("_IDGenText1").setVisible(true);
            //         this.getView().byId("_IDGenText2").setVisible(false);
            //         this.getView().byId("_IDGenText3").setVisible(false);


            //     }
            //     // else{
            //     //     this.getView().byId("_IDGenText2").setVisible(false);
            //     //     this.getView().byId("_IDGenText3").setVisible(false);
            //     // }


            // },
            OnSalesOrgProjSelect: function (oEvent) {

                var ProjId = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Sales_Orgnisation;
                this.Sales_Orgnisation = ProjId;
                this.getView().byId("input11").setValue(this.Sales_Orgnisation);
                this.Salesorg.close();
            },
            OnCustomerNoSelect: function (oEvent) {
                var ProjId = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Customer_No;
                this.Customer_No = ProjId;
                this.getView().byId("input12").setValue(this.Customer_No);
                this.cust.close();
            },
            OnSupplierSelect: function (oEvent) {
                var ProjId = oEvent.getSource().getSelectedItem().getBindingContext().getObject().Supplier;
                this.Supplier = ProjId;
                this.getView().byId("input13").setValue(this.Supplier);
                this.suppliers.close();

            },
            onClickSalesOrder: function (oEvent) {
                this._fnGetService = sap.ushell &&
                    sap.ushell.Container &&
                    sap.ushell.Container.getService;
                this._oCrossAppNavigation = this._fnGetService &&
                    this._fnGetService("CrossApplicationNavigation");

                this._hash = (this._oCrossAppNavigation &&
                    this._oCrossAppNavigation.hrefForExternal({

                        target: {
                            semanticObject: "salesorder",
                            action: "display"
                        },

                    })) || "";
                if (this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({
                        target: {
                            shellHash: this._hash
                        }
                    })
                }

            },
            onClickPurchaseOrder: function (oEvent) {
                this._fnGetService = sap.ushell &&
                    sap.ushell.Container &&
                    sap.ushell.Container.getService;
                this._oCrossAppNavigation = this._fnGetService &&
                    this._fnGetService("CrossApplicationNavigation");

                this._hash = (this._oCrossAppNavigation &&
                    this._oCrossAppNavigation.hrefForExternal({

                        target: {
                            semanticObject: "purchaseorder",
                            action: "display"
                        },

                    })) || "";
                if (this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({
                        target: {
                            shellHash: this._hash
                        }
                    })
                }

            },
            onClickProductionOrder: function (oEvent) {
                this._fnGetService = sap.ushell &&
                    sap.ushell.Container &&
                    sap.ushell.Container.getService;
                this._oCrossAppNavigation = this._fnGetService &&
                    this._fnGetService("CrossApplicationNavigation");

                this._hash = (this._oCrossAppNavigation &&
                    this._oCrossAppNavigation.hrefForExternal({

                        target: {
                            semanticObject: "productionorder",
                            action: "display"
                        },

                    })) || "";
                if (this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({
                        target: {
                            shellHash: this._hash
                        }
                    })
                }

            },
            onPress: function (oEvent) {
                this._fnGetService = sap.ushell &&
                    sap.ushell.Container &&
                    sap.ushell.Container.getService;
                this._oCrossAppNavigation = this._fnGetService &&
                    this._fnGetService("CrossApplicationNavigation");

                this._hash = (this._oCrossAppNavigation &&
                    this._oCrossAppNavigation.hrefForExternal({

                        target: {
                            semanticObject: "salesorder",
                            action: "display"
                        },

                    })) || "";
                if (this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({
                        target: {
                            shellHash: this._hash
                        }
                    })
                }
            },
            goToSalesApp: function (oEvent) {

                this.getView().byId("_IDGenVerticalLayout3").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout4").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout2").setVisible(true);
                var jsonData = new sap.ui.model.json.JSONModel("model/Data.json");
                var oVizFrame1 = this.getView().byId("idVizFrame1");
                oVizFrame1.setModel(jsonData);
                // oVizFrame1.setVizProperties({
                //     plotArea: {

                //         }});


            },
            hideSalesorderchart: function () {
                this.getView().byId("_IDGenVerticalLayout2").setVisible(false);
            },
            hidePurchasechart: function () {
                this.getView().byId("_IDGenVerticalLayout3").setVisible(false);
            },
            hideProductionchart: function () {
                this.getView().byId("_IDGenVerticalLayout4").setVisible(false);
            },
            goToPOApp: function (oEvent) {
                this.getView().byId("_IDGenVerticalLayout2").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout4").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout3").setVisible(true);
                var jsonData = new sap.ui.model.json.JSONModel("model/Data.json");
                var oVizFrame1 = this.getView().byId("idVizFrame2");
                oVizFrame1.setModel(jsonData);

            },
            goToAlertsApp: function (oEvent) {
                this._fnGetService = sap.ushell &&
                    sap.ushell.Container &&
                    sap.ushell.Container.getService;
                this._oCrossAppNavigation = this._fnGetService &&
                    this._fnGetService("CrossApplicationNavigation");

                this._hash = (this._oCrossAppNavigation &&
                    this._oCrossAppNavigation.hrefForExternal({

                        target: {
                            semanticObject: "alerttable",
                            action: "display"
                        },

                    })) || "";
                if (this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({
                        target: {
                            shellHash: this._hash
                        }
                    })
                }
            },
            goToProdOApp: function (oEvent) {
                this.getView().byId("_IDGenVerticalLayout2").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout3").setVisible(false);
                this.getView().byId("_IDGenVerticalLayout4").setVisible(true);
                var jsonData = new sap.ui.model.json.JSONModel("model/Data.json");
                var oVizFrame3 = this.getView().byId("idVizFrame3");
                oVizFrame3.setModel(jsonData);


            },

        });
    });