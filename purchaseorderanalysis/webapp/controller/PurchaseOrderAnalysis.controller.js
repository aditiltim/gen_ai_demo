sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("hac2build.purchaseorderanalysis.controller.PurchaseOrderAnalysis", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                console.log("Purchase Order View");
                this.onLoadTabData();
			},
      onLoadTabData: function () {
        var sUrl = this.getOwnerComponent().getModel().sServiceUrl;
        jQuery.ajax({
          url: sUrl + "PO_Data",
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
        var sPath = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel").sPath;
        var sContext = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel")
        var Supplier = this.getView().getModel("oRowModel").oData.Supplier;
        var Material = this.getView().getModel("oRowModel").oData.Material_Description;
        var Plant = this.getView().getModel("oRowModel").oData.Plant;
        debugger
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
        var urlext = "getPredictedData";
        var payload = {
          "excelData": [{
            "Supplier": Supplier,
            "Material": "100-110-01",
            "Plant": "1002",
            "Po_qty": Po_qty,
            "Po_delivery_date": Po_delivery_date,
            "Po_item": Po_item
          }]
        }
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
              var that = this;
                    sap.m.MessageBox.success("Success");
                    console.log(oData)
                    sContext.getModel("oTableModel").setProperty(sPath +"/Local_AI_Delivery_Date", oData.predicted_receipt_date);
                    sap.ui.getCore().byId("idTablelist").getBinding("items").refresh();
                    console.log(oData.value)
          
          },
            error: function (e) {
              MessageBox.error("Please add proper data");
            },
          });
        },
      onAvailablePress: function (oEvent) {
              // debugger
              var sPath = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel").sPath;
              var sContext = this.getView().byId("idTablelist").getSelectedItem().getBindingContext("oTableModel")
              var customer = JSON.stringify(this.getView().getModel("oRowModel").oData.Customer);
              var del_date = this.getView().getModel("oRowModel").oData.Delivery_date;
      
              var that = this;
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
                async: false,
                headers: {
                  "X-CSRF-Token": token
                },
                data: JSON.stringify(payload),
                contentType: "application/json",
                success: function (oData) {
                  var that = this;
                    sap.m.MessageBox.success("Success");
                    console.log(oData)
                    sContext.getModel("oTableModel").setProperty(sPath +"/GEN_AI_Delivery_Date", oData.updated_delivery_date);
                    sap.ui.getCore().byId("idTablelist").getBinding("items").refresh();
                    console.log(oData.value);
                    //that.downloadExcel(oData.value);
                  
                },
                error: function (e) {
                  MessageBox.error("Please add proper data");
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
      onEmailPress: function (odata) {
              var that = this;
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
                  "llm_summary": "Stock Performance: The paragraph mentions that Zomato's stock price settled higher on Monday but has declined significantly on a year-to-date (YTD) basis. This suggests a downward trend in the stock's value, which is generally viewed negatively by investors. Losses: Zomato's net loss for the quarter ending in December (Q3 FY23) widened significantly compared to the previous year and the previous quarter. This indicates financial challenges for the company and is typically viewed negatively.",
                  "order_id": "ORD001",
                  "customer_name": "Akash Dawari",
                  "delivery_date": "12-10-2023",
                  "item_id": "[item1, item2, item3]"
                }
              }
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
                  if (oData.value) {
                    MessageBox.success("Success");
                    console.log(oData.value);
                    that.downloadExcel(oData.value);
                  }
                },
                error: function (e) {
                  MessageBox.error("Please add proper data");
                },
              });
        },
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
          MessageBox.confirm("Do you want to confirm the purchase order?");
        },
        });

    });


      