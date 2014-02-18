// Generated by CoffeeScript 1.6.3
/*
** Annotator 1.2.6-dev-b588e84
** https://github.com/okfn/annotator/
**
** Copyright 2012 Aron Carroll, Rufus Pollock, and Nick Stenning.
** Dual licensed under the MIT and GPLv3 licenses.
** https://github.com/okfn/annotator/blob/master/LICENSE
**
** Built at: 2014-02-18 15:22:38Z
*/



/*
//
*/

// Generated by CoffeeScript 1.6.3
(function() {
  var ImageAnchor, ImageHighlight, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ImageHighlight = (function(_super) {
    __extends(ImageHighlight, _super);

    ImageHighlight.prototype.invisibleStyle = {
      outline: void 0,
      hi_outline: void 0,
      stroke: void 0,
      hi_stroke: void 0,
      fill: void 0,
      hi_fill: void 0
    };

    ImageHighlight.prototype.defaultStyle = {
      outline: '#000000',
      hi_outline: '#000000',
      stroke: '#ffffff',
      hi_stroke: '#fff000',
      fill: void 0,
      hi_fill: void 0
    };

    ImageHighlight.prototype.highlightStyle = {
      outline: '#000000',
      hi_outline: '#000000',
      stroke: '#fff000',
      hi_stroke: '#ff7f00',
      fill: void 0,
      hi_fill: void 0
    };

    ImageHighlight.Annotator = Annotator;

    ImageHighlight.$ = Annotator.$;

    function ImageHighlight(anchor, pageIndex, image, index, shape, geometry, annotorious) {
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      this.annotorious = annotorious;
      ImageHighlight.__super__.constructor.call(this, anchor, pageIndex);
      this.$ = ImageHighlight.$;
      this.Annotator = ImageHighlight.Annotator;
      this.visibleHighlight = false;
      this.active = false;
      this.annotoriousAnnotation = {
        text: (_ref = (_ref1 = this.annotation._formatted) != null ? _ref1.text : void 0) != null ? _ref : this.annotation.text,
        user: (_ref2 = (_ref3 = this.annotation._formatted) != null ? _ref3.user : void 0) != null ? _ref2 : this.annotation.user,
        reply_count: (_ref4 = (_ref5 = this.annotation._formatted) != null ? _ref5.reply_count : void 0) != null ? _ref4 : this.annotation.reply_count,
        id: this.annotation.id,
        temporaryID: this.annotation.temporaryImageID,
        image: image,
        index: index,
        highlight: this
      };
      if (this.annotation.temporaryImageID) {
        this.annotoriousAnnotation = this.annotorious.updateAnnotationAfterCreatingAnnotatorHighlight(this.annotoriousAnnotation, image, index);
        if (this.annotoriousAnnotation._bad != null) {
          this.annotation.temporaryImageID = void 0;
          this.annotorious.addAnnotationFromHighlight(this.annotoriousAnnotation, image, index, shape, geometry, this.defaultStyle);
          this.annotoriousAnnotation.temporaryID = void 0;
          this.annotoriousAnnotation._bad = void 0;
        }
      } else {
        this.annotorious.addAnnotationFromHighlight(this.annotoriousAnnotation, image, index, shape, geometry, this.defaultStyle);
      }
      this.oldID = this.annotation.id;
      this._image = image;
      this._index = index;
    }

    ImageHighlight.prototype.annotationUpdated = function() {
      var _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      this.annotoriousAnnotation.text = (_ref = (_ref1 = this.annotation._formatted) != null ? _ref1.text : void 0) != null ? _ref : this.annotation.text;
      this.annotoriousAnnotation.user = (_ref2 = (_ref3 = this.annotation._formatted) != null ? _ref3.user : void 0) != null ? _ref2 : this.annotation.user;
      this.annotoriousAnnotation.reply_count = (_ref4 = (_ref5 = this.annotation._formatted) != null ? _ref5.reply_count : void 0) != null ? _ref4 : this.annotation.reply_count;
      this.annotoriousAnnotation.id = this.annotation.id;
      if (this.oldID !== this.annotation.id) {
        delete this.annotoriousAnnotation.temporaryID;
      }
      return delete this.annotation.temporaryImageID;
    };

    ImageHighlight.prototype.removeFromDocument = function() {
      return this.annotorious.deleteAnnotation(this.annotoriousAnnotation, this._image, this._index);
    };

    ImageHighlight.prototype.isTemporary = function() {
      return this._temporary;
    };

    ImageHighlight.prototype.setTemporary = function(value) {
      return this._temporary = value;
    };

    ImageHighlight.prototype.setActive = function(value, batch) {
      if (batch == null) {
        batch = false;
      }
      this.active = value;
      if (!batch) {
        return this.annotorious.drawAnnotationHighlights(this._image, this._index, this.visibleHighlight);
      }
    };

    ImageHighlight.prototype._getDOMElements = function() {
      return this._image;
    };

    ImageHighlight.prototype.getTop = function() {
      return this.$(this._getDOMElements()).offset().top + this.annotoriousAnnotation.heatmapGeometry.y;
    };

    ImageHighlight.prototype.getHeight = function() {
      return this.annotoriousAnnotation.heatmapGeometry.h;
    };

    ImageHighlight.prototype.scrollTo = function() {
      return this.$(this._getDOMElements()).scrollintoview();
    };

    ImageHighlight.prototype.paddedScrollTo = function(direction) {
      return this.scrollTo();
    };

    ImageHighlight.prototype.setVisibleHighlight = function(state, batch) {
      if (batch == null) {
        batch = false;
      }
      this.visibleHighlight = state;
      if (state) {
        this.annotorious.updateShapeStyle(this.annotoriousAnnotation, this.highlightStyle);
      } else {
        this.annotorious.updateShapeStyle(this.annotoriousAnnotation, this.defaultStyle);
      }
      if (!batch) {
        return this.annotorious.drawAnnotationHighlights(this._image, this._index, this.visibleHighlight);
      }
    };

    return ImageHighlight;

  })(Annotator.Highlight);

  ImageAnchor = (function(_super) {
    __extends(ImageAnchor, _super);

    function ImageAnchor(annotator, annotation, target, startPage, endPage, quote, image, index, shape, geometry, annotorious) {
      this.image = image;
      this.index = index;
      this.shape = shape;
      this.geometry = geometry;
      this.annotorious = annotorious;
      ImageAnchor.__super__.constructor.call(this, annotator, annotation, target, startPage, endPage, quote);
    }

    ImageAnchor.prototype._createHighlight = function(page) {
      return new ImageHighlight(this, page, this.image, this.index, this.shape, this.geometry, this.annotorious);
    };

    return ImageAnchor;

  })(Annotator.Anchor);

  Annotator.Plugin.ImageAnchors = (function(_super) {
    __extends(ImageAnchors, _super);

    function ImageAnchors() {
      this.mouseOutAnnotations = __bind(this.mouseOutAnnotations, this);
      this.mouseOverAnnotations = __bind(this.mouseOverAnnotations, this);
      this.showAnnotations = __bind(this.showAnnotations, this);
      this.verifyImageAnchor = __bind(this.verifyImageAnchor, this);
      this.createImageAnchor = __bind(this.createImageAnchor, this);
      this._findAndVerifyImageForSelector = __bind(this._findAndVerifyImageForSelector, this);
      this.setHighlightsVisible = __bind(this.setHighlightsVisible, this);
      this._onMutation = __bind(this._onMutation, this);
      this._removeImage = __bind(this._removeImage, this);
      this._anchorAnnotationsForNewlyLoadedImages = __bind(this._anchorAnnotationsForNewlyLoadedImages, this);
      this._addImage = __bind(this._addImage, this);
      _ref = ImageAnchors.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ImageAnchors.prototype.pluginInit = function() {
      var annotoriousOptions, image, imagelist, style, wrapper, _i, _len, _ref1, _ref2,
        _this = this;
      this.highlightType = 'ImageHighlight';
      this.Annotator = Annotator;
      this.$ = Annotator.$;
      this._imageMap = {};
      this.visibleHighlights = false;
      wrapper = this.annotator.wrapper[0];
      annotoriousOptions = {
        minWidth: (_ref1 = this.options.minWidth) != null ? _ref1 : 50,
        minHeight: (_ref2 = this.options.minHeight) != null ? _ref2 : 50
      };
      this.annotorious = new Annotorious.ImagePlugin(wrapper, annotoriousOptions, this);
      imagelist = $(wrapper).find('img:visible');
      for (_i = 0, _len = imagelist.length; _i < _len; _i++) {
        image = imagelist[_i];
        this._addImage(image);
      }
      this.annotator.anchoringStrategies.push({
        name: "image",
        create: this.createImageAnchor,
        verify: this.verifyImageAnchor
      });
      this.annotator.subscribe("setVisibleHighlights", function(state) {
        _this.visibleHighlights = state;
        return _this.setHighlightsVisible(state);
      });
      this.annotator.subscribe("finalizeHighlights", function() {
        var error, imageList, index, src, _ref3, _results;
        _ref3 = _this._imageMap;
        _results = [];
        for (src in _ref3) {
          imageList = _ref3[src];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (index = _j = 0, _len1 = imageList.length; _j < _len1; index = ++_j) {
              image = imageList[index];
              try {
                _results1.push(this.annotorious.drawAnnotationHighlights(image, index, this.visibleHighlights));
              } catch (_error) {
                error = _error;
                console.log("Error: failed to draw image highlights for", src);
                _results1.push(console.log(error.stack));
              }
            }
            return _results1;
          }).call(_this));
        }
        return _results;
      });
      this.annotator.subscribe("annotationsLoaded", function() {
        if (_this.visibleHighlights) {
          return _this.setHighlightsVisible(true);
        }
      });
      style = $('#annotorious-dynamic-style');
      if (!style.length) {
        style = $('<style id="annotorious-dynamic-style"></style>').appendTo(document.head);
      }
      style.text([".annotorious-selection-in-progress {", "  z-index: " + (this.annotator.maxZIndex + 10) + ";", "  opacity: 0.75;", "}", ".annotorious-popup {", "  z-index: " + (this.annotator.maxZIndex + 20) + ";", "}"].join("\n"));
      return this.observer = new MutationSummary({
        callback: this._onMutation,
        rootNode: wrapper,
        queries: [
          {
            element: 'img',
            elementAttributes: 'src'
          }
        ]
      });
    };

    ImageAnchors.prototype._addImage = function(image) {
      var index;
      if (this._imageMap[image.src] == null) {
        this._imageMap[image.src] = [];
      }
      this._imageMap[image.src].push(image);
      index = this._imageMap[image.src].length - 1;
      return this.annotorious.addImage(image, index);
    };

    ImageAnchors.prototype._anchorAnnotationsForNewlyLoadedImages = function(sources) {
      var hasSelectorWithThisImageSource;
      hasSelectorWithThisImageSource = function(t) {
        var img_selector, _ref1;
        console.log('hasSelectorWithThisImageSource', t, sources);
        img_selector = this.annotator.findSelector(t, 'ShapeSelector');
        return _ref1 = img_selector != null ? img_selector.source : void 0, __indexOf.call(sources, _ref1) >= 0;
      };
      return this.annotator._anchorAllAnnotations(hasSelectorWithThisImageSource);
    };

    ImageAnchors.prototype._removeImage = function(image) {
      var t, _ref1;
      if (this._imageMap[image.src] == null) {
        return;
      }
      t = this._imageMap[image.src].indexOf(image);
      if (t > -1) {
        [].splice.apply(this._imageMap[image.src], [t, t - t + 1].concat(_ref1 = [])), _ref1;
      }
      return this.annotorious.removeImage(image, t);
    };

    ImageAnchors.prototype._onMutation = function(summaries) {
      var highlights, hl, image, oldImage, oldsrc, sources, summary, _i, _len, _ref1, _results,
        _this = this;
      _results = [];
      for (_i = 0, _len = summaries.length; _i < _len; _i++) {
        summary = summaries[_i];
        sources = {};
        summary.added.forEach(function(newImage) {
          _this._addImage(newImage);
          return sources[newImage.src] = true;
        });
        this._anchorAnnotationsForNewlyLoadedImages(sources);
        summary.removed.forEach(function(oldImage) {
          var highlights, hl, _j, _len1;
          highlights = _this.annotorious.getHighlightsForImage(oldImage);
          for (_j = 0, _len1 = highlights.length; _j < _len1; _j++) {
            hl = highlights[_j];
            hl.anchor.remove();
          }
          return _this._removeImage(oldImage);
        });
        summary.reparented.forEach(function(movedImage) {
          console.log('Image has been reparented!', movedImage);
          return console.log(summary.getOldParentNode(movedImage));
        });
        if ((_ref1 = summary.attributeChanged.src) != null ? _ref1.length : void 0) {
          _results.push((function() {
            var _j, _k, _len1, _len2, _ref2, _results1;
            _ref2 = summary.attributeChanged.src;
            _results1 = [];
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              image = _ref2[_j];
              oldsrc = summary.getOldAttribute(image, 'src');
              oldImage = (this._imageMap[oldsrc].filter(function(img) {
                return img.src !== oldsrc;
              }))[0];
              if (oldImage != null) {
                highlights = this.annotorious.getHighlightsForImage(oldImage);
                for (_k = 0, _len2 = highlights.length; _k < _len2; _k++) {
                  hl = highlights[_k];
                  hl.anchor.remove();
                }
                this._removeImage(oldImage);
              }
              this._addImage(image);
              _results1.push(this._anchorAnnotationsForNewlyLoadedImages([image.src]));
            }
            return _results1;
          }).call(this));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    ImageAnchors.prototype.setHighlightsVisible = function(state) {
      var hl, image, imageHighlights, imageList, index, src, _i, _len, _ref1, _results;
      imageHighlights = this.annotator.getHighlights().filter(function(hl) {
        return hl instanceof ImageHighlight;
      });
      for (_i = 0, _len = imageHighlights.length; _i < _len; _i++) {
        hl = imageHighlights[_i];
        hl.setVisibleHighlight(state, true);
      }
      _ref1 = this._imageMap;
      _results = [];
      for (src in _ref1) {
        imageList = _ref1[src];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (index = _j = 0, _len1 = imageList.length; _j < _len1; index = ++_j) {
            image = imageList[index];
            _results1.push(this.annotorious.drawAnnotationHighlights(image, index, this.visibleHighlights));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ImageAnchors.prototype._findAndVerifyImageForSelector = function(selector) {
      var candidate, idCandidate, image, imageList, ind, index, indexCandidate, _i, _len;
      image = void 0;
      index = void 0;
      imageList = this._imageMap[selector.source];
      if (imageList != null) {
        if (!selector.index) {
          selector.index = 0;
        }
        candidate = imageList[selector.index];
        if (candidate != null) {
          if (selector.id != null) {
            if ((candidate.id != null) && candidate.id === selector.id) {
              image = candidate;
              index = selector.index;
            } else {
              console.warn('Selector.id and candidate.id are different', selector.id, candidate.id);
              idCandidate = void 0;
              indexCandidate = void 0;
              for (ind = _i = 0, _len = imageList.length; _i < _len; ind = ++_i) {
                image = imageList[ind];
                if ((image.id != null) === selector.id) {
                  idCandidate = image;
                  indexCandidate = ind;
                }
              }
              image = idCandidate != null ? idCandidate : candidate;
              index = indexCandidate != null ? indexCandidate : selector.index;
            }
          } else {
            image = candidate;
            index = selector.index;
          }
        }
      } else {
        console.warn('No image found with source', selector.source);
      }
      return [image, index];
    };

    ImageAnchors.prototype.createImageAnchor = function(annotation, target) {
      var dfd, image, index, selector, _ref1;
      dfd = this.$.Deferred();
      selector = this.annotator.findSelector(target.selector, "ShapeSelector");
      if (selector == null) {
        dfd.reject("no ImageSelector found");
        return dfd.promise();
      }
      _ref1 = this._findAndVerifyImageForSelector(selector), image = _ref1[0], index = _ref1[1];
      if (!image) {
        dfd.reject("No such image exists as " + selector.source);
        return dfd.promise();
      }
      dfd.resolve(new ImageAnchor(this.annotator, annotation, target, 0, 0, '', image, index, selector.shapeType, selector.geometry, this.annotorious));
      return dfd.promise();
    };

    ImageAnchors.prototype.verifyImageAnchor = function(anchor, reason, data) {
      var dfd;
      dfd = this.$.Deferred();
      dfd.resolve(true);
      return dfd.promise();
    };

    ImageAnchors.prototype.annotate = function(image, index, shape, geometry, tempID, annotoriousAnnotation) {
      var event, result;
      event = {
        targets: [
          {
            source: this.annotator.getHref(),
            selector: [
              {
                type: "ShapeSelector",
                source: image.src,
                index: index,
                shapeType: shape,
                geometry: geometry
              }
            ]
          }
        ],
        annotationData: {
          temporaryImageID: tempID
        }
      };
      if (image.id != null) {
        event.targets[0].selector[0].id = image.id;
      }
      result = this.annotator.onSuccessfulSelection(event, true);
      if (!result) {
        return this.annotorious.deleteAnnotation(annotoriousAnnotation);
      }
    };

    ImageAnchors.prototype.showAnnotations = function(annotations) {
      if (!annotations.length) {
        return;
      }
      this.annotator.onAnchorMousedown(annotations, this.highlightType);
      return this.annotator.onAnchorClick(annotations, this.highlightType);
    };

    ImageAnchors.prototype.mouseOverAnnotations = function(annotations) {
      return this.annotator.onAnchorMouseover(annotations, this.highlightType);
    };

    ImageAnchors.prototype.mouseOutAnnotations = function(annotations) {
      return this.annotator.onAnchorMouseout(annotations, this.highlightType);
    };

    return ImageAnchors;

  })(Annotator.Plugin);

}).call(this);

//
//@ sourceMappingURL=annotator.imageanchors.map