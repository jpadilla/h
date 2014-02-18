// Generated by CoffeeScript 1.6.3
/*
** Annotator 1.2.6-dev-b588e84
** https://github.com/okfn/annotator/
**
** Copyright 2012 Aron Carroll, Rufus Pollock, and Nick Stenning.
** Dual licensed under the MIT and GPLv3 licenses.
** https://github.com/okfn/annotator/blob/master/LICENSE
**
** Built at: 2014-02-18 15:22:37Z
*/



/*
//
*/

// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Annotator.Plugin.FuzzyTextAnchors = (function(_super) {
    __extends(FuzzyTextAnchors, _super);

    function FuzzyTextAnchors() {
      this.fuzzyMatching = __bind(this.fuzzyMatching, this);
      this.twoPhaseFuzzyMatching = __bind(this.twoPhaseFuzzyMatching, this);
      this.verifyFuzzyTextAnchor = __bind(this.verifyFuzzyTextAnchor, this);
      _ref = FuzzyTextAnchors.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    FuzzyTextAnchors.prototype.pluginInit = function() {
      this.Annotator = Annotator;
      this.$ = Annotator.$;
      if (!this.annotator.plugins.TextAnchors) {
        throw "The FuzzyTextAnchors Annotator plugin requires the TextAnchors plugin.";
      }
      this.textFinder = new DomTextMatcher();
      this.annotator.anchoringStrategies.push({
        name: "two-phase fuzzy",
        create: this.twoPhaseFuzzyMatching,
        verify: this.verifyFuzzyTextAnchor
      });
      return this.annotator.anchoringStrategies.push({
        name: "one-phase fuzzy",
        create: this.fuzzyMatching,
        verify: this.verifyFuzzyTextAnchor
      });
    };

    FuzzyTextAnchors.prototype.verifyFuzzyTextAnchor = function(anchor, reason, data) {
      var dfd;
      dfd = this.$.Deferred();
      if (reason === "corpus change") {
        dfd.resolve(false);
      } else {
        dfd.resolve(true);
      }
      return dfd.promise();
    };

    FuzzyTextAnchors.prototype.twoPhaseFuzzyMatching = function(annotation, target) {
      var dfd, expectedEnd, expectedStart, posSelector, prefix, quote, quoteSelector, suffix,
        _this = this;
      dfd = this.$.Deferred();
      quoteSelector = this.annotator.findSelector(target.selector, "TextQuoteSelector");
      if (!quoteSelector) {
        dfd.reject("no TextQuoteSelector found", true);
        return dfd.promise();
      }
      prefix = quoteSelector.prefix;
      suffix = quoteSelector.suffix;
      quote = quoteSelector.exact;
      if (!(prefix && suffix)) {
        dfd.reject("prefix and suffix is required");
        return dfd.promise();
      }
      posSelector = this.annotator.findSelector(target.selector, "TextPositionSelector");
      expectedStart = posSelector != null ? posSelector.start : void 0;
      expectedEnd = posSelector != null ? posSelector.end : void 0;
      this.annotator.domMapper.prepare("anchoring").then(function(s) {
        var match, options, result;
        options = {
          contextMatchDistance: s.getCorpus().length * 2,
          contextMatchThreshold: 0.5,
          patternMatchThreshold: 0.5,
          flexContext: true
        };
        result = _this.textFinder.searchFuzzyWithContext(s.getCorpus(), prefix, suffix, quote, expectedStart, expectedEnd, false, options);
        if (!result.matches.length) {
          dfd.reject("fuzzy match found no result for '" + quote + "' @ " + expectedStart + ".");
          return dfd.promise();
        }
        match = result.matches[0];
        return dfd.resolve(new _this.Annotator.TextPositionAnchor(_this.annotator, annotation, target, match.start, match.end, s.getPageIndexForPos(match.start), s.getPageIndexForPos(match.end), match.found, !match.exact ? match.comparison.diffHTML : void 0, !match.exact ? match.exactExceptCase : void 0));
      });
      return dfd.promise();
    };

    FuzzyTextAnchors.prototype.fuzzyMatching = function(annotation, target) {
      var dfd, expectedStart, posSelector, quote, quoteSelector,
        _this = this;
      dfd = this.$.Deferred();
      quoteSelector = this.annotator.findSelector(target.selector, "TextQuoteSelector");
      if (!quoteSelector) {
        dfd.reject("no TextQuoteSelector found", true);
        return dfd.promise();
      }
      quote = quoteSelector.exact;
      if (!quote) {
        dfd.reject("quote is required");
        return dfd.promise();
      }
      if (!(quote.length >= 32)) {
        dfd.reject("can't use this strategy for quotes this short");
        return dfd.promise();
      }
      posSelector = this.annotator.findSelector(target.selector, "TextPositionSelector");
      expectedStart = posSelector != null ? posSelector.start : void 0;
      this.annotator.domMapper.prepare("anchoring").then(function(s) {
        var len, match, options, result;
        len = s.getCorpus().length;
        if (expectedStart == null) {
          expectedStart = Math.floor(len / 2);
        }
        options = {
          matchDistance: len * 2,
          withFuzzyComparison: true
        };
        result = _this.textFinder.searchFuzzy(s.getCorpus(), quote, expectedStart, false, options);
        if (!result.matches.length) {
          dfd.reject("fuzzy found no match for '" + quote + "' @ " + expectedStart);
          return dfd.promise();
        }
        match = result.matches[0];
        return dfd.resolve(new _this.Annotator.TextPositionAnchor(_this.annotator, annotation, target, match.start, match.end, s.getPageIndexForPos(match.start), s.getPageIndexForPos(match.end), match.found, !match.exact ? match.comparison.diffHTML : void 0, !match.exact ? match.exactExceptCase : void 0));
      });
      return dfd.promise();
    };

    return FuzzyTextAnchors;

  })(Annotator.Plugin);

}).call(this);

//
//@ sourceMappingURL=annotator.fuzzytextanchors.map