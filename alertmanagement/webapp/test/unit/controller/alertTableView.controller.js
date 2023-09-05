/*global QUnit*/

sap.ui.define([
	"hac2build/alertmanagement/controller/alertTableView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("alertTableView Controller");

	QUnit.test("I should test the alertTableView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
