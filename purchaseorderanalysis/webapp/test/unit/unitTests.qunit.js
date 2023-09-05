/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"hac2build/purchaseorderanalysis/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
