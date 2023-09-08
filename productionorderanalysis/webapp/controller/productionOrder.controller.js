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
                // var settings = {
                //     "url": "https://openai-serv-app.cfapps.eu10-004.hana.ondemand.com/api/v1/completions",
                //     "method": "POST",
                //     "timeout": 0,
                //     "headers": {
                //         "Content-Type": "application/json",
                //         "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vcGFydG5lcmhhY2syYnVpbGRnZW5haS13NjdvZngzOS5hdXRoZW50aWNhdGlvbi5ldTEwLmhhbmEub25kZW1hbmQuY29tL3Rva2VuX2tleXMiLCJraWQiOiJkZWZhdWx0LWp3dC1rZXktLTEzMzI0MDk4MTkiLCJ0eXAiOiJKV1QiLCJqaWQiOiAialR2bzRrVVptOVBHU3RtZlZZc2RNZ0NDeVQvRXlCTGM5UVZzVUp1Y0FmYz0ifQ.eyJqdGkiOiI1NDcwZmQwNWQ1NGE0MGZhYjcxZTBlMTFmOTQ2NDI2NSIsImV4dF9hdHRyIjp7ImVuaGFuY2VyIjoiWFNVQUEiLCJzdWJhY2NvdW50aWQiOiJhNDA4NDgxOS0zYTIxLTQ5YmEtYjUzOC0zYTlkMDViNTI0OWIiLCJ6ZG4iOiJwYXJ0bmVyaGFjazJidWlsZGdlbmFpLXc2N29meDM5In0sInN1YiI6InNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwiYXV0aG9yaXRpZXMiOlsieHNfdXNlci53cml0ZSIsInVhYS5yZXNvdXJjZSIsInhzX2F1dGhvcml6YXRpb24ucmVhZCIsInhzX2lkcC53cml0ZSIsInhzX3VzZXIucmVhZCIsInhzX2lkcC5yZWFkIiwieHNfYXV0aG9yaXphdGlvbi53cml0ZSJdLCJzY29wZSI6WyJ4c191c2VyLndyaXRlIiwidWFhLnJlc291cmNlIiwieHNfYXV0aG9yaXphdGlvbi5yZWFkIiwieHNfaWRwLndyaXRlIiwieHNfdXNlci5yZWFkIiwieHNfaWRwLnJlYWQiLCJ4c19hdXRob3JpemF0aW9uLndyaXRlIl0sImNsaWVudF9pZCI6InNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwiY2lkIjoic2ItbmEtNzZiNTQ3ZmItNzIwNy00NTk3LTg5ZDQtYTM2ZjdjZDdjYTlmIWEyNTYwMDUiLCJhenAiOiJzYi1uYS03NmI1NDdmYi03MjA3LTQ1OTctODlkNC1hMzZmN2NkN2NhOWYhYTI1NjAwNSIsImdyYW50X3R5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJyZXZfc2lnIjoiNTM0ZGJiMGIiLCJpYXQiOjE2OTM5MDU3MjcsImV4cCI6MTY5Mzk0ODkyNywiaXNzIjoiaHR0cHM6Ly9wYXJ0bmVyaGFjazJidWlsZGdlbmFpLXc2N29meDM5LmF1dGhlbnRpY2F0aW9uLmV1MTAuaGFuYS5vbmRlbWFuZC5jb20vb2F1dGgvdG9rZW4iLCJ6aWQiOiJhNDA4NDgxOS0zYTIxLTQ5YmEtYjUzOC0zYTlkMDViNTI0OWIiLCJhdWQiOlsidWFhIiwieHNfdXNlciIsInhzX2lkcCIsInNiLW5hLTc2YjU0N2ZiLTcyMDctNDU5Ny04OWQ0LWEzNmY3Y2Q3Y2E5ZiFhMjU2MDA1IiwieHNfYXV0aG9yaXphdGlvbiJdfQ.Zc_sYJsuSeusfTUGt47s5PdyB2au0Yyhoexz6_hPkDr5CIrK94VpQ2CaoePt3cebEXqUWyzD1j1cM33Nw9ni_NlzvwinPw-R7nTVV1mFjY5LG0OjqR4hUdQvM0ha8WfQ45NQ_C7YtZKIbNMVcnPKw_7Yix8zH7s7LV4SXSHPrs3iXFNlPbeheLaFNpxm0uvds8E0VD-4EiYYPtuDX-e0wGD71IoE9sg9DfEgzvthSdqdD5dUylMMpxv5k5GwBirg_uuw5A6KfyCIvT_Drob2pNCzuvMv41zy9UAh1sjknf8heGmv-ah6Jkryw6D9w5uJjJmModut_5rfTDF5Mqw6vw"
                //     },
                //     "data": JSON.stringify({
                //         "deployment_id": "code-davinci-002",
                //         "prompt": "\"\"\"\n1. Create a list of first names\n2. Create a list of last names\n3. Combine them randomly into a list of 100 full names\n\"\"\"",
                //         "max_tokens": 500,
                //         "temperature": 0,
                //         "n": 1
                //     }),
                // };

                // $.ajax(settings).done(function (response) {
                //     console.log(response);
                // });

                // var settings = {
                //     "url": "https://13.127.183.113:8007/send_news_summary",
                //     "method": "POST",
                //     "timeout": 0,
                //     "headers": {
                //         "Content-Type": "application/json"
                //     },
                //     "data": JSON.stringify({
                //         "company_name": "zomato",
                //         "delivery_date": "2023-09-05"
                //     }),
                // };

                // $.ajax(settings).done(function (response) {
                //     console.log(response);
                // });

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
