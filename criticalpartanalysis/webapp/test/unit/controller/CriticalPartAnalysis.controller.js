/*global QUnit*/

sap.ui.define([
	"hac2build/criticalpartanalysis/controller/CriticalPartAnalysis.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CriticalPartAnalysis Controller");

	QUnit.test("I should test the CriticalPartAnalysis controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
