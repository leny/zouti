###
 * zouti
 * https://github.com/krkn/zouti
 *
 * Copyright (c) 2014 Leny
 * Licensed under the WTFPL license.
###

"use strict"

crypto = require "crypto"
chalk = require "chalk"

# Log formatting constants
exports.ERROR = ERROR = "ERROR"
exports.WARNING = WARNING = "WARNING"
exports.SUCCESS = SUCCESS = "SUCCESS"

# Mute functions
exports.muted = _bIsMuted = false
exports.mute = mute = () ->
    _bIsMuted = true

exports.unmute = mute = () ->
    _bIsMuted = false

# Formatted console log, with date, color & context.
exports.log = log = ( sMessage, sContext = "node", sMessageType = "LOG" ) ->
    aMonthName = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    dDate = new Date()
    sHours = if ( iHours = dDate.getHours() ) < 10 then "0#{ iHours }" else iHours
    sMinutes = if ( iMinutes = dDate.getMinutes() ) < 10 then "0#{ iMinutes }" else iMinutes
    sSeconds = if ( iSeconds = dDate.getSeconds() ) < 10 then "0#{ iSeconds }" else iSeconds
    sDatePrefix = "#{ dDate.getDate() } #{ aMonthName[ dDate.getMonth() ] } #{ sHours }:#{ sMinutes }:#{ sSeconds }"
    switch sMessageType.toUpperCase()
        when ERROR, "ERR", "RED"
            sMessage = "[#{ sContext }] #{ sMessage }"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.red.bold( sMessage ) }"
        when WARNING, "WARN", "YELLOW"
            sMessage = "[#{ sContext }] #{ sMessage }"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.yellow( sMessage ) }"
        when SUCCESS, "GREEN"
            sMessage = "[#{ sContext }] #{ sMessage }"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.green( sMessage ) }"
        when "MAGENTA"
            sMessage = "[#{ sContext }] #{ sMessage }"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.magenta( sMessage ) }"
        when "INSPECT", "DEBUG"
            sContext = "[#{ sContext }]"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.cyan( sContext ) }", sMessage
        else
            sMessage = "[#{ sContext }] #{ sMessage }"
            not _bIsMuted and console.log "#{ sDatePrefix } - #{ chalk.cyan( sMessage ) }"

exports.warn = exports.warning = ( sMessage, sContext ) -> log sMessage, sContext, WARNING
exports.error = exports.notOk = ( sMessage, sContext ) -> log sMessage, sContext, ERROR
exports.success = exports.ok = ( sMessage, sContext ) -> log sMessage, sContext, SUCCESS
exports.inspect = exports.debug = ( sMessage, sContext ) -> log sMessage, sContext, "DEBUG"

# Clearing console log messages.
exports.clearConsole = clearConsole = ->
    not _bIsMuted and console.log "\u001B[2J\u001B[0;0f"

# Spacer (print empty console log messages to create visual spaces)
exports.spacer = spacer = ( iAmount = 1 ) ->
    iAmount = 1 if ( isNaN iAmount = +iAmount )
    do console.log while iAmount--
    return

# Simple bench tools for console.
oBenches = {}
exports.bench = bench = ( sName, bLog = yes ) ->
    return oBenches[ sName ] = process.hrtime() unless oBenches[ sName ]
    iDiff = Math.round( ( ( aEnd = process.hrtime( oBenches[ sName ] ) )[ 0 ] * 1e9 + aEnd[ 1 ] ) / 1000 ) / 1000
    sDiff = if iDiff > 1000 then "#{ Math.round( iDiff / 100 ) / 10 }s" else ( if iDiff > 25 then "#{ Math.round( iDiff ) }ms" else "#{ iDiff }ms" )
    log "took #{ sDiff }.", ( sName or "TIMER" ), "YELLOW" if bLog
    delete oBenches[ sName ]
    oDiffs =
        value: if iDiff > 25 then Math.round( iDiff ) else iDiff
        literal: sDiff

# Generate an UUID (https://gist.github.com/bmc/1893440) compliant to RFC 4122.
exports.uuid = uuid = ->
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, (c) ->
        r = Math.random() * 16 | 0
        v = if c is 'x' then r else ( r & 0x3 | 0x8 )
        v.toString( 16 )
    )

# Old-time, 'quick&dirty' sleep function. Use with care. Eat CPU's :)
doNothing = ->
    return

exports.sleep = sleep = ( iDuration ) ->
    dEnd = Date.now() + ( 1000 * iDuration )
    while Date.now() <= dEnd
        doNothing()

# Misc hashing functions.
_hash = ( sStr, sAlgorythm ) ->
    oHash = crypto.createHash sAlgorythm
    oHash.update sStr, "utf8"
    oHash.digest "hex"

exports.md5 = md5 = ( sStr ) ->
    _hash sStr, "md5"

exports.sha1 = sha1 = ( sStr ) ->
    _hash sStr, "sha1"

exports.sha256 = sha256 = ( sStr ) ->
    _hash sStr, "sha256"

exports.sha512 = sha512 = ( sStr ) ->
    _hash sStr, "sha512"

exports.whirlpool = whirlpool = ( sStr ) ->
    _hash sStr, "whirlpool"

# kindOf - cf. grunt.util.kindOf
kindsOf = {}
"Number String Boolean Function RegExp Array Date Error".split( " " ).forEach (k) ->
    kindsOf[ "[object #{ k }]"] = k.toLowerCase()

exports.kindOf = kindOf = ( value ) ->
    return String value unless value?
    kindsOf[ kindsOf.toString.call( value ) ] or "object"
