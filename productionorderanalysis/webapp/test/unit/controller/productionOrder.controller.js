/*global QUnit*/

sap.ui.define([
	"hac2build/productionorderanalysis/controller/productionOrder.controller"
], function (Controller) {
	"use strict";

	QUnit.module("productionOrder Controller");

	QUnit.test("I should test the productionOrder controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
