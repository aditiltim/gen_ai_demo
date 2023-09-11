sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "hac2build/purchaseorderanalysis/model/formatter",
    "sap/m/Button",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/ObjectStatus",
    "sap/m/ToolbarSpacer",
    "sap/m/VBox",
    "sap/m/BusyDialog"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox,formatter,Button, Dialog, Text, ObjectStatus, ToolbarSpacer, VBox,BusyDialog) {
        "use strict";

        return Controller.extend("hac2build.purchaseorderanalysis.controller.PurchaseOrderAnalysis", {
          formatter: formatter,  
          onInit: function () {
                this.oBusyDialog = new sap.m.BusyDialog({});
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                this.onLoadTabData();
			},
      onLoadTabData: function () {
        var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        jQuery.ajax({
          url: sUrl + "POData",
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
      onSelectedRow: function (oEvent) {
        var oSelectedItem = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel").getObject();
        var oRowModel = new sap.ui.model.json.JSONModel();
        oRowModel.setData(oSelectedItem);
        this.getView().setModel(oRowModel, "oRowModel");
      },
      onLocalAI: function(oEvent){
        this.oBusyDialog.open();
        var sPath = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel").sPath;
        var sContext = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel")
        var Supplier = this.getView().getModel("oRowModel").oData.Supplier;
        var Material = this.getView().getModel("oRowModel").oData.Material;
        var Plant = this.getView().getModel("oRowModel").oData.Plant;
        // debugger
        // var Po_qty = this.getView().getModel("oRowModel").oData.Quantity;
        var Po_qty = JSON.stringify(this.getView().getModel("oRowModel").oData.Quantity);
        var Po_delivery_date = this.getView().getModel("oRowModel").oData.Delivery_date;
        var Po_item = JSON.stringify(this.getView().getModel("oRowModel").oData.PO_Item);
        var that = this;
        var sUrl = that.getOwnerComponent().getModel("cdsModel").sServiceUrl;
        var token;
        $.ajax({
          url: sUrl,
          method: "GET",
          async: true,
          headers: {
            "X-CSRF-Token": "Fetch",
          },
          success: function (result, xhr, data) {
            token = data.getResponseHeader("X-CSRF-Token");
          },
          error: function (result, xhr, data) {
            console.log("Error");
          },
        });
        var urlext = "getPredictedData";
        var payload = {
          "excelData": [{
            "Supplier": Supplier,
            "Material": Material,
            "Plant": Plant,
            "Po_qty": Po_qty,
            "Po_delivery_date": Po_delivery_date,
            "Po_item": Po_item
          }]
        }
        jQuery.ajax({
          url: sUrl + urlext,
          type: "POST",
          async: true,
          headers: {
            "X-CSRF-Token": token,
          },
          data: JSON.stringify(payload),
          contentType: "application/json",
          success: function (oData) {
            that.oBusyDialog.close();
                    // var that = this;
                    debugger
                    console.log(oData)
                    // console.log(formattedRespDate);
                    var predicted_receipt_date = oData.value[0].predicted_receipt_date;
                    var oResponseDate = new Date(predicted_receipt_date);
                    var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd"});
                    var formattedPredictedReceiptDate= dateFormat.format(oResponseDate);
                    console.log(formattedPredictedReceiptDate)
                    sContext.getModel("oTableModel").setProperty(sPath +"/Local_AI_Delivery_Date", formattedPredictedReceiptDate);
                    // sap.m.MessageBox.success("Success");
                    // sap.ui.getCore().byId("idTablelist").getBinding("items").refresh();
                    console.log(oData.value)
                    

          
          },
            error: function (e) {
              that.oBusyDialog.close();
              MessageBox.error("Request Timeout");
            },
          });
        },
      onAvailablePress: function (oEvent) {
            debugger
              this.oBusyDialog.open();
              var sPath = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel").sPath;
              var sContext = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel")
              var customer = this.getView().getModel("oRowModel").oData.Supplier_Name;
              var del_date = this.getView().getModel("oRowModel").oData.Delivery_date;
              var that = this;
              var oGenModel = new sap.ui.model.json.JSONModel();
              var sUrl = this.getOwnerComponent().getModel("cdsModel").sServiceUrl;
              var token;
              $.ajax({
                url: sUrl,
                method: "GET",
                async: false,
                headers: {
                  "X-CSRF-Token": "Fetch"
                },
                success: function (result, xhr, data) {
                  token = data.getResponseHeader("X-CSRF-Token");
                },
                error: function (result, xhr, data) {
                  console.log("Error");
                },
              });
              var urlext = "getNewsSummaryData";
              var payload = {
                "newsData": {
                  "company_name": customer,
                  "delivery_date": del_date
                }
              }
              jQuery.ajax({
                url: sUrl + urlext,
                type: "POST",
                async: true,
                headers: {
                  "X-CSRF-Token": token
                },
                data: JSON.stringify(payload),
                contentType: "application/json",
                // success: function (oData) {
                //   var that = this;
                //     sap.m.MessageBox.success("Success");
                //     console.log(oData)
                //     sContext.getModel("oTableModel").setProperty(sPath +"/GEN_AI_Delivery_Date", oData.updated_delivery_date);
                //     sap.ui.getCore().byId("idTablelist").getBinding("items").refresh();
                //     console.log(oData.value);
                //     //that.downloadExcel(oData.value);
                  
                // },
                success: function (oData) {
                  that.oBusyDialog.close();
                  // MessageBox.success("Success");
                  oGenModel.setData(oData);
                  that.getView().setModel(oGenModel, "oGenModel");
                  var updatedDate = oData.updated_delivery_date;
                  var oResponseDate = new Date(updatedDate);
                  var deliveryDate = new Date(del_date);
                  var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" });
                  var formattedRespDate = dateFormat.format(oResponseDate);
                  var formattedDelDate = dateFormat.format(deliveryDate);
                  // var calcDiffDate = new Date(updatedDate);
                  if (formattedRespDate > formattedDelDate) {
                    //that.getView().byId("_IDGenObjectStatus1").setState("Error");
                    sContext.getModel("oTableModel").setProperty(sPath + "/GEN_AI_Delivery_Date", formattedRespDate);
                    sContext.getModel("oTableModel").setProperty(sPath + "/Sentiment", oData.percentage_negative_news);
                    sContext.getModel("oTableModel").setProperty(sPath + "/Feed", oData.news_summarization);
                    console.log("updatedDate is greater");
                  }
                  else{
                    sContext.getModel("oTableModel").setProperty(sPath + "/GEN_AI_Delivery_Date", formattedRespDate);
                    sContext.getModel("oTableModel").setProperty(sPath + "/Sentiment", oData.percentage_negative_news);
                    // sContext.getModel("oTableModel").setProperty(sPath + "/Feed", oData.news_summarization);
                    console.log("updatedDate is less than or equal to ");
                  }
                  var negSentiment = oData.percentage_negative_news;
      
      
                  // sContext.getModel("oTableModel").setProperty(sPath +"/GEN_AI_Delivery_Date", negSentiment);
                  // this.getView().byId("idTablelist").getBinding("items").refresh();
                  console.log(oData.value);
      
                },
                
                error: function (e) {
                  that.oBusyDialog.close();
                  MessageBox.error("Request Timeout");
                },
              });
      
              // var settings = {
              //   "url": "https://13.127.183.113:8007/send_news_summary",
              //   "method": "POST",
              //   "timeout": 0,
              //   "headers": {
              //     "Content-Type": "application/json"
              //   },
              //   "data": JSON.stringify({
              //     "company_name": sold_To,
              //     "delivery_date": del_date
              //   }),
              // };
      
              // $.ajax(settings).done(function (response) {
              //   console.log(response);
              // });
        },
      // onEmailPress: function (odata) {
      //         var that = this;
      //         var sUrl = this.getOwnerComponent().getModel("cdsModel").sServiceUrl;
      //         var token;
      //         $.ajax({
      //           url: sUrl,
      //           method: "GET",
      //           async: false,
      //           headers: {
      //             "X-CSRF-Token": "Fetch",
      //           },
      //           success: function (result, xhr, data) {
      //             token = data.getResponseHeader("X-CSRF-Token");
      //           },
      //           error: function (result, xhr, data) {
      //             console.log("Error");
      
      //           },
      
      //         });
      
      //         var urlext = "getEmailData";
      //         var payload = {
      //           "emailData": {
      //             "llm_summary": "Stock Performance: The paragraph mentions that Zomato's stock price settled higher on Monday but has declined significantly on a year-to-date (YTD) basis. This suggests a downward trend in the stock's value, which is generally viewed negatively by investors. Losses: Zomato's net loss for the quarter ending in December (Q3 FY23) widened significantly compared to the previous year and the previous quarter. This indicates financial challenges for the company and is typically viewed negatively.",
      //             "order_id": "ORD001",
      //             "customer_name": "Akash Dawari",
      //             "delivery_date": "12-10-2023",
      //             "item_id": "[item1, item2, item3]"
      //           }
      //         }
      //         jQuery.ajax({
      //           url: sUrl + urlext,
      //           type: "POST",
      //           async: false,
      //           headers: {
      //             "X-CSRF-Token": token,
      //           },
      //           data: JSON.stringify(payload),
      //           contentType: "application/json",
      //           success: function (oData) {
      //             if (oData.value) {
      //               MessageBox.success("Success");
      //               console.log(oData.value);
      //               that.downloadExcel(oData.value);
      //             }
      //           },
        //         error: function (e) {
        //           MessageBox.error("Please add proper data");
        //         },
        //       });
        // }
        onOpenPopoverDialog: function () {
          if (!this._oNewDialog) {
            this._oNewDialog = sap.ui.xmlfragment("hac2build.purchaseorderanalysis.fragments.newDialog", this);
            this.getView().addDependent(this._oNewDialog);
          }
          this._oNewDialog.open();
        },
        onNewDialogCancel: function () {
          this._oNewDialog.close();
        },
        onEmailPress: function (odata) {
          debugger
          this.oBusyDialog.open();
          var that = this;
          //that.onOpenPopoverDialog();
          //payload params
          var sold_To = this.getView().getModel("oRowModel").oData.PO;
          //var del_date = this.getView().getModel("oRowModel").oData.Current_SAP_Delivery_Date;
          var cust_name = this.getView().getModel("oRowModel").oData.Supplier_Name;
         // var gen_date = this.getView().getModel("oRowModel").oData.GEN_AI_Delivery_Date;
          var item = this.getView().getModel("oRowModel").oData.SO_Item;
          
          //formatting Gen date to be passed
          var del_date = this.getView().getModel("oGenModel").oData.updated_delivery_date;
          var deliveryDate = new Date(del_date);
          var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd-MM-yyyy" });
          var emailReqDate = dateFormat.format(deliveryDate);
          var newsSummary = this.getView().getModel("oGenModel").oData.news_summarization;
  
          var sUrl = this.getOwnerComponent().getModel("cdsModel").sServiceUrl;
          var token;
          $.ajax({
            url: sUrl,
            method: "GET",
            async: false,
            headers: {
              "X-CSRF-Token": "Fetch",
            },
            success: function (result, xhr, data) {
              token = data.getResponseHeader("X-CSRF-Token");
            },
            error: function (result, xhr, data) {
              console.log("Error");
  
            },
  
          });
  
          var urlext = "getEmailData";
          var payload = {
            "emailData": {
              "llm_summary": newsSummary,
              "order_id": sold_To,
              "customer_name": cust_name,
              "delivery_date": emailReqDate,
              "item_id": '"' + item + '"'
            }
          }
  
          // var payload = {
          //   "emailData": {
          //     "llm_summary": "Stock Performance: The paragraph mentions that Zomato's stock price settled higher on Monday but has declined significantly on a year-to-date (YTD) basis. This suggests a downward trend in the stock's value, which is generally viewed negatively by investors. Losses: Zomato's net loss for the quarter ending in December (Q3 FY23) widened significantly compared to the previous year and the previous quarter. This indicates financial challenges for the company and is typically viewed negatively.",
          //     "order_id": "ORD001",
          //     "customer_name": "Akash Dawari",
          //     "delivery_date": "12-10-2023",
          //     "item_id": "[item1, item2, item3]"
          //   }
          // }
          jQuery.ajax({
            url: sUrl + urlext,
            type: "POST",
            async: false,
            headers: {
              "X-CSRF-Token": token,
            },
            data: JSON.stringify(payload),
            contentType: "application/json",
            success: function (oData) {
              debugger
              that.oBusyDialog.close();
              if (oData) {
                var oEmailModel = new sap.ui.model.json.JSONModel();
                oEmailModel.setData(oData);                 
                
                that.onOpenPopoverDialog();
                sap.ui.getCore().byId("_IDNewDialog").setModel(oEmailModel, "oEmailModel");
              }
            },
            error: function (e) {
              that.oBusyDialog.close();
              MessageBox.error("Please add proper data");
            },
          });
        },
        // onEmailPress: function (oData) {
          
        //   var that = this;
        //   //payload params
        //   console.log(oData)
        //   that.oBusyDialog.open();
        //   var sold_To = this.getView().getModel("oRowModel").oData.Supplier;
        //   var del_date = this.getView().getModel("oRowModel").oData.Delivery_date;
        //   var cust_name = this.getView().getModel("oRowModel").oData.Customer_Name;
        //   var gen_date = this.getView().getModel("oRowModel").oData.GEN_AI_Delivery_Date;
        //   var item = this.getView().getModel("oRowModel").oData.SO_Item;
        //   var sUrl = this.getOwnerComponent().getModel("cdsModel").sServiceUrl;
        //   var token;
        //   $.ajax({
        //     url: sUrl,
        //     method: "GET",
        //     async: false,
        //     headers: {
        //       "X-CSRF-Token": "Fetch",
        //     },
        //     success: function (result, xhr, data) {
        //       token = data.getResponseHeader("X-CSRF-Token");
        //     },
        //     error: function (result, xhr, data) {
        //       console.log("Error");
        //     },
  
        //   });
  
        //   var urlext = "getEmailData";
        //   var payload = {
        //     "emailData": {
        //       "llm_summary": "Stock Performance: The paragraph mentions that Zomato's stock price settled higher on Monday but has declined significantly on a year-to-date (YTD) basis. This suggests a downward trend in the stock's value, which is generally viewed negatively by investors. Losses: Zomato's net loss for the quarter ending in December (Q3 FY23) widened significantly compared to the previous year and the previous quarter. This indicates financial challenges for the company and is typically viewed negatively.",
        //       "order_id": sold_To,
        //       "customer_name": cust_name,
        //       "delivery_date": "12-10-2023",
        //       //"delivery_date": gen_date,
        //       "item_id": '"' + item + '"'
        //     }
        //   }
        //   jQuery.ajax({
        //     url: sUrl + urlext,
        //     type: "POST",
        //     async: false,
        //     headers: {
        //       "X-CSRF-Token": token,
        //     },
        //     data: JSON.stringify(payload),
        //     contentType: "application/json",
        //     success: function (oData) {
        //       that.oBusyDialog.close();
        //       // if (oData) {
        //         var oEmailModel = new sap.ui.model.json.JSONModel();
        //         oEmailModel.setData(oData);                 
        //         that.onOpenPopoverDialog();
        //         sap.ui.getCore().byId("_IDNewDialog").setModel(oEmailModel, "oEmailModel");
        //       // }
        //     },
        //     error: function (e) {
        //       that.oBusyDialog.close();
        //       MessageBox.error("Please add proper data");
        //     },
        //   });
        // },
        onRecalPress: function (oEvent) {
              var settings = {
                "url": "https://openai-serv-app.cfapps.eu10-004.hana.ondemand.com/api/v1/completions",
                "method": "POST",
                "timeout": 0,
                "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcGFydG5lcmhhY2syYnVpbGRnZW5haS13NjdvZngzOS5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktLTEzMzI0MDk4MTkiLCJ0eXAiOiJKV1QiLCJqaWQiOiAialR2bzRrVVptOVBHU3RtZlZZc2RNZ0NDeVQvRXlCTGM5UVZzVUp1Y0FmYz0ifQ.eyJqdGkiOiI1NDcwZmQwNWQ1NGE0MGZhYjcxZTBlMTFmOTQ2NDI2NSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJhNDA4NDgxOS0zYTIxLTQ5YmEtYjUzOC0zYTlkMDViNTI0OWIiLCJ6ZG4iOiJwYXJ0bmVyaGFjazJidWlsZGdlbmFpLXc2N29meDM5In0sInN1YiI6InNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwiYXV0aG9yaXRpZXMiOlsieHNfdXNlci53cml0ZSIsInVhYS5yZXNvdXJjZSIsInhzX2F1dGhvcml6YXRpb24ucmVhZCIsInhzX2lkcC53cml0ZSIsInhzX3VzZXIucmVhZCIsInhzX2lkcC5yZWFkIiwieHNfYXV0aG9yaXphdGlvbi53cml0ZSJdLCJzY29wZSI6WyJ4c191c2VyLndyaXRlIiwidWFhLnJlc291cmNlIiwieHNfYXV0aG9yaXphdGlvbi5yZWFkIiwieHNfaWRwLndyaXRlIiwieHNfdXNlci5yZWFkIiwieHNfaWRwLnJlYWQiLCJ4c19hdXRob3JpemF0aW9uLndyaXRlIl0sImNsaWVudF9pZCI6InNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwiY2lkIjoic2ItbmEtNzZiNTQ3ZmItNzIwNy00NTk3LTg5ZDQtYTM2ZjdjZDdjYTlmIWEyNTYwMDUiLCJhenAiOiJzYi1uYS03NmI1NDdmYi03MjA3LTQ1OTctODlkNC1hMzZmN2NkN2NhOWYhYTI1NjAwNSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNTM0ZGJiMGIiLCJpYXQiOjE2OTM5MDU3MjcsImV4cCI6MTY5Mzk0ODkyNywiaXNzIjoiaHR0cHM6Ly9wYXJ0bmVyaGFjazJidWlsZGdlbmFpLXc2N29meDM5LmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiJhNDA4NDgxOS0zYTIxLTQ5YmEtYjUzOC0zYTlkMDViNTI0OWIiLCJhdWQiOlsidWFhIiwieHNfdXNlciIsInhzX2lkcCIsInNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwieHNfYXV0aG9yaXphdGlvbiJdfQ.Zc_sYJsuSeusfTUGt47s5PdyB2au0Yyhoexz6_hPkDr5CIrK94VpQ2CaoePt3cebEXqUWyzD1j1cM33Nw9ni_NlzvwinPw-R7nTVV1mFjY5LG0OjqR4hUdQvM0ha8WfQ45NQ_C7YtZKIbNMVcnPKw_7Yix8zH7s7LV4SXSHPrs3iXFNlPbeheLaFNpxm0uvds8E0VD-4EiYYPtuDX-e0wGD71IoE9sg9DfEgzvthSdqdD5dUylMMpxv5k5GwBirg_uuw5A6KfyCIvT_Drob2pNCzuvMv41zy9UAh1sjknf8heGmv-ah6Jkryw6D9w5uJjJmModut_5rfTDF5Mqw6vw"
                },
                "data": JSON.stringify({
                  "deployment_id": "code-davinci-002",
                  "prompt": "\"\"\"\n1. Create a list of first names\n2. Create a list of last names\n3. Combine them randomly into a list of 100 full names\n\"\"\"",
                  "max_tokens": 500,
                  "temperature": 0,
                  "n": 1
                }),
              };
      
              $.ajax(settings).done(function (response) {
                console.log(response);
              });
        },
        onUpdatePO: function () {
          MessageBox.confirm("Do you want to update the Purchase Order?");
        },
        onClickSentiment: function (oEvent) {
          var value, value1, value2, value3, icon, icon1, icon2;
          var sentiment = parseInt(oEvent.getSource().getText());
          // var sentiment = 30;
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
              value2= "Delay in Production Supply";
              icon2 = "sap-icon://machine";
          }
          var oDialog = new Dialog({
              title: "Reason for delay",
              content: [
                  new VBox({
                    // class:"sapUiResponsiveContentPadding",
                      items:[
                          new ObjectStatus({"active": false, text: value, icon: icon}).addStyleClass("spaceBelow"),
                          new ObjectStatus({"active": false, text: value1, icon: icon1}).addStyleClass("spaceBelow"),
                          new ObjectStatus({"active": false, text: value2, icon:icon2}).addStyleClass("spaceBelow"),
                          new ObjectStatus({"active": false, text: value3,}).addStyleClass("spaceBelow")
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

      },
      onSendSuccess: function(){
        sap.m.MessageBox.success("Email has been sent successfully");
        this._oNewDialog.close();
      },
      onCallASN: function (oData) {
      // debugger
      this.oBusyDialog.open();
      var that = this;
      var oPath = "getBearerToken()";
      var sUrl = this.getOwnerComponent().getModel("cdsModel").sServiceUrl;
      var token;
      $.ajax({
        url: sUrl+oPath,
        method: "GET",
        async: true, method: 'GET', dataType: 'json', 
        success: function (oData) {
          // debugger
          
          var oBearer = oData.value;
          var raw = "Plant:1710,Po Date:07/09/2023,Po Item: 10,Po Qty: 180"
          var prompt = "Extract the data for the below feilds:\nPo Item from the below data:" +
                            "{" + raw + "} return json key value pair \nNote: put null for fields which doesnot have any data."

            var settings = {
              "url": "https://openai-serv-app.cfapps.eu10-004.hana.ondemand.com/api/v1/completions",
              "method": "POST",
              "timeout": 0,
              "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + oBearer
              },
              "data": JSON.stringify({
                  "deployment_id": "code-davinci-002",
                  "prompt": prompt,
                  "max_tokens": 500,
              }),
            };
            $.ajax(settings).done(function (response) {
              that.oBusyDialog.close();
              console.log(response);
              MessageBox.success("Processing of ASN is successfull.")
            });
          }, 
          error: function (jqXHR) {
            that.oBusyDialog.close();
            sap.m.MessageBox.error(jqXHR.responseText);
          },
      });
      // jQuery.ajax({
      //   url: sUrl + urlext,
      //   type: "POST",
      //   async: false,
      //   headers: {
      //     "X-CSRF-Token": token,
      //   },
      //   data: JSON.stringify(payload),
      //   contentType: "application/json",
      //   success: function (oData) {
      //     if (oData) {
      //       var oEmailModel = new sap.ui.model.json.JSONModel();
      //       oEmailModel.setData(oData);                 
            
      //       that.onOpenPopoverDialog();
      //       sap.ui.getCore().byId("_IDNewDialog").setModel(oEmailModel, "oEmailModel");
      //     }
      //   },
      //   error: function (e) {
      //     this.oBusyDialog1.open();
      //     MessageBox.error("Please add proper data");
      //   },
      // });
    },
      onOpenChat: function (oEvent) {
        var oUrl = 'https://llm-chatbot-app-wacky-puku-dt.cfapps.eu10.hana.ondemand.com/';
        var topsss = screen.height - 490;
        var left = screen.width - 420;
        window.open(oUrl, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + topsss + ",left=" + left + ",width=420,height=490");
      },
      onClickInsights: function (oEvent) {
        debugger
        var value = oEvent.oSource.mBindingInfos.visible.binding.aValues;
        var oDialog = new Dialog({
            title: "Order Insights provided by GEN AI",
            content: [
                new VBox({
                  // class:"sapUiResponsiveContentPadding",
                    items:[
                        new Text({text: value}),
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

    },
    
    });
  });


      