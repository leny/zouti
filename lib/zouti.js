
/*
 * zouti
 * https://github.com/krkn/zouti
 *
 * Copyright (c) 2014 Leny
 * Licensed under the WTFPL license.
 */
"use strict";
var ERROR, SUCCESS, WARNING, _bIsMuted, _hash, bench, chalk, clearConsole, crypto, doNothing, kindOf, kindsOf, log, md5, mute, oBenches, sha1, sha256, sha512, sleep, uuid, whirlpool;

crypto = require("crypto");

chalk = require("chalk");

exports.ERROR = ERROR = "ERROR";

exports.WARNING = WARNING = "WARNING";

exports.SUCCESS = SUCCESS = "SUCCESS";

exports.muted = _bIsMuted = false;

exports.mute = mute = function() {
  return _bIsMuted = true;
};

exports.unmute = mute = function() {
  return _bIsMuted = false;
};

exports.log = log = function(sMessage, sContext, sMessageType) {
  var aMonthName, dDate, iHours, iMinutes, iSeconds, sDatePrefix, sHours, sMinutes, sSeconds;
  if (sContext == null) {
    sContext = "node";
  }
  if (sMessageType == null) {
    sMessageType = "LOG";
  }
  aMonthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  dDate = new Date();
  sHours = (iHours = dDate.getHours()) < 10 ? "0" + iHours : iHours;
  sMinutes = (iMinutes = dDate.getMinutes()) < 10 ? "0" + iMinutes : iMinutes;
  sSeconds = (iSeconds = dDate.getSeconds()) < 10 ? "0" + iSeconds : iSeconds;
  sDatePrefix = (dDate.getDate()) + " " + aMonthName[dDate.getMonth()] + " " + sHours + ":" + sMinutes + ":" + sSeconds;
  switch (sMessageType.toUpperCase()) {
    case ERROR:
    case "ERR":
    case "RED":
      sMessage = "[" + sContext + "] " + sMessage;
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.red.bold(sMessage)));
    case WARNING:
    case "WARN":
    case "YELLOW":
      sMessage = "[" + sContext + "] " + sMessage;
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.yellow(sMessage)));
    case SUCCESS:
    case "GREEN":
      sMessage = "[" + sContext + "] " + sMessage;
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.green(sMessage)));
    case "MAGENTA":
      sMessage = "[" + sContext + "] " + sMessage;
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.magenta(sMessage)));
    case "INSPECT":
    case "DEBUG":
      sContext = "[" + sContext + "]";
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.cyan(sContext)), sMessage);
    default:
      sMessage = "[" + sContext + "] " + sMessage;
      return !_bIsMuted && console.log(sDatePrefix + " - " + (chalk.cyan(sMessage)));
  }
};

exports.warn = exports.warning = function(sMessage, sContext) {
  return log(sMessage, sContext, WARNING);
};

exports.error = exports.notOk = function(sMessage, sContext) {
  return log(sMessage, sContext, ERROR);
};

exports.success = exports.ok = function(sMessage, sContext) {
  return log(sMessage, sContext, SUCCESS);
};

exports.inspect = exports.debug = function(sMessage, sContext) {
  return log(sMessage, sContext, "DEBUG");
};

exports.clearConsole = clearConsole = function() {
  return !_bIsMuted && console.log("\u001B[2J\u001B[0;0f");
};

oBenches = {};

exports.bench = bench = function(sName, bLog) {
  var aEnd, iDiff, oDiffs, sDiff;
  if (bLog == null) {
    bLog = true;
  }
  if (!oBenches[sName]) {
    return oBenches[sName] = process.hrtime();
  }
  iDiff = Math.round(((aEnd = process.hrtime(oBenches[sName]))[0] * 1e9 + aEnd[1]) / 1000) / 1000;
  sDiff = iDiff > 1000 ? (Math.round(iDiff / 100) / 10) + "s" : (iDiff > 25 ? (Math.round(iDiff)) + "ms" : iDiff + "ms");
  if (bLog) {
    log("took " + sDiff + ".", sName || "TIMER", "YELLOW");
  }
  delete oBenches[sName];
  return oDiffs = {
    value: iDiff > 25 ? Math.round(iDiff) : iDiff,
    literal: sDiff
  };
};

exports.uuid = uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r, v;
    r = Math.random() * 16 | 0;
    v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

doNothing = function() {};

exports.sleep = sleep = function(iDuration) {
  var dEnd, results;
  dEnd = (new Date()).getTime() + (1000 * iDuration);
  results = [];
  while ((new Date()).getTime() <= dEnd) {
    results.push(doNothing());
  }
  return results;
};

_hash = function(sStr, sAlgorythm) {
  var oHash;
  oHash = crypto.createHash(sAlgorythm);
  oHash.update(sStr, "utf8");
  return oHash.digest("hex");
};

exports.md5 = md5 = function(sStr) {
  return _hash(sStr, "md5");
};

exports.sha1 = sha1 = function(sStr) {
  return _hash(sStr, "sha1");
};

exports.sha256 = sha256 = function(sStr) {
  return _hash(sStr, "sha256");
};

exports.sha512 = sha512 = function(sStr) {
  return _hash(sStr, "sha512");
};

exports.whirlpool = whirlpool = function(sStr) {
  return _hash(sStr, "whirlpool");
};

kindsOf = {};

"Number String Boolean Function RegExp Array Date Error".split(" ").forEach(function(k) {
  return kindsOf["[object " + k + "]"] = k.toLowerCase();
});

exports.kindOf = kindOf = function(value) {
  if (value == null) {
    return String(value);
  }
  return kindsOf[kindsOf.toString.call(value)] || "object";
};
