
/*
 * zouti
 * https://github.com/krkn/zouti
 *
 * Copyright (c) 2014 Leny
 * Licensed under the WTFPL license.
 */
"use strict";
var bench, clc, clearConsole, crypto, doNothing, kindOf, kindsOf, log, md5, oBenches, sha1, sha256, sha512, sleep, uuid, whirlpool, _hash;

crypto = require("crypto");

clc = require("cli-color");

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
  sDatePrefix = "" + (dDate.getDate()) + " " + aMonthName[dDate.getMonth()] + " " + sHours + ":" + sMinutes + ":" + sSeconds;
  sMessage = "[" + sContext + "] " + sMessage;
  switch (sMessageType.toUpperCase()) {
    case "ERROR":
    case "ERR":
    case "RED":
      return console.log("" + sDatePrefix + " - " + (clc.red.bold(sMessage)));
    case "WARNING":
    case "WARN":
    case "YELLOW":
      return console.log("" + sDatePrefix + " - " + (clc.yellow(sMessage)));
    case "SUCCESS":
    case "GREEN":
      return console.log("" + sDatePrefix + " - " + (clc.green(sMessage)));
    case "MAGENTA":
      return console.log("" + sDatePrefix + " - " + (clc.magenta(sMessage)));
    default:
      return console.log("" + sDatePrefix + " - " + (clc.cyan(sMessage)));
  }
};

exports.clearConsole = clearConsole = function() {
  return console.log("\u001B[2J\u001B[0;0f");
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
  sDiff = iDiff > 1000 ? "" + (Math.round(iDiff / 100) / 10) + "s" : (iDiff > 25 ? "" + (Math.round(iDiff)) + "ms" : "" + iDiff + "ms");
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
  var dEnd, _results;
  dEnd = (new Date()).getTime() + (1000 * iDuration);
  _results = [];
  while ((new Date()).getTime() <= dEnd) {
    _results.push(doNothing());
  }
  return _results;
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
