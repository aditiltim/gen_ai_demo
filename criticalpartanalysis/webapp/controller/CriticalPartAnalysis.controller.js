sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
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
            onPress : function(oEvent) {
                this._fnGetService = sap.ushell && 
                sap.ushell.Container &&
                sap.ushell.Container.getService; 
                this._oCrossAppNavigation = this._fnGetService &&
                this._fnGetService("CrossApplicationNavigation");
            
                this._hash = (this._oCrossAppNavigation&&
                this._oCrossAppNavigation.hrefForExternal({ 
            
                target : {
                semanticObject : "salesorder", 
                action: "display" 
                },
                
                })) || "";
                if(this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({ 
                    target : {
                    shellHash : this._hash 
                    } 
                    }) 
                }
               },
            goToSalesApp : function(oEvent) {
                this._fnGetService = sap.ushell && 
                sap.ushell.Container &&
                sap.ushell.Container.getService; 
                this._oCrossAppNavigation = this._fnGetService &&
                this._fnGetService("CrossApplicationNavigation");
            
                this._hash = (this._oCrossAppNavigation&&
                this._oCrossAppNavigation.hrefForExternal({ 
            
                target : {
                semanticObject : "salesorder", 
                action: "display" 
                },
                
                })) || "";
                if(this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({ 
                    target : {
                    shellHash : this._hash 
                    } 
                    }) 
                }
               },
            goToPOApp : function(oEvent) {
                this._fnGetService = sap.ushell && 
                sap.ushell.Container &&
                sap.ushell.Container.getService; 
                this._oCrossAppNavigation = this._fnGetService &&
                this._fnGetService("CrossApplicationNavigation");
            
                this._hash = (this._oCrossAppNavigation&&
                this._oCrossAppNavigation.hrefForExternal({ 
            
                target : {
                    semanticObject : "purchaseorder", 
                    action: "display"
                },
                
                })) || "";
                if(this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({ 
                    target : {
                    shellHash : this._hash 
                    } 
                    }) 
                }
               },
            goToAlertsApp : function(oEvent) {
                this._fnGetService = sap.ushell && 
                sap.ushell.Container &&
                sap.ushell.Container.getService; 
                this._oCrossAppNavigation = this._fnGetService &&
                this._fnGetService("CrossApplicationNavigation");
            
                this._hash = (this._oCrossAppNavigation&&
                this._oCrossAppNavigation.hrefForExternal({ 
            
                target : {
                semanticObject : "alerttable", 
                action: "display" 
                },
                
                })) || "";
                if(this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({ 
                    target : {
                    shellHash : this._hash 
                    } 
                    }) 
                }
               },
            goToProdOApp : function(oEvent) {
                this._fnGetService = sap.ushell && 
                sap.ushell.Container &&
                sap.ushell.Container.getService; 
                this._oCrossAppNavigation = this._fnGetService &&
                this._fnGetService("CrossApplicationNavigation");
            
                this._hash = (this._oCrossAppNavigation&&
                this._oCrossAppNavigation.hrefForExternal({ 
            
                target : {
                semanticObject : "purchaseorder", 
                action: "display" 
                },
                
                })) || "";
                if(this._oCrossAppNavigation) {
                    var oHref = this._oCrossAppNavigation.toExternal({ 
                    target : {
                    shellHash : this._hash 
                    } 
                    }) 
                }
               },

        });
    });