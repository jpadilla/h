# Simple IE autodetect function
# See for example https://stackoverflow.com/questions/19999388/jquery-check-if-user-is-using-ie/21712356#21712356
isIE = ->
  ua = window.navigator.userAgent
  ua.indexOf("MSIE ") > 0 or      # for IE <=10
    ua.indexOf('Trident/') > 0 or # for IE 11
    ua.indexOf('Edge/') > 0       # for IE 12

# Annotator plugin providing dom-text-mapper
class Annotator.Plugin.DomTextMapper extends Annotator.Plugin

  pluginInit: ->
    if @options.skip
      console.log "Not registering DOM-Text-Mapper, since it's disabled."
      return

    unless @options.force
      if isIE()
        console.log "Not registering DOM-Text-Mapper, since we detected IE."
        return
      else
        console.log "This doesn't seem to be an IE environment; enabling DOM-TextMapper support"

    @anchoring = @annotator.anchoring

    @anchoring.documentAccessStrategies.unshift
      # Document access strategy for simple HTML documents,
      # with enhanced text extraction and mapping features.
      name: "DOM-Text-Mapper"
      mapper: window.DomTextMapper
      init: => @anchoring.document.setRootNode @annotator.wrapper[0]
