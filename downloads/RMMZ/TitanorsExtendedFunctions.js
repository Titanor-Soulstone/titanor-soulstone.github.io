/*:
 * @target MZ
 * @plugindesc 1.3 Titanors Extended Functions
 * @author Titanor
 *
 *
 * =====================================================================================
 * PARAMS
 * =====================================================================================
 *
 * @param seed
 * @desc
 * @type variable
 * @default 1
 *
 *
 * @command sunrotation
 * @text Test For Sun Rotation
 * @desc Test for the Sun's rotation around the earth based on system clock
 *
 * @arg output
 * @text Ouput Variable
 * @type variable
 * @default 1
 *
 * @arg console
 * @text Console Log
 * @type boolean
 * @default false
 *
 * @command testforsequence
 * @text Test For Sequence
 * @desc Test for a sequence in a string of numbers
 *
 * @arg basevalue
 * @text Base Value
 * @type variable
 * @default 1
 *
 * @arg testvalue
 * @text Value to test for
 * @type string
 * @default 1
 *
 * @arg output
 * @text Ouput Switch
 * @type switch
 * @default 1
 *
 * @arg console
 * @text Console Log
 * @type boolean
 * @default false
 *
 * @command mergevariables
 * @text Merge Variables
 * @desc Merge 2 Variable together as 1
 *
 * @arg variable1
 * @text variable 1
 * @type variable
 * @default 1
 *
 * @arg variable2
 * @text variable 2
 * @type variable
 * @default 2
 *
 * @arg output
 * @text Ouput Variable
 * @type variable
 * @default 3
 *
 * @arg console
 * @text Console Log
 * @type boolean
 * @default false
 *
 * @command getlastdigit
 * @text Get last Digit
 * @desc Get The Last Digit of a Variable
 *
 * @arg variable
 * @text variable
 * @type variable
 * @default 1
 *
 * @arg output
 * @text Ouput Variable
 * @type variable
 * @default 2
 *
 * @arg console
 * @text Console Log
 * @type boolean
 * @default false
 *
 * @command getmonthdiff
 * @text (UNDER DEV)Get month Difference
 * @desc Get The Difference between two months
 *
 * @arg variable1
 * @text date 1
 * @type variable
 * @default 1
 *
 * @arg variable2
 * @text date 2
 * @type variable
 * @default 1
 *
 * @arg output
 * @text Ouput Variable
 * @type variable
 * @default 2
 *
 * @arg console
 * @text Console Log
 * @type boolean
 * @default false
 *
 * =====================================================================================
 * HELP
 * =====================================================================================
 *
 * @url https://titanor-soulstone.glitch.me/
 * @help
 * contact
 * --------
 * Sir_Titas at rpgmaker web forums
 *
 * Requirements (in this order)
 * ----------------------------
 * none
 *
 * T&C
 * ----------------------------
 * Credit Titanor
 * Full T&C in the forums and on my website
 *
 * Instructions and T&C at titanor-soulstone.glitch.me
 * Please visit the rpgmakerweb forum to give feedback :)
 */
//(() => {
"use strict";
var Imported = Imported || {};
Imported.TitanorsExtendedFunctions = true;
var soul = soul || {};
soul.EX = soul.EX || {};
soul.EX.pluginName = "TitanorsExtendedFunctions";
const pluginName = "TitanorsExtendedFunctions";
soul.EX.params = PluginManager.parameters(soul.EX.pluginName);

function getRealTime(d) {
	var t = new Date(),
		rt;
	var week = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];
	var spliDate = [
		t.getFullYear(),
		t.getMonth() + 1,
		t.getDate(),
		week[t.getDay()],
		t.getHours(),
		t.getMinutes(),
		t.getSeconds()
	];
	(spliDate[1] < 10) ? spliDate[1] = "0" + spliDate[1]: '';
	(spliDate[2] < 10) ? spliDate[2] = "0" + spliDate[2]: '';
	(spliDate[4] < 10) ? spliDate[4] = "0" + spliDate[4]: '';
	(spliDate[5] < 10) ? spliDate[5] = "0" + spliDate[5]: '';
	(spliDate[6] < 10) ? spliDate[6] = "0" + spliDate[6]: '';
	switch (d) {
		case "year":
			rt = spliDate[0];
			break;
		case "month":
			rt = spliDate[1];
			break;
		case "day":
			rt = spliDate[2];
			break;
		case "week":
			rt = spliDate[3];
			break;
		case "hour":
			rt = t.getHours();
			rt = spliDate[4];
			break;
		case "minutes":
			rt = spliDate[5];
			break;
		case "seconds":
			rt = spliDate[6];
			break;
		default:
			rt = spliDate[0] + "/" + spliDate[1] + "/" + spliDate[2] + ", " + spliDate[3] + ", " + spliDate[4] + ":" + spliDate[5] + ":" + spliDate[6];
	}
	return rt;
}
var loop = true;
const fs = require("fs");
const util = require("util");
const os = require("os");
const home = os.homedir();
Object.defineProperty(this, "gametitle", {
	get: () => $dataSystem.gameTitle
});
Object.defineProperty(this, "gamefolder", {
	get: () => home + "/games/" + $dataSystem.gameTitle
});
var username = os.userInfo().username;

function createGamefolderIfNotExists() {
	if (fs.existsSync(gamefolder)) {
		console.log("Directory exists!");
	} else {
		console.log("Directory not found.");
		fs.mkdir(gamefolder, {
			recursive: true
		}, err => {
			if (err) console.log(err);
			if (err) throw err;
		});
		console.log("Directory Created");
	}
}
const alias = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function () {
	alias.apply(this, arguments);
	var logtime = new Date();
	var logFile = fs.createWriteStream(
		gamefolder +
		"/" +
		"log-" +
		getRealTime("day") +
		"-" +
		getRealTime("hour") +
		"-" +
		getRealTime("minutes") +
		"-" +
		getRealTime("seconds") +
		".log", {
			flags: "a"
		});
	// Or 'w' to truncate the file every time the process starts.
	var logStdout = process.stdout;
	console.log = function () {
		logFile.write(util.format.apply(null, arguments) + "\n");
		logStdout.write(util.format.apply(null, arguments) + "\n");
	};
	console.error = console.log;
	console.warn = console.log;
	console.log("username =", os.userInfo().username);
	console.log("Functions Initalised");
	console.log("visit https://titanor-soulstone.glitch.me/ for more info");
	console.log("Full T&C in the forums and on my website");
	console.log("1");
	console.log("game save directory =", gamefolder);
	// Time Module
	var timemod = new Date();
	var d = new Date();
	PluginManager.registerCommand(pluginName, "sunrotation", args => {
		function sunRotate() {
			var minSinceMidnight = d.getTime() - d.setHours(0, 0, 0, 0);
			minSinceMidnight = Math.round(minSinceMidnight / 60000);
			var math = minSinceMidnight / 1440;
			var tfClockRotation = math * 360;
			var SunRotation = tfClockRotation + 180;
			console.log("SunRotation = ", SunRotation);
			return SunRotation;
		}
		$gameVariables.setValue(args.output, sunRotate());
		if (args.console == true) {
			console.log("SunRotation = ", sunRotate());
		}
	});

	function sleep(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}
	// Plugin Commands
	PluginManager.registerCommand(pluginName, "testforsequence", args => {
		function isSeq(number, sub) {
			number = number.toString(10);
			sub = sub.toString(10);
			return number.includes(sub);
		}
		if (args.console == true) {
			console.log(
				$dataSystem.switches[args.output],
				" = ",
				isSeq($gameVariables.value(args.basevalue), args.testvalue)
			);
		}
		$gameSwitches.setValue(
			args.output,
			isSeq($gameVariables.value(args.basevalue), args.testvalue)
		);
	});

	PluginManager.registerCommand(pluginName, "mergevariables", args => {
		function isMerge(number1, number2) {
			var merges = number1 + "" + number2;
			return parseInt(merges, 10);
		}
		var number1 = $gameVariables.value(args.variable1);
		var number2 = $gameVariables.value(args.variable2);
		$gameVariables.setValue(args.output, isMerge(number1, number2));
		if (args.console == true) {
			console.log(
				$dataSystem.variables[args.output],
				" = ",
				isMerge(number1, number2)
			);
		}
	});

	PluginManager.registerCommand(pluginName, "getlastdigit", args => {
		function isLast(number) {
			var math = +number
				.toString()
				.split("")
				.pop();
			return math;
		}
		var number = $gameVariables.value(args.variable);
		$gameVariables.setValue(args.output, isLast(number));
		if (args.console == true) {
			console.log($dataSystem.variables[args.output], " = ", isLast(number));
		}
	});
	PluginManager.registerCommand(pluginName, "getmonthdiff", args => {
		var dateFrom = new Date($gameVariables.value(args.variable1));
		var dateTo = new Date($gameVariables.value(args.variable2));

		function monthDiff(dateFrom, dateTo) {
			return (
				dateTo.getMonth() -
				dateFrom.getMonth() +
				12 * (dateTo.getFullYear() - dateFrom.getFullYear())
			);
		}
		$gameVariables.setValue(args.output, monthDiff(dateFrom, dateTo));
		if (args.console == true) {
			console.log(
				$dataSystem.variables[args.output],
				" = ",
				monthDiff(dateFrom, dateTo)
			);
		}
	});
}
// All procedures are written here.
// Save File Changes
StorageManager.fileDirectoryPath = function () {
	const path = require("path");
	const base = gamefolder;
	return path.join(base, "save/");
};
StorageManager.filePath = function (saveName) {
	createGamefolderIfNotExists();
	console.log("game save directory =", gamefolder);
	const dir = this.fileDirectoryPath();
	return dir + saveName + ".rmmzsave";
};
//})();
//eof