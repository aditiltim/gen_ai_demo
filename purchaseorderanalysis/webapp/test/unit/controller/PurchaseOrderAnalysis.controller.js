/*global QUnit*/

sap.ui.define([
	"hac2build/purchaseorderanalysis/controller/PurchaseOrderAnalysis.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PurchaseOrderAnalysis Controller");

	QUnit.test("I should test the PurchaseOrderAnalysis controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
