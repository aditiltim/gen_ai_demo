sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/Fragment',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("hac2build.criticalpartanalysis.controller.CriticalPartAnalysis", {
            onInit: function () {
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
                        "hac2build.criticalpartanalysis.view.fragments.SalesOrganization",
                        this
                    );
                    this.getView().addDependent(this.Salesorg);
                }
                this.Salesorg.open();


            },
            CustomerValueHelp: function (oEvent){
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
            SuppliersValueHelp: function(oEvent){
                var sInputValue = oEvent.getSource().getValue();
                this.inputId = oEvent.getSource().getId();
                // create value help dialog
                if (!this.Supplier) {
                    this.Supplier = sap.ui.xmlfragment(
                        "hac2build.criticalpartanalysis.view.fragments.Supplier",
                        this
                    );
                    this.getView().addDependent(this.Supplier);
                }
                this.Supplier.open();

            },
            onSalesorgCancel: function(){
                this.Salesorg.close();
            },
            onCustomerCancel: function(){
                this.cust.close();
            },
            onSupplierCancel: function(){
                this.Supplier.close();
            },
            handleSearch: function(oEvent){
                var query = this.getView().byId("input11").getValue();
                if(query == "" || query == undefined || query == null){
                    this.getView().byId("_IDGenText1").setVisible(true);
                    this.getView().byId("_IDGenText2").setVisible(true);
                    this.getView().byId("_IDGenText3").setVisible(true);

                }
                if(query ===this.getView().byId("_IDGenText1").getText().split('  :')[0]){
                    this.getView().byId("_IDGenText1").setVisible(true);
                    this.getView().byId("_IDGenText2").setVisible(false);
                    this.getView().byId("_IDGenText3").setVisible(false);


                }
                // else{
                //     this.getView().byId("_IDGenText2").setVisible(false);
                //     this.getView().byId("_IDGenText3").setVisible(false);
                // }


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

                this.getView().byId("_IDGenVerticalLayout2").setVisible(true);
                var jsonData = new sap.ui.model.json.JSONModel("model/Data.json");
                var oVizFrame1 = this.getView().byId("idVizFrame1");
                oVizFrame1.setModel(jsonData);
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
            visible : function(){
                this.getView().byId("_IDGenVerticalLayout2").setVisible(false);
            },
            goToPOApp: function (oEvent) {
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

        });
    });