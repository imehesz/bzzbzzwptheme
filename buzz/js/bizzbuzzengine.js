"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var DEBUG = true;

/**
 * Coordinate - handles all the coordinates related tasks
 */

var Coordinate = (function () {
    function Coordinate(coordinateStr) {
    _classCallCheck(this, Coordinate);

    this.coordinateStr = coordinateStr;
    this.coordinates = null;
    }

    _prototypeProperties(Coordinate, null, {
getCoordinates: {

/**
 * returns coordinates, also calls 2 point handler if needed
 * @return Array of Numbers
 */

value: function getCoordinates() {
if (this.coordinates != null) {
return this.coordinates;
}

var tmpCoords = this.coordinateStr.split(",");
if (tmpCoords.length > 4) {
this.coordinates = tmpCoords;
} else {
this.coordinates = this.handleTwoPointers(tmpCoords);
}

return this.coordinates;
    },
writable: true,
  configurable: true
  },
getCoordinateObjects: {

                        /**
                         * converts coordinates array to array of objects
                         * return Array of Objects
                         */

value: function getCoordinateObjects() {
         var xs = this.xs();
         var ys = this.ys();
         var retArr = [];

         for (var i = 0; i < xs.length; i++) {
           retArr.push({
x: xs[i], y: ys[i]
});
}

return retArr;
},
writable: true,
  configurable: true
  },
handleTwoPointers: {

                     /**
                      * handles 2 point coordinates (old school BizzBuzz slicing)
                      * @return Array of Numbers (4 point coordinates)
                      */

value: function handleTwoPointers(coords) {
         if (coords.length > 4) {
           return coords;
         }var x1 = coords[0];
         var y1 = coords[1];
         var x2 = coords[2];
         var y2 = coords[3];

         return [x1, y1, x2, y1, x2, y2, x1, y2];
       },
writable: true,
          configurable: true
                   },
xs: {

      /**
       * gets all the X coordinates
       * @return Array of Numbers
       */

value: (function (_xs) {
        var _xsWrapper = function xs() {
        return _xs.apply(this, arguments);
        };

        _xsWrapper.toString = function () {
        return _xs.toString();
        };

        return _xsWrapper;
        })(function () {
          var xs = [];
          var coords = this.getCoordinates();

          for (var i = 0; i < coords.length; i += 2) {
          xs.push(coords[i]);
          }

          return xs;
          }),
writable: true,
          configurable: true
    },
ys: {

      /**
       * gets all the Y coordinates
       * @return Array of Numbers
       */

value: (function (_ys) {
        var _ysWrapper = function ys() {
        return _ys.apply(this, arguments);
        };

        _ysWrapper.toString = function () {
        return _ys.toString();
        };

        return _ysWrapper;
        })(function () {
          var ys = [];
          var coords = this.getCoordinates();

          for (var i = 1; i < coords.length; i += 2) {
          ys.push(coords[i]);
          }

          return ys;
          }),
writable: true,
          configurable: true
    },
maxY: {

        /**
         * gets the max value from the Y coordinates
         * @return Number
         */

value: function maxY() {
         return Math.max.apply(Math, this.ys());
       },
writable: true,
          configurable: true
      },
minY: {

        /**
         * gets the min value from the Y coordinates
         * @return Number
         */

value: function minY() {
         return Math.min.apply(Math, this.ys());
       },
writable: true,
          configurable: true
      },
maxX: {

        /**
         * gets the max value from the X coordinates
         * @return Number
         */

value: function maxX() {
         return Math.max.apply(Math, this.xs());
       },
writable: true,
          configurable: true
      },
minX: {

        /**
         * gets the min value from the X coordinates
         * @return Number
         */

value: function minX() {
         return Math.min.apply(Math, this.xs());
       },
writable: true,
          configurable: true
      }
});

return Coordinate;
})();

var Page = (function () {
    function Page(url, coordinates) {
    _classCallCheck(this, Page);

    this.url = url;
    this.coordinates = coordinates;
    this.currentPanelIdx = 0;
    }

    _prototypeProperties(Page, null, {
getUrl: {
value: function getUrl() {
return this.url;
},
writable: true,
configurable: true
},
getPanelIndex: {
value: function getPanelIndex() {
return this.currentPanelIdx;
},
writable: true,
configurable: true
},
setPanelIndex: {
value: function setPanelIndex(idx) {
this.currentPanelIdx = idx;
},
writable: true,
configurable: true
    },
getPanelCount: {
value: function getPanelCount() {
         return this.coordinates.length;
       },
writable: true,
          configurable: true
               },
getCurrentPanel: {
value: function getCurrentPanel() {
         return this.coordinates[this.getPanelIndex()];
       },
writable: true,
          configurable: true
                 },
getNextPanel: {
value: function getNextPanel() {
         if (!this.isLastPanel()) this.setPanelIndex(this.getPanelIndex() + 1);
         return this.getCurrentPanel();
       },
writable: true,
          configurable: true
              },
getPreviousPanel: {
value: function getPreviousPanel() {
         if (!this.isFirstPanel()) this.setPanelIndex(this.getPanelIndex() - 1);
         return this.getCurrentPanel();
       },
writable: true,
          configurable: true
                  },
isLastPanel: {
value: function isLastPanel() {
         return this.getPanelIndex() == this.getPanelCount() - 1;
       },
writable: true,
          configurable: true
             },
isFirstPanel: {
value: function isFirstPanel() {
         return this.getPanelIndex() == 0;
       },
writable: true,
          configurable: true
              }
});

return Page;
})();

var BookManager = (function () {
    function BookManager(bookObj) {
    _classCallCheck(this, BookManager);

    this.setBook(bookObj);
    this.PAGE_VIEW = 1;
    this.PANEL_VIEW = 2;
    this.viewLevel = this.PANEL_VIEW;
    this.currentPageIdx = 0;
    }

    _prototypeProperties(BookManager, null, {
getViewLevel: {
value: function getViewLevel() {
return this.viewLevel;
},
writable: true,
configurable: true
},
setViewLevel: {
value: function setViewLevel(level) {
this.viewLevel = level;
},
writable: true,
configurable: true
},
getBook: {
value: function getBook() {
return this.bookObj;
},
writable: true,
configurable: true
    },
setBook: {
value: function setBook(bookObj) {
         this.pages = bookObj.pages;
         this.bookObj = bookObj;
         this.currentPageIdx = 0;
       },
writable: true,
          configurable: true
         },
getMaxPage: {
value: function getMaxPage() {
         return this.getBook().pages.length;
       },
writable: true,
          configurable: true
            },
getCurrentPage: {
value: function getCurrentPage(cb, scope) {
         // console.log("Loading image: " + this.pages[this.currentPageIdx].url);
         var page = this.pages[this.currentPageIdx];
         var image = new Image();
         image.src = this.pages[this.currentPageIdx].url;
         image.onload = function (e) {
           page.width = this.width;
           page.height = this.height;
           if (typeof cb == "function") cb.apply(scope);
         };

         return page;
       },
writable: true,
          configurable: true
                },
getNextPage: {
value: function getNextPage(cb, scope) {
         if (!this.isLastPage()) this.currentPageIdx++;
         return this.getCurrentPage(cb, scope, 0);
       },
writable: true,
          configurable: true
             },
getPreviousPage: {
value: function getPreviousPage(cb, scope) {
         if (!this.isFirstPage()) this.currentPageIdx--;
         return this.getCurrentPage(cb, scope, this.pages[this.currentPageIdx].coordinates.length);
       },
writable: true,
          configurable: true
                 },
isLastPage: {
value: function isLastPage() {
         return this.currentPageIdx == this.getMaxPage() - 1;
       },
writable: true,
          configurable: true
            },
isFirstPage: {
value: function isFirstPage() {
         return this.currentPageIdx == 0;
       },
writable: true,
          configurable: true
             }
});

return BookManager;
})();

var Projector = (function () {
    function Projector(projectorId, bookManager) {
    _classCallCheck(this, Projector);

    this.projectorId = projectorId;
    this.bookManager = bookManager;

    this.setPage(this.bookManager.getCurrentPage());
    this.setPanel(this.getPage().getCurrentPanel());
    this.c = null;
    this.ctx = null;

    this.width = this.getWidth();
    this.height = this.getHeight();

    this.zoomer = 1;
    this.bgMoveX = 0;
    this.bgMoveY = 0;
    }

    _prototypeProperties(Projector, null, {
getPage: {
value: function getPage() {
return this.page;
},
writable: true,
configurable: true
},
setPage: {
value: function setPage(page) {
this.page = page;
// TODO we shouldn't need to get the projector all the time ...
var proj = document.querySelector("#" + this.projectorId);
proj.style.backgroundImage = "url(" + this.page.getUrl() + ")";
},
writable: true,
configurable: true
},
getPanel: {
value: function getPanel() {
return this.panel;
       },
writable: true,
          configurable: true
          },
setPanel: {
value: function setPanel(panel) {
         this.panel = panel;
       },
writable: true,
          configurable: true
          },
getWidth: {
value: function getWidth() {
         return this.width = document.querySelector("#" + this.projectorId).offsetWidth;
       },
writable: true,
          configurable: true
          },
getHeight: {
value: function getHeight() {
         return this.height = document.querySelector("#" + this.projectorId).offsetHeight;
       },
writable: true,
          configurable: true
           },
adjustBackground: {
value: function adjustBackground() {
         if (this.bookManager.getViewLevel() == this.bookManager.PANEL_VIEW) {
           document.querySelector("#" + this.projectorId).style.backgroundPosition = "" + this.bgMoveX + "px " + this.bgMoveY + "px";
         } else {
           document.querySelector("#" + this.projectorId).style.backgroundPosition = "center";
         }

         document.querySelector("#" + this.projectorId).style.backgroundSize = "" + this.getPage().width * this.zoomer + "px " + this.getPage().height * this.zoomer + "px";
       },
writable: true,
          configurable: true
                  },
render: {
value: function render(coords) {
         if (this.c == null) {
           this.c = document.querySelector("#projector-overlay");
         }

         // TODO maybe overkill but we don't have to worry about resizing
         // and portrait vs. landscape modes
         this.c.setAttribute("width", this.c.parentElement.clientWidth);
         this.c.setAttribute("height", this.c.parentElement.clientHeight);

         if (this.ctx == null && this.c != null) {
           this.ctx = this.c.getContext("2d");
         }

         if (this.ctx) {
           this.ctx.clearRect(0, 0, this.c.width, this.c.height);

           this.ctx.fillStyle = "black";
           this.ctx.fillRect(0, 0, this.c.width, this.c.height);

           this.ctx.fillStyle = "rgba(0,0,0,1)";
           this.ctx.globalCompositeOperation = "destination-out";

           this.ctx.beginPath();

           for (var i = 0; i < coords.length; i++) {
             var coord = coords[i];
             if (i == 0) this.ctx.moveTo(coord.x, coord.y);
             if (i > 0) this.ctx.lineTo(coord.x, coord.y);
           }

           this.ctx.fill();
           this.ctx.globalCompositeOperation = "source-over";
         }
       },
writable: true,
          configurable: true
        },
calculateProjectorCoordinates: {
value: function calculateProjectorCoordinates(coords) {
         var _this = this;

         var t = this;

         var panelCoords = new Coordinate(coords.join(","));
         var panelCoordObjs = panelCoords.getCoordinateObjects();

         var projCoordObjs = [];
         var projCoords = [];

         var pageWidth = this.page.width;
         var pageHeight = this.page.height;

         var origPanelWidth = panelCoords.maxX() - panelCoords.minX();
         var origPanelHeight = panelCoords.maxY() - panelCoords.minY();

         var isLandscape = origPanelWidth > origPanelHeight;
         var isPortrait = !isLandscape;

         var projectorWidth = this.width;
         var projectorHeight = this.height;

         var widthZoom = projectorWidth / origPanelWidth;
         var heightZoom = projectorHeight / origPanelHeight;
         this.zoomer = widthZoom;

         var panelWidth = Math.floor(origPanelWidth * this.zoomer);
         var panelHeight = Math.floor(origPanelHeight * this.zoomer);

         var centerX = Math.floor(projectorWidth / 2);
         var centerY = Math.floor(projectorHeight / 2);

         var xCorrection = Math.floor(panelCoords.minX() * this.zoomer);
         var yCorrection = Math.floor(panelCoords.minY() * this.zoomer - (projectorHeight - panelHeight) / 2);

         panelCoordObjs.forEach(function (coord) {
             var tmpX = coord.x;
             var tmpY = coord.y;

             if (tmpX < 0) tmpX = 0;
             if (tmpX > pageWidth) tmpX = pageWidth;

             if (tmpY < 0) tmpY = 0;
             if (tmpY > pageHeight) tmpY = pageHeight;

             if (isPortrait || panelHeight > projectorHeight) {
             _this.zoomer = heightZoom;
             panelWidth = Math.floor(origPanelWidth * _this.zoomer);
             panelHeight = Math.floor(origPanelHeight * _this.zoomer);

             xCorrection = Math.floor(panelCoords.minX() * _this.zoomer - (projectorWidth - panelWidth) / 2);
             yCorrection = Math.floor(panelCoords.minY() * _this.zoomer);

             if (panelWidth > projectorWidth) {
             _this.zoomer = widthZoom;
             panelWidth = Math.floor(origPanelWidth * _this.zoomer);
             panelHeight = Math.floor(origPanelHeight * _this.zoomer);

             xCorrection = Math.floor(panelCoords.minX() * _this.zoomer);
             yCorrection = Math.floor(panelCoords.minY() * _this.zoomer - (projectorHeight - panelHeight) / 2);
             }
             }

             tmpX *= _this.zoomer;
             tmpY *= _this.zoomer;

             projCoords.push({ x: Math.floor(tmpX) - xCorrection, y: Math.floor(tmpY) - yCorrection });
         });

         // setting background movement, it only matters if we are in PANEL_VIEW but we set it anyway
         this.bgMoveX = centerX - panelCoords.minX() * this.zoomer - panelWidth / 2;
         this.bgMoveY = centerY - panelCoords.minY() * this.zoomer - panelHeight / 2;

         return projCoords;
       },
writable: true,
          configurable: true
                               },
project: {
value: function project() {
         this.width = this.getWidth();
         this.height = this.getHeight();
         if (this.bookManager.getViewLevel() == this.bookManager.PANEL_VIEW) {
           this.render(this.calculateProjectorCoordinates(this.getPanel().getCoordinates()));
         } else {
           this.render(this.calculateProjectorCoordinates(new Coordinate("0,0," + this.page.width + "," + this.page.height).getCoordinates()));
         }

         this.adjustBackground();
       },
writable: true,
          configurable: true
         },
next: {
value: function next() {
         var loadNextPage = false;

         if (this.bookManager.getViewLevel() == this.bookManager.PANEL_VIEW) {
           // if it is the last panel, we try to load the next page
           if (this.getPage().isLastPanel()) {
             loadNextPage = true;
           } else {
             this.setPanel(this.getPage().getNextPanel());
             this.project();
             return;
           }
         } else {
           loadNextPage = true;
         }

         if (loadNextPage) {
           if (!this.bookManager.isLastPage()) {
             this.setPage(this.bookManager.getNextPage(function () {
                   this.getPage().setPanelIndex(0);
                   this.setPanel(this.getPage().getCurrentPanel());
                   this.project();
                   }, this));
           }
         }
       },
writable: true,
          configurable: true
      },
prev: {
value: function prev() {
         var loadPreviousPage = false;

         if (this.bookManager.getViewLevel() == this.bookManager.PANEL_VIEW) {
           // if it's the first panel, we have to get the previous page
           if (this.getPage().isFirstPanel()) {
             loadPreviousPage = true;
           } else {
             this.setPanel(this.getPage().getPreviousPanel());
             this.project();
             return;
           }
         } else {
           loadPreviousPage = true;
         }

         if (loadPreviousPage) {
           if (!this.bookManager.isFirstPage()) {
             this.setPage(this.bookManager.getPreviousPage(function () {
                   this.getPage().setPanelIndex(this.getPage().getPanelCount() - 1);
                   this.setPanel(this.getPage().getCurrentPanel());
                   this.project();
                   }, this));
           }
         }
       },
writable: true,
          configurable: true
      }
});

return Projector;
})();
