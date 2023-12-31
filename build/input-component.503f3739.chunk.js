"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[1077],{

/***/ 55717:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ components_Input)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(75515);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Loader/Loader.js + 1 modules
var Loader = __webpack_require__(77197);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(29728);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Refresh.js
var Refresh = __webpack_require__(30815);
;// CONCATENATED MODULE: ./node_modules/latlon-geohash/latlon-geohash.js
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/* Geohash encoding/decoding and associated functions   (c) Chris Veness 2014-2019 / MIT Licence  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

const base32 = '0123456789bcdefghjkmnpqrstuvwxyz'; // (geohash-specific) Base32 map


/**
 * Geohash: Gustavo Niemeyer’s geocoding system.
 */
class Geohash {

    /**
     * Encodes latitude/longitude to geohash, either to specified precision or to automatically
     * evaluated precision.
     *
     * @param   {number} lat - Latitude in degrees.
     * @param   {number} lon - Longitude in degrees.
     * @param   {number} [precision] - Number of characters in resulting geohash.
     * @returns {string} Geohash of supplied latitude/longitude.
     * @throws  Invalid geohash.
     *
     * @example
     *     const geohash = Geohash.encode(52.205, 0.119, 7); // => 'u120fxw'
     */
    static encode(lat, lon, precision) {
        // infer precision?
        if (typeof precision == 'undefined') {
            // refine geohash until it matches precision of supplied lat/lon
            for (let p=1; p<=12; p++) {
                const hash = Geohash.encode(lat, lon, p);
                const posn = Geohash.decode(hash);
                if (posn.lat==lat && posn.lon==lon) return hash;
            }
            precision = 12; // set to maximum
        }

        lat = Number(lat);
        lon = Number(lon);
        precision = Number(precision);

        if (isNaN(lat) || isNaN(lon) || isNaN(precision)) throw new Error('Invalid geohash');

        let idx = 0; // index into base32 map
        let bit = 0; // each char holds 5 bits
        let evenBit = true;
        let geohash = '';

        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        while (geohash.length < precision) {
            if (evenBit) {
                // bisect E-W longitude
                const lonMid = (lonMin + lonMax) / 2;
                if (lon >= lonMid) {
                    idx = idx*2 + 1;
                    lonMin = lonMid;
                } else {
                    idx = idx*2;
                    lonMax = lonMid;
                }
            } else {
                // bisect N-S latitude
                const latMid = (latMin + latMax) / 2;
                if (lat >= latMid) {
                    idx = idx*2 + 1;
                    latMin = latMid;
                } else {
                    idx = idx*2;
                    latMax = latMid;
                }
            }
            evenBit = !evenBit;

            if (++bit == 5) {
                // 5 bits gives us a character: append it and start over
                geohash += base32.charAt(idx);
                bit = 0;
                idx = 0;
            }
        }

        return geohash;
    }


    /**
     * Decode geohash to latitude/longitude (location is approximate centre of geohash cell,
     *     to reasonable precision).
     *
     * @param   {string} geohash - Geohash string to be converted to latitude/longitude.
     * @returns {{lat:number, lon:number}} (Center of) geohashed location.
     * @throws  Invalid geohash.
     *
     * @example
     *     const latlon = Geohash.decode('u120fxw'); // => { lat: 52.205, lon: 0.1188 }
     */
    static decode(geohash) {

        const bounds = Geohash.bounds(geohash); // <-- the hard work
        // now just determine the centre of the cell...

        const latMin = bounds.sw.lat, lonMin = bounds.sw.lon;
        const latMax = bounds.ne.lat, lonMax = bounds.ne.lon;

        // cell centre
        let lat = (latMin + latMax)/2;
        let lon = (lonMin + lonMax)/2;

        // round to close to centre without excessive precision: ⌊2-log10(Δ°)⌋ decimal places
        lat = lat.toFixed(Math.floor(2-Math.log(latMax-latMin)/Math.LN10));
        lon = lon.toFixed(Math.floor(2-Math.log(lonMax-lonMin)/Math.LN10));

        return { lat: Number(lat), lon: Number(lon) };
    }


    /**
     * Returns SW/NE latitude/longitude bounds of specified geohash.
     *
     * @param   {string} geohash - Cell that bounds are required of.
     * @returns {{sw: {lat: number, lon: number}, ne: {lat: number, lon: number}}}
     * @throws  Invalid geohash.
     */
    static bounds(geohash) {
        if (geohash.length == 0) throw new Error('Invalid geohash');

        geohash = geohash.toLowerCase();

        let evenBit = true;
        let latMin =  -90, latMax =  90;
        let lonMin = -180, lonMax = 180;

        for (let i=0; i<geohash.length; i++) {
            const chr = geohash.charAt(i);
            const idx = base32.indexOf(chr);
            if (idx == -1) throw new Error('Invalid geohash');

            for (let n=4; n>=0; n--) {
                const bitN = idx >> n & 1;
                if (evenBit) {
                    // longitude
                    const lonMid = (lonMin+lonMax) / 2;
                    if (bitN == 1) {
                        lonMin = lonMid;
                    } else {
                        lonMax = lonMid;
                    }
                } else {
                    // latitude
                    const latMid = (latMin+latMax) / 2;
                    if (bitN == 1) {
                        latMin = latMid;
                    } else {
                        latMax = latMid;
                    }
                }
                evenBit = !evenBit;
            }
        }

        const bounds = {
            sw: { lat: latMin, lon: lonMin },
            ne: { lat: latMax, lon: lonMax },
        };

        return bounds;
    }


    /**
     * Determines adjacent cell in given direction.
     *
     * @param   geohash - Cell to which adjacent cell is required.
     * @param   direction - Direction from geohash (N/S/E/W).
     * @returns {string} Geocode of adjacent cell.
     * @throws  Invalid geohash.
     */
    static adjacent(geohash, direction) {
        // based on github.com/davetroy/geohash-js

        geohash = geohash.toLowerCase();
        direction = direction.toLowerCase();

        if (geohash.length == 0) throw new Error('Invalid geohash');
        if ('nsew'.indexOf(direction) == -1) throw new Error('Invalid direction');

        const neighbour = {
            n: [ 'p0r21436x8zb9dcf5h7kjnmqesgutwvy', 'bc01fg45238967deuvhjyznpkmstqrwx' ],
            s: [ '14365h7k9dcfesgujnmqp0r2twvyx8zb', '238967debc01fg45kmstqrwxuvhjyznp' ],
            e: [ 'bc01fg45238967deuvhjyznpkmstqrwx', 'p0r21436x8zb9dcf5h7kjnmqesgutwvy' ],
            w: [ '238967debc01fg45kmstqrwxuvhjyznp', '14365h7k9dcfesgujnmqp0r2twvyx8zb' ],
        };
        const border = {
            n: [ 'prxz',     'bcfguvyz' ],
            s: [ '028b',     '0145hjnp' ],
            e: [ 'bcfguvyz', 'prxz'     ],
            w: [ '0145hjnp', '028b'     ],
        };

        const lastCh = geohash.slice(-1);    // last character of hash
        let parent = geohash.slice(0, -1); // hash without last character

        const type = geohash.length % 2;

        // check for edge-cases which don't share common prefix
        if (border[direction][type].indexOf(lastCh) != -1 && parent != '') {
            parent = Geohash.adjacent(parent, direction);
        }

        // append letter for direction to parent
        return parent + base32.charAt(neighbour[direction][type].indexOf(lastCh));
    }


    /**
     * Returns all 8 adjacent cells to specified geohash.
     *
     * @param   {string} geohash - Geohash neighbours are required of.
     * @returns {{n,ne,e,se,s,sw,w,nw: string}}
     * @throws  Invalid geohash.
     */
    static neighbours(geohash) {
        return {
            'n':  Geohash.adjacent(geohash, 'n'),
            'ne': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'e'),
            'e':  Geohash.adjacent(geohash, 'e'),
            'se': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'e'),
            's':  Geohash.adjacent(geohash, 's'),
            'sw': Geohash.adjacent(Geohash.adjacent(geohash, 's'), 'w'),
            'w':  Geohash.adjacent(geohash, 'w'),
            'nw': Geohash.adjacent(Geohash.adjacent(geohash, 'n'), 'w'),
        };
    }

}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

/* harmony default export */ const latlon_geohash = (Geohash);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(73935);
;// CONCATENATED MODULE: ./node_modules/@react-google-maps/api/dist/esm.js






var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = "production";

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

const MapContext = (0,react.createContext)(null);
function useGoogleMap() {
    invariant_1(!!react.useContext, 'useGoogleMap is React hook and requires React version 16.8+');
    const map = (0,react.useContext)(MapContext);
    invariant_1(!!map, 'useGoogleMap needs a GoogleMap available up in the tree');
    return map;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function reduce(obj, fn, acc) {
    return Object.keys(obj).reduce(function reducer(newAcc, key) {
        return fn(newAcc, obj[key], key);
    }, acc);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forEach(obj, fn) {
    Object.keys(obj).forEach((key) => {
        return fn(obj[key], key);
    });
}

/* global google */
function applyUpdaterToNextProps(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
updaterMap, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
prevProps, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
nextProps, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iter = (fn, key) => {
        const nextValue = nextProps[key];
        if (nextValue !== prevProps[key]) {
            map[key] = nextValue;
            fn(instance, nextValue);
        }
    };
    forEach(updaterMap, iter);
    return map;
}
function registerEvents(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
props, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance, eventMap) {
    const registeredList = reduce(eventMap, function reducer(acc, googleEventName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEventName) {
        if (typeof props[onEventName] === 'function') {
            acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
        }
        return acc;
    }, []);
    return registeredList;
}
function unregisterEvent(registered) {
    google.maps.event.removeListener(registered);
}
function unregisterEvents(events = []) {
    events.forEach(unregisterEvent);
}
function applyUpdatersToPropsAndRegisterEvents({ updaterMap, eventMap, prevProps, nextProps, instance, }) {
    const registeredEvents = registerEvents(nextProps, instance, eventMap);
    applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance);
    return registeredEvents;
}

const eventMap$i = {
    onDblClick: 'dblclick',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMapTypeIdChanged: 'maptypeid_changed',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseDown: 'mousedown',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
    onTilesLoaded: 'tilesloaded',
    onBoundsChanged: 'bounds_changed',
    onCenterChanged: 'center_changed',
    onClick: 'click',
    onDrag: 'drag',
    onHeadingChanged: 'heading_changed',
    onIdle: 'idle',
    onProjectionChanged: 'projection_changed',
    onResize: 'resize',
    onTiltChanged: 'tilt_changed',
    onZoomChanged: 'zoom_changed',
};
const updaterMap$i = {
    extraMapTypes(map, extra) {
        extra.forEach(function forEachExtra(it, i) {
            map.mapTypes.set(String(i), it);
        });
    },
    center(map, center) {
        map.setCenter(center);
    },
    clickableIcons(map, clickable) {
        map.setClickableIcons(clickable);
    },
    heading(map, heading) {
        map.setHeading(heading);
    },
    mapTypeId(map, mapTypeId) {
        map.setMapTypeId(mapTypeId);
    },
    options(map, options) {
        map.setOptions(options);
    },
    streetView(map, streetView) {
        map.setStreetView(streetView);
    },
    tilt(map, tilt) {
        map.setTilt(tilt);
    },
    zoom(map, zoom) {
        map.setZoom(zoom);
    },
};
// TODO: unfinished!
function GoogleMapFunctional({ children, options, id, mapContainerStyle, mapContainerClassName, center, 
// clickableIcons,
// extraMapTypes,
// heading,
// mapTypeId,
onClick, onDblClick, onDrag, onDragEnd, onDragStart, onMouseMove, onMouseOut, onMouseOver, onMouseDown, onMouseUp, onRightClick, 
// onMapTypeIdChanged,
// onTilesLoaded,
// onBoundsChanged,
onCenterChanged, 
// onHeadingChanged,
// onIdle,
// onProjectionChanged,
// onResize,
// onTiltChanged,
// onZoomChanged,
onLoad, onUnmount, }) {
    const [map, setMap] = (0,react.useState)(null);
    const ref = (0,react.useRef)(null);
    // const [extraMapTypesListener, setExtraMapTypesListener] = useState<google.maps.MapsEventListener | null>(null)
    const [centerChangedListener, setCenterChangedListener] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (options && map !== null) {
            map.setOptions(options);
        }
    }, [map, options]);
    (0,react.useEffect)(() => {
        if (map !== null && typeof center !== 'undefined') {
            map.setCenter(center);
        }
    }, [map, center]);
    (0,react.useEffect)(() => {
        if (map && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(map, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (map && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(map, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (map && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(map, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (map && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(map, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (map && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(map, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (map && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(map, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (map && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(map, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (map && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(map, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (map && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(map, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (map && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(map, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (map && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(map, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        if (map && onCenterChanged) {
            if (centerChangedListener !== null) {
                google.maps.event.removeListener(centerChangedListener);
            }
            setCenterChangedListener(google.maps.event.addListener(map, 'center_changed', onCenterChanged));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        const map = ref.current === null
            ? null
            : new google.maps.Map(ref.current, options);
        setMap(map);
        if (map !== null && onLoad) {
            onLoad(map);
        }
        return () => {
            if (map !== null) {
                if (onUnmount) {
                    onUnmount(map);
                }
            }
        };
    }, []);
    return ((0,jsx_runtime.jsx)("div", Object.assign({ id: id, ref: ref, style: mapContainerStyle, className: mapContainerClassName }, { children: (0,jsx_runtime.jsx)(MapContext.Provider, Object.assign({ value: map }, { children: map !== null ? children : (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {}) })) })));
}
(0,react.memo)(GoogleMapFunctional);
class GoogleMap extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            map: null,
        };
        this.registeredEvents = [];
        this.mapRef = null;
        this.getInstance = () => {
            if (this.mapRef === null) {
                return null;
            }
            return new google.maps.Map(this.mapRef, this.props.options);
        };
        this.panTo = (latLng) => {
            const map = this.getInstance();
            if (map) {
                map.panTo(latLng);
            }
        };
        this.setMapCallback = () => {
            if (this.state.map !== null) {
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.map);
                }
            }
        };
        this.getRef = (ref) => {
            this.mapRef = ref;
        };
    }
    componentDidMount() {
        const map = this.getInstance();
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$i,
            eventMap: eventMap$i,
            prevProps: {},
            nextProps: this.props,
            instance: map,
        });
        this.setState(function setMap() {
            return {
                map,
            };
        }, this.setMapCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.map !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$i,
                eventMap: eventMap$i,
                prevProps,
                nextProps: this.props,
                instance: this.state.map,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.map !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.map);
            }
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return ((0,jsx_runtime.jsx)("div", Object.assign({ id: this.props.id, ref: this.getRef, style: this.props.mapContainerStyle, className: this.props.mapContainerClassName }, { children: (0,jsx_runtime.jsx)(MapContext.Provider, Object.assign({ value: this.state.map }, { children: this.state.map !== null ? this.props.children : (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {}) })) })));
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest$1(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const isBrowser = typeof document !== 'undefined';

function injectScript({ url, id, nonce }) {
    if (!isBrowser) {
        return Promise.reject(new Error('document is undefined'));
    }
    return new Promise(function injectScriptCallback(resolve, reject) {
        const existingScript = document.getElementById(id);
        const windowWithGoogleMap = window;
        if (existingScript) {
            // Same script id/url: keep same script
            const dataStateAttribute = existingScript.getAttribute('data-state');
            if (existingScript.src === url && dataStateAttribute !== 'error') {
                if (dataStateAttribute === 'ready') {
                    return resolve(id);
                }
                else {
                    const originalInitMap = windowWithGoogleMap.initMap;
                    const originalErrorCallback = existingScript.onerror;
                    windowWithGoogleMap.initMap = function initMap() {
                        if (originalInitMap) {
                            originalInitMap();
                        }
                        resolve(id);
                    };
                    existingScript.onerror = function (err) {
                        if (originalErrorCallback) {
                            originalErrorCallback(err);
                        }
                        reject(err);
                    };
                    return;
                }
            }
            // Same script id, but either
            // 1. requested URL is different
            // 2. script failed to load
            else {
                existingScript.remove();
            }
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.async = true;
        script.nonce = nonce;
        script.onerror = function onerror(err) {
            script.setAttribute('data-state', 'error');
            reject(err);
        };
        windowWithGoogleMap.initMap = function onload() {
            script.setAttribute('data-state', 'ready');
            resolve(id);
        };
        document.head.appendChild(script);
    }).catch(err => {
        console.error('injectScript error: ', err);
        throw err;
    });
}

function isGoogleFontStyle(element) {
    // 'Roboto' or 'Google Sans Text' font download
    const href = element.href;
    if (href && (href.indexOf('https://fonts.googleapis.com/css?family=Roboto') === 0 ||
        href.indexOf('https://fonts.googleapis.com/css?family=Google+Sans+Text') === 0)) {
        return true;
    }
    // font style elements
    if (element.tagName.toLowerCase() === 'style' &&
        // @ts-ignore
        element.styleSheet &&
        // @ts-ignore
        element.styleSheet.cssText &&
        // @ts-ignore
        element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0) {
        // @ts-ignore
        element.styleSheet.cssText = '';
        return true;
    }
    // font style elements for other browsers
    if (element.tagName.toLowerCase() === 'style' &&
        element.innerHTML &&
        element.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0) {
        element.innerHTML = '';
        return true;
    }
    // when google tries to add empty style
    if (element.tagName.toLowerCase() === 'style' &&
        // @ts-ignore
        !element.styleSheet &&
        !element.innerHTML) {
        return true;
    }
    return false;
}
// Preventing the Google Maps library from downloading an extra font
function preventGoogleFonts() {
    // we override these methods only for one particular head element
    // default methods for other elements are not affected
    const head = document.getElementsByTagName('head')[0];
    const trueInsertBefore = head.insertBefore.bind(head);
    // TODO: adding return before reflect solves the TS issue
    // @ts-ignore
    head.insertBefore = function insertBefore(newElement, referenceElement) {
        if (!isGoogleFontStyle(newElement)) {
            Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
        }
    };
    const trueAppend = head.appendChild.bind(head);
    // TODO: adding return before reflect solves the TS issue
    // @ts-ignore
    head.appendChild = function appendChild(textNode) {
        if (!isGoogleFontStyle(textNode)) {
            Reflect.apply(trueAppend, head, [textNode]);
        }
    };
}

function makeLoadScriptUrl({ googleMapsApiKey, googleMapsClientId, version = 'weekly', language, region, libraries, channel, mapIds, authReferrerPolicy }) {
    const params = [];
    invariant_1((googleMapsApiKey && googleMapsClientId) || !(googleMapsApiKey && googleMapsClientId), 'You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.');
    if (googleMapsApiKey) {
        params.push(`key=${googleMapsApiKey}`);
    }
    else if (googleMapsClientId) {
        params.push(`client=${googleMapsClientId}`);
    }
    if (version) {
        params.push(`v=${version}`);
    }
    if (language) {
        params.push(`language=${language}`);
    }
    if (region) {
        params.push(`region=${region}`);
    }
    if (libraries && libraries.length) {
        params.push(`libraries=${libraries.sort().join(',')}`);
    }
    if (channel) {
        params.push(`channel=${channel}`);
    }
    if (mapIds && mapIds.length) {
        params.push(`map_ids=${mapIds.join(',')}`);
    }
    if (authReferrerPolicy) {
        params.push(`auth_referrer_policy=${authReferrerPolicy}`);
    }
    params.push('callback=initMap');
    return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;
}

let cleaningUp = false;
function DefaultLoadingElement() {
    return (0,jsx_runtime.jsx)("div", { children: `Loading...` });
}
const defaultLoadScriptProps = {
    id: 'script-loader',
    version: 'weekly',
};
class LoadScript extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.check = (0,react.createRef)();
        this.state = {
            loaded: false,
        };
        this.cleanupCallback = () => {
            // @ts-ignore
            delete window.google.maps;
            this.injectScript();
        };
        this.isCleaningUp = () => __awaiter(this, void 0, void 0, function* () {
            function promiseCallback(resolve) {
                if (!cleaningUp) {
                    resolve();
                }
                else {
                    if (isBrowser) {
                        const timer = window.setInterval(function interval() {
                            if (!cleaningUp) {
                                window.clearInterval(timer);
                                resolve();
                            }
                        }, 1);
                    }
                }
                return;
            }
            return new Promise(promiseCallback);
        });
        this.cleanup = () => {
            cleaningUp = true;
            const script = document.getElementById(this.props.id);
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
            Array.prototype.slice
                .call(document.getElementsByTagName('script'))
                .filter(function filter(script) {
                return typeof script.src === 'string' && script.src.includes('maps.googleapis');
            })
                .forEach(function forEach(script) {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
            Array.prototype.slice
                .call(document.getElementsByTagName('link'))
                .filter(function filter(link) {
                return (link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans');
            })
                .forEach(function forEach(link) {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            });
            Array.prototype.slice
                .call(document.getElementsByTagName('style'))
                .filter(function filter(style) {
                return (style.innerText !== undefined &&
                    style.innerText.length > 0 &&
                    style.innerText.includes('.gm-'));
            })
                .forEach(function forEach(style) {
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            });
        };
        this.injectScript = () => {
            if (this.props.preventGoogleFontsLoading) {
                preventGoogleFonts();
            }
            invariant_1(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
            const injectScriptOptions = {
                id: this.props.id,
                nonce: this.props.nonce,
                url: makeLoadScriptUrl(this.props),
            };
            injectScript(injectScriptOptions)
                .then(() => {
                if (this.props.onLoad) {
                    this.props.onLoad();
                }
                this.setState(function setLoaded() {
                    return {
                        loaded: true,
                    };
                });
                return;
            })
                .catch(err => {
                if (this.props.onError) {
                    this.props.onError(err);
                }
                console.error(`
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${this
                    .props.googleMapsApiKey || '-'}) or Client ID (${this.props.googleMapsClientId ||
                    '-'}) to <LoadScript />
          Otherwise it is a Network issue.
        `);
            });
        };
    }
    componentDidMount() {
        if (isBrowser) {
            if (window.google && window.google.maps && !cleaningUp) {
                console.error('google api is already presented');
                return;
            }
            this.isCleaningUp()
                .then(this.injectScript)
                .catch(function error(err) {
                console.error('Error at injecting script after cleaning up: ', err);
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.libraries !== prevProps.libraries) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        if (isBrowser && prevProps.language !== this.props.language) {
            this.cleanup();
            // TODO: refactor to use gDSFP maybe... wait for hooks refactoring.
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(function setLoaded() {
                return {
                    loaded: false,
                };
            }, this.cleanupCallback);
        }
    }
    componentWillUnmount() {
        if (isBrowser) {
            this.cleanup();
            const timeoutCallback = () => {
                if (!this.check.current) {
                    // @ts-ignore
                    delete window.google;
                    cleaningUp = false;
                }
            };
            window.setTimeout(timeoutCallback, 1);
            if (this.props.onUnmount) {
                this.props.onUnmount();
            }
        }
    }
    render() {
        return ((0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { ref: this.check }), this.state.loaded
                    ? this.props.children
                    : this.props.loadingElement || (0,jsx_runtime.jsx)(DefaultLoadingElement, {})] }));
    }
}
LoadScript.defaultProps = defaultLoadScriptProps;

/* eslint-disable filenames/match-regex */
let previouslyLoadedUrl;
function useLoadScript({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, googleMapsClientId, language, region, libraries, preventGoogleFontsLoading, channel, mapIds, authReferrerPolicy, }) {
    const isMounted = (0,react.useRef)(false);
    const [isLoaded, setLoaded] = (0,react.useState)(false);
    const [loadError, setLoadError] = (0,react.useState)(undefined);
    (0,react.useEffect)(function trackMountedState() {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    (0,react.useEffect)(function applyPreventGoogleFonts() {
        if (isBrowser && preventGoogleFontsLoading) {
            preventGoogleFonts();
        }
    }, [preventGoogleFontsLoading]);
    (0,react.useEffect)(function validateLoadedState() {
        if (isLoaded) {
            invariant_1(!!window.google, 'useLoadScript was marked as loaded, but window.google is not present. Something went wrong.');
        }
    }, [isLoaded]);
    const url = makeLoadScriptUrl({
        version,
        googleMapsApiKey,
        googleMapsClientId,
        language,
        region,
        libraries,
        channel,
        mapIds,
        authReferrerPolicy
    });
    (0,react.useEffect)(function loadScriptAndModifyLoadedState() {
        if (!isBrowser) {
            return;
        }
        function setLoadedIfMounted() {
            if (isMounted.current) {
                setLoaded(true);
                previouslyLoadedUrl = url;
            }
        }
        if (window.google && window.google.maps && previouslyLoadedUrl === url) {
            setLoadedIfMounted();
            return;
        }
        injectScript({ id, url, nonce })
            .then(setLoadedIfMounted)
            .catch(function handleInjectError(err) {
            if (isMounted.current) {
                setLoadError(err);
            }
            console.warn(`
        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${googleMapsApiKey ||
                '-'}) or Client ID (${googleMapsClientId || '-'})
        Otherwise it is a Network issue.
      `);
            console.error(err);
        });
    }, [id, url, nonce]);
    const prevLibraries = (0,react.useRef)();
    (0,react.useEffect)(function checkPerformance() {
        if (prevLibraries.current && libraries !== prevLibraries.current) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        prevLibraries.current = libraries;
    }, [libraries]);
    return { isLoaded, loadError, url };
}

const defaultLoadingElement = (0,jsx_runtime.jsx)(DefaultLoadingElement, {});
function LoadScriptNext(_a) {
    var { loadingElement, onLoad, onError, onUnmount, children } = _a, hookOptions = __rest$1(_a, ["loadingElement", "onLoad", "onError", "onUnmount", "children"]);
    const { isLoaded, loadError } = useLoadScript(hookOptions);
    (0,react.useEffect)(function handleOnLoad() {
        if (isLoaded && typeof onLoad === 'function') {
            onLoad();
        }
    }, [isLoaded, onLoad]);
    (0,react.useEffect)(function handleOnError() {
        if (loadError && typeof onError === 'function') {
            onError(loadError);
        }
    }, [loadError, onError]);
    (0,react.useEffect)(function handleOnUnmount() {
        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    }, [onUnmount]);
    return isLoaded ? children : loadingElement || defaultLoadingElement;
}
var LoadScriptNext$1 = (0,react.memo)(LoadScriptNext);

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual$1 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * The status of the [[Loader]].
 */
var LoaderStatus;
(function (LoaderStatus) {
    LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
    LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
    LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
    LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
})(LoaderStatus || (LoaderStatus = {}));
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class esm_Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, authReferrerPolicy, channel, client, id = DEFAULT_ID, language, libraries = [], mapIds, nonce, region, retries = 3, url = "https://maps.googleapis.com/maps/api/js", version, }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.apiKey = apiKey;
        this.authReferrerPolicy = authReferrerPolicy;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.language = language;
        this.libraries = libraries;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.region = region;
        this.retries = retries;
        this.url = url;
        this.version = version;
        if (esm_Loader.instance) {
            if (!fastDeepEqual$1(this.options, esm_Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(esm_Loader.instance.options)}`);
            }
            return esm_Loader.instance;
        }
        esm_Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
            authReferrerPolicy: this.authReferrerPolicy,
        };
    }
    get status() {
        if (this.errors.length) {
            return LoaderStatus.FAILURE;
        }
        if (this.done) {
            return LoaderStatus.SUCCESS;
        }
        if (this.loading) {
            return LoaderStatus.LOADING;
        }
        return LoaderStatus.INITIALIZED;
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     */
    createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        if (this.authReferrerPolicy) {
            url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
            script.nonce = this.nonce;
        }
        document.head.appendChild(script);
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
}

function useJsApiLoader({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, 
// googleMapsClientId,
language, region, libraries, preventGoogleFontsLoading, 
// channel,
mapIds, authReferrerPolicy, }) {
    const isMounted = useRef(false);
    const [isLoaded, setLoaded] = useState(false);
    const [loadError, setLoadError] = useState(undefined);
    useEffect(function trackMountedState() {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    const loader = useMemo(function memo() {
        return new esm_Loader({
            id,
            apiKey: googleMapsApiKey,
            version,
            libraries,
            language,
            region,
            mapIds,
            nonce,
            authReferrerPolicy,
        });
    }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce, authReferrerPolicy]);
    useEffect(function effect() {
        if (isLoaded) {
            return;
        }
        else {
            loader.load().then(function then() {
                if (isMounted.current)
                    setLoaded(true);
            })
                .catch(function onrejected(error) {
                setLoadError(error);
            });
        }
    }, []);
    useEffect(function applyPreventGoogleFonts() {
        if (isBrowser && preventGoogleFontsLoading) {
            preventGoogleFonts();
        }
    }, [preventGoogleFontsLoading]);
    const prevLibraries = useRef();
    useEffect(function effect() {
        if (prevLibraries.current && libraries !== prevLibraries.current) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        prevLibraries.current = libraries;
    }, [libraries]);
    return { isLoaded, loadError };
}

const eventMap$h = {};
const updaterMap$h = {
    options(instance, options) {
        instance.setOptions(options);
    },
};
function TrafficLayerFunctional({ options, onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (options && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        const trafficLayer = new google.maps.TrafficLayer(Object.assign(Object.assign({}, (options || {})), { map }));
        setInstance(trafficLayer);
        if (onLoad) {
            onLoad(trafficLayer);
        }
        return () => {
            if (instance !== null) {
                if (onUnmount) {
                    onUnmount(instance);
                }
                instance.setMap(null);
            }
        };
    }, []);
    return null;
}
const TrafficLayerF = (0,react.memo)(TrafficLayerFunctional);
class TrafficLayer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            trafficLayer: null,
        };
        this.setTrafficLayerCallback = () => {
            if (this.state.trafficLayer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.trafficLayer);
            }
        };
        this.registeredEvents = [];
    }
    componentDidMount() {
        const trafficLayer = new google.maps.TrafficLayer(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$h,
            eventMap: eventMap$h,
            prevProps: {},
            nextProps: this.props,
            instance: trafficLayer,
        });
        this.setState(function setTrafficLayer() {
            return {
                trafficLayer,
            };
        }, this.setTrafficLayerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.trafficLayer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$h,
                eventMap: eventMap$h,
                prevProps,
                nextProps: this.props,
                instance: this.state.trafficLayer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.trafficLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.trafficLayer);
            }
            unregisterEvents(this.registeredEvents);
            // @ts-ignore
            this.state.trafficLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
TrafficLayer.contextType = MapContext;

function BicyclingLayerFunctional({ onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        const bicyclingLayer = new google.maps.BicyclingLayer();
        setInstance(bicyclingLayer);
        bicyclingLayer.setMap(map);
        if (onLoad) {
            onLoad(bicyclingLayer);
        }
        return () => {
            if (bicyclingLayer !== null) {
                if (onUnmount) {
                    onUnmount(bicyclingLayer);
                }
                bicyclingLayer.setMap(null);
            }
        };
    }, []);
    return null;
}
const BicyclingLayerF = (0,react.memo)(BicyclingLayerFunctional);
class BicyclingLayer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            bicyclingLayer: null,
        };
        this.setBicyclingLayerCallback = () => {
            if (this.state.bicyclingLayer !== null) {
                this.state.bicyclingLayer.setMap(this.context);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.bicyclingLayer);
                }
            }
        };
    }
    componentDidMount() {
        const bicyclingLayer = new google.maps.BicyclingLayer();
        this.setState(() => {
            return {
                bicyclingLayer,
            };
        }, this.setBicyclingLayerCallback);
    }
    componentWillUnmount() {
        if (this.state.bicyclingLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.bicyclingLayer);
            }
            this.state.bicyclingLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
BicyclingLayer.contextType = MapContext;

function TransitLayerFunctional({ onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        const transitLayer = new google.maps.TransitLayer();
        setInstance(transitLayer);
        transitLayer.setMap(map);
        if (onLoad) {
            onLoad(transitLayer);
        }
        return () => {
            if (instance !== null) {
                if (onUnmount) {
                    onUnmount(instance);
                }
                // @ts-ignore
                this.state.transitLayer.setMap(null);
            }
        };
    }, []);
    return null;
}
const TransitLayerF = (0,react.memo)(TransitLayerFunctional);
class TransitLayer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            transitLayer: null,
        };
        this.setTransitLayerCallback = () => {
            if (this.state.transitLayer !== null) {
                // @ts-ignore
                this.state.transitLayer.setMap(this.context);
                if (this.props.onLoad) {
                    // @ts-ignore
                    this.props.onLoad(this.state.transitLayer);
                }
            }
        };
    }
    componentDidMount() {
        const transitLayer = new google.maps.TransitLayer();
        this.setState(function setTransitLayer() {
            return {
                transitLayer,
            };
        }, this.setTransitLayerCallback);
    }
    componentWillUnmount() {
        if (this.state.transitLayer !== null) {
            if (this.props.onUnmount) {
                // @ts-ignore
                this.props.onUnmount(this.state.transitLayer);
            }
            // @ts-ignore
            this.state.transitLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
TransitLayer.contextType = MapContext;

/* globals google */
const eventMap$g = {
    onCircleComplete: 'circlecomplete',
    onMarkerComplete: 'markercomplete',
    onOverlayComplete: 'overlaycomplete',
    onPolygonComplete: 'polygoncomplete',
    onPolylineComplete: 'polylinecomplete',
    onRectangleComplete: 'rectanglecomplete',
};
const updaterMap$g = {
    drawingMode(instance, drawingMode) {
        instance.setDrawingMode(drawingMode);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
};
function DrawingManagerFunctional({ options, drawingMode, onCircleComplete, onMarkerComplete, onOverlayComplete, onPolygonComplete, onPolylineComplete, onRectangleComplete, onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [circlecompleteListener, setCircleCompleteListener] = (0,react.useState)(null);
    const [markercompleteListener, setMarkerCompleteListener] = (0,react.useState)(null);
    const [overlaycompleteListener, setOverlayCompleteListener] = (0,react.useState)(null);
    const [polygoncompleteListener, setPolygonCompleteListener] = (0,react.useState)(null);
    const [polylinecompleteListener, setPolylineCompleteListener] = (0,react.useState)(null);
    const [rectanglecompleteListener, setRectangleCompleteListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (options && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (drawingMode && instance !== null) {
            instance.setDrawingMode(drawingMode);
        }
    }, [instance, drawingMode]);
    (0,react.useEffect)(() => {
        if (instance && onCircleComplete) {
            if (circlecompleteListener !== null) {
                google.maps.event.removeListener(circlecompleteListener);
            }
            setCircleCompleteListener(google.maps.event.addListener(instance, 'circlecomplete', onCircleComplete));
        }
    }, [instance, onCircleComplete]);
    (0,react.useEffect)(() => {
        if (instance && onMarkerComplete) {
            if (markercompleteListener !== null) {
                google.maps.event.removeListener(markercompleteListener);
            }
            setMarkerCompleteListener(google.maps.event.addListener(instance, 'markercomplete', onMarkerComplete));
        }
    }, [instance, onMarkerComplete]);
    (0,react.useEffect)(() => {
        if (instance && onOverlayComplete) {
            if (overlaycompleteListener !== null) {
                google.maps.event.removeListener(overlaycompleteListener);
            }
            setOverlayCompleteListener(google.maps.event.addListener(instance, 'overlaycomplete', onOverlayComplete));
        }
    }, [instance, onOverlayComplete]);
    (0,react.useEffect)(() => {
        if (instance && onPolygonComplete) {
            if (polygoncompleteListener !== null) {
                google.maps.event.removeListener(polygoncompleteListener);
            }
            setPolygonCompleteListener(google.maps.event.addListener(instance, 'polygoncomplete', onPolygonComplete));
        }
    }, [instance, onPolygonComplete]);
    (0,react.useEffect)(() => {
        if (instance && onPolylineComplete) {
            if (polylinecompleteListener !== null) {
                google.maps.event.removeListener(polylinecompleteListener);
            }
            setPolylineCompleteListener(google.maps.event.addListener(instance, 'polylinecomplete', onPolylineComplete));
        }
    }, [instance, onPolylineComplete]);
    (0,react.useEffect)(() => {
        if (instance && onRectangleComplete) {
            if (rectanglecompleteListener !== null) {
                google.maps.event.removeListener(rectanglecompleteListener);
            }
            setRectangleCompleteListener(google.maps.event.addListener(instance, 'rectanglecomplete', onRectangleComplete));
        }
    }, [instance, onRectangleComplete]);
    (0,react.useEffect)(() => {
        invariant_1(!!google.maps.drawing, `Did you include prop libraries={['drawing']} in the URL? %s`, google.maps.drawing);
        const drawingManager = new google.maps.drawing.DrawingManager(Object.assign(Object.assign({}, (options || {})), { map }));
        if (drawingMode) {
            drawingManager.setDrawingMode(drawingMode);
        }
        if (onCircleComplete) {
            setCircleCompleteListener(google.maps.event.addListener(drawingManager, 'circlecomplete', onCircleComplete));
        }
        if (onMarkerComplete) {
            setMarkerCompleteListener(google.maps.event.addListener(drawingManager, 'markercomplete', onMarkerComplete));
        }
        if (onOverlayComplete) {
            setOverlayCompleteListener(google.maps.event.addListener(drawingManager, 'overlaycomplete', onOverlayComplete));
        }
        if (onPolygonComplete) {
            setPolygonCompleteListener(google.maps.event.addListener(drawingManager, 'polygoncomplete', onPolygonComplete));
        }
        if (onPolylineComplete) {
            setPolylineCompleteListener(google.maps.event.addListener(drawingManager, 'polylinecomplete', onPolylineComplete));
        }
        if (onRectangleComplete) {
            setRectangleCompleteListener(google.maps.event.addListener(drawingManager, 'rectanglecomplete', onRectangleComplete));
        }
        setInstance(drawingManager);
        if (onLoad) {
            onLoad(drawingManager);
        }
        return () => {
            if (instance !== null) {
                if (circlecompleteListener) {
                    google.maps.event.removeListener(circlecompleteListener);
                }
                if (markercompleteListener) {
                    google.maps.event.removeListener(markercompleteListener);
                }
                if (overlaycompleteListener) {
                    google.maps.event.removeListener(overlaycompleteListener);
                }
                if (polygoncompleteListener) {
                    google.maps.event.removeListener(polygoncompleteListener);
                }
                if (polylinecompleteListener) {
                    google.maps.event.removeListener(polylinecompleteListener);
                }
                if (rectanglecompleteListener) {
                    google.maps.event.removeListener(rectanglecompleteListener);
                }
                if (onUnmount) {
                    onUnmount(instance);
                }
                instance.setMap(null);
            }
        };
    }, []);
    return null;
}
const DrawingManagerF = (0,react.memo)(DrawingManagerFunctional);
class DrawingManager extends react.PureComponent {
    constructor(props) {
        super(props);
        this.registeredEvents = [];
        this.state = {
            drawingManager: null,
        };
        this.setDrawingManagerCallback = () => {
            if (this.state.drawingManager !== null && this.props.onLoad) {
                this.props.onLoad(this.state.drawingManager);
            }
        };
        invariant_1(!!google.maps.drawing, `Did you include prop libraries={['drawing']} in the URL? %s`, google.maps.drawing);
    }
    componentDidMount() {
        const drawingManager = new google.maps.drawing.DrawingManager(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$g,
            eventMap: eventMap$g,
            prevProps: {},
            nextProps: this.props,
            instance: drawingManager,
        });
        this.setState(function setDrawingManager() {
            return {
                drawingManager,
            };
        }, this.setDrawingManagerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.drawingManager !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$g,
                eventMap: eventMap$g,
                prevProps,
                nextProps: this.props,
                instance: this.state.drawingManager,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.drawingManager !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.drawingManager);
            }
            unregisterEvents(this.registeredEvents);
            this.state.drawingManager.setMap(null);
        }
    }
    render() {
        return null;
    }
}
DrawingManager.contextType = MapContext;

const eventMap$f = {
    onAnimationChanged: 'animation_changed',
    onClick: 'click',
    onClickableChanged: 'clickable_changed',
    onCursorChanged: 'cursor_changed',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDraggableChanged: 'draggable_changed',
    onDragStart: 'dragstart',
    onFlatChanged: 'flat_changed',
    onIconChanged: 'icon_changed',
    onMouseDown: 'mousedown',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onPositionChanged: 'position_changed',
    onRightClick: 'rightclick',
    onShapeChanged: 'shape_changed',
    onTitleChanged: 'title_changed',
    onVisibleChanged: 'visible_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$f = {
    animation(instance, animation) {
        instance.setAnimation(animation);
    },
    clickable(instance, clickable) {
        instance.setClickable(clickable);
    },
    cursor(instance, cursor) {
        instance.setCursor(cursor);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    icon(instance, icon) {
        instance.setIcon(icon);
    },
    label(instance, label) {
        instance.setLabel(label);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    opacity(instance, opacity) {
        instance.setOpacity(opacity);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    shape(instance, shape) {
        instance.setShape(shape);
    },
    title(instance, title) {
        instance.setTitle(title);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
const defaultOptions$5 = {};
function MarkerFunctional({ position, options, clusterer, noClustererRedraw, children, draggable, visible, animation, clickable, cursor, icon, label, opacity, shape, title, zIndex, onClick, onDblClick, onDrag, onDragEnd, onDragStart, onMouseOut, onMouseOver, onMouseUp, onMouseDown, onRightClick, onClickableChanged, onCursorChanged, onAnimationChanged, onDraggableChanged, onFlatChanged, onIconChanged, onPositionChanged, onShapeChanged, onTitleChanged, onVisibleChanged, onZindexChanged, onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    const [clickableChangedListener, setClickableChangedListener] = (0,react.useState)(null);
    const [cursorChangedListener, setCursorChangedListener] = (0,react.useState)(null);
    const [animationChangedListener, setAnimationChangedListener] = (0,react.useState)(null);
    const [draggableChangedListener, setDraggableChangedListener] = (0,react.useState)(null);
    const [flatChangedListener, setFlatChangedListener] = (0,react.useState)(null);
    const [iconChangedListener, setIconChangedListener] = (0,react.useState)(null);
    const [positionChangedListener, setPositionChangedListener] = (0,react.useState)(null);
    const [shapeChangedListener, setShapeChangedListener] = (0,react.useState)(null);
    const [titleChangedListener, setTitleChangedListener] = (0,react.useState)(null);
    const [visibleChangedListener, setVisibleChangedListener] = (0,react.useState)(null);
    const [zIndexChangedListener, setZindexChangedListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof options !== 'undefined' && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (typeof draggable !== 'undefined' && instance !== null) {
            instance.setDraggable(draggable);
        }
    }, [instance, draggable]);
    (0,react.useEffect)(() => {
        if (position && instance !== null) {
            instance.setPosition(position);
        }
    }, [instance, position]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && instance !== null) {
            instance.setVisible(visible);
        }
    }, [instance, visible]);
    (0,react.useEffect)(() => {
        if (animation && instance !== null) {
            instance.setAnimation(animation);
        }
    }, [instance, animation]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (instance && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        if (instance && onClickableChanged) {
            if (clickableChangedListener !== null) {
                google.maps.event.removeListener(clickableChangedListener);
            }
            setClickableChangedListener(google.maps.event.addListener(instance, 'clickable_changed', onClickableChanged));
        }
    }, [onClickableChanged]);
    (0,react.useEffect)(() => {
        if (instance && onCursorChanged) {
            if (cursorChangedListener !== null) {
                google.maps.event.removeListener(cursorChangedListener);
            }
            setCursorChangedListener(google.maps.event.addListener(instance, 'cursor_changed', onCursorChanged));
        }
    }, [onCursorChanged]);
    (0,react.useEffect)(() => {
        if (instance && onAnimationChanged) {
            if (animationChangedListener !== null) {
                google.maps.event.removeListener(animationChangedListener);
            }
            setAnimationChangedListener(google.maps.event.addListener(instance, 'animation_changed', onAnimationChanged));
        }
    }, [onAnimationChanged]);
    (0,react.useEffect)(() => {
        if (instance && onDraggableChanged) {
            if (draggableChangedListener !== null) {
                google.maps.event.removeListener(draggableChangedListener);
            }
            setDraggableChangedListener(google.maps.event.addListener(instance, 'draggable_changed', onDraggableChanged));
        }
    }, [onDraggableChanged]);
    (0,react.useEffect)(() => {
        if (instance && onFlatChanged) {
            if (flatChangedListener !== null) {
                google.maps.event.removeListener(flatChangedListener);
            }
            setFlatChangedListener(google.maps.event.addListener(instance, 'flat_changed', onFlatChanged));
        }
    }, [onFlatChanged]);
    (0,react.useEffect)(() => {
        if (instance && onIconChanged) {
            if (iconChangedListener !== null) {
                google.maps.event.removeListener(iconChangedListener);
            }
            setIconChangedListener(google.maps.event.addListener(instance, 'icon_changed', onIconChanged));
        }
    }, [onIconChanged]);
    (0,react.useEffect)(() => {
        if (instance && onPositionChanged) {
            if (positionChangedListener !== null) {
                google.maps.event.removeListener(positionChangedListener);
            }
            setPositionChangedListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
        }
    }, [onPositionChanged]);
    (0,react.useEffect)(() => {
        if (instance && onShapeChanged) {
            if (shapeChangedListener !== null) {
                google.maps.event.removeListener(shapeChangedListener);
            }
            setShapeChangedListener(google.maps.event.addListener(instance, 'shape_changed', onShapeChanged));
        }
    }, [onShapeChanged]);
    (0,react.useEffect)(() => {
        if (instance && onTitleChanged) {
            if (titleChangedListener !== null) {
                google.maps.event.removeListener(titleChangedListener);
            }
            setTitleChangedListener(google.maps.event.addListener(instance, 'title_changed', onTitleChanged));
        }
    }, [onTitleChanged]);
    (0,react.useEffect)(() => {
        if (instance && onVisibleChanged) {
            if (visibleChangedListener !== null) {
                google.maps.event.removeListener(visibleChangedListener);
            }
            setVisibleChangedListener(google.maps.event.addListener(instance, 'visible_changed', onVisibleChanged));
        }
    }, [onVisibleChanged]);
    (0,react.useEffect)(() => {
        if (instance && onZindexChanged) {
            if (zIndexChangedListener !== null) {
                google.maps.event.removeListener(zIndexChangedListener);
            }
            setZindexChangedListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
        }
    }, [onZindexChanged]);
    (0,react.useEffect)(() => {
        const markerOptions = Object.assign(Object.assign(Object.assign({}, (options || defaultOptions$5)), (clusterer ? defaultOptions$5 : { map })), { position: position });
        const marker = new google.maps.Marker(markerOptions);
        if (clusterer) {
            clusterer.addMarker(marker, !!noClustererRedraw);
        }
        else {
            marker.setMap(map);
        }
        if (position) {
            marker.setPosition(position);
        }
        if (typeof visible !== 'undefined') {
            marker.setVisible(visible);
        }
        if (typeof draggable !== 'undefined') {
            marker.setDraggable(draggable);
        }
        if (typeof clickable !== 'undefined') {
            marker.setClickable(clickable);
        }
        if (typeof cursor === 'string') {
            marker.setCursor(cursor);
        }
        if (icon) {
            marker.setIcon(icon);
        }
        if (typeof label !== 'undefined') {
            marker.setLabel(label);
        }
        if (typeof opacity !== 'undefined') {
            marker.setOpacity(opacity);
        }
        if (shape) {
            marker.setShape(shape);
        }
        if (typeof title === 'string') {
            marker.setTitle(title);
        }
        if (typeof zIndex === 'number') {
            marker.setZIndex(zIndex);
        }
        if (onDblClick) {
            setDblclickListener(google.maps.event.addListener(marker, 'dblclick', onDblClick));
        }
        if (onDragEnd) {
            setDragendListener(google.maps.event.addListener(marker, 'dragend', onDragEnd));
        }
        if (onDragStart) {
            setDragstartListener(google.maps.event.addListener(marker, 'dragstart', onDragStart));
        }
        if (onMouseDown) {
            setMousedownListener(google.maps.event.addListener(marker, 'mousedown', onMouseDown));
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(marker, 'mouseout', onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(marker, 'mouseover', onMouseOver));
        }
        if (onMouseUp) {
            setMouseupListener(google.maps.event.addListener(marker, 'mouseup', onMouseUp));
        }
        if (onRightClick) {
            setRightclickListener(google.maps.event.addListener(marker, 'rightclick', onRightClick));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(marker, 'click', onClick));
        }
        if (onDrag) {
            setDragListener(google.maps.event.addListener(marker, 'drag', onDrag));
        }
        if (onClickableChanged) {
            setClickableChangedListener(google.maps.event.addListener(marker, 'clickable_changed', onClickableChanged));
        }
        if (onCursorChanged) {
            setCursorChangedListener(google.maps.event.addListener(marker, 'cursor_changed', onCursorChanged));
        }
        if (onAnimationChanged) {
            setAnimationChangedListener(google.maps.event.addListener(marker, 'animation_changed', onAnimationChanged));
        }
        if (onDraggableChanged) {
            setDraggableChangedListener(google.maps.event.addListener(marker, 'draggable_changed', onDraggableChanged));
        }
        if (onFlatChanged) {
            setFlatChangedListener(google.maps.event.addListener(marker, 'flat_changed', onFlatChanged));
        }
        if (onIconChanged) {
            setIconChangedListener(google.maps.event.addListener(marker, 'icon_changed', onIconChanged));
        }
        if (onPositionChanged) {
            setPositionChangedListener(google.maps.event.addListener(marker, 'position_changed', onPositionChanged));
        }
        if (onShapeChanged) {
            setShapeChangedListener(google.maps.event.addListener(marker, 'shape_changed', onShapeChanged));
        }
        if (onTitleChanged) {
            setTitleChangedListener(google.maps.event.addListener(marker, 'title_changed', onTitleChanged));
        }
        if (onVisibleChanged) {
            setVisibleChangedListener(google.maps.event.addListener(marker, 'visible_changed', onVisibleChanged));
        }
        if (onZindexChanged) {
            setZindexChangedListener(google.maps.event.addListener(marker, 'zindex_changed', onZindexChanged));
        }
        setInstance(marker);
        if (onLoad) {
            onLoad(marker);
        }
        return () => {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (clickableChangedListener !== null) {
                google.maps.event.removeListener(clickableChangedListener);
            }
            if (cursorChangedListener !== null) {
                google.maps.event.removeListener(cursorChangedListener);
            }
            if (animationChangedListener !== null) {
                google.maps.event.removeListener(animationChangedListener);
            }
            if (draggableChangedListener !== null) {
                google.maps.event.removeListener(draggableChangedListener);
            }
            if (flatChangedListener !== null) {
                google.maps.event.removeListener(flatChangedListener);
            }
            if (iconChangedListener !== null) {
                google.maps.event.removeListener(iconChangedListener);
            }
            if (positionChangedListener !== null) {
                google.maps.event.removeListener(positionChangedListener);
            }
            if (titleChangedListener !== null) {
                google.maps.event.removeListener(titleChangedListener);
            }
            if (visibleChangedListener !== null) {
                google.maps.event.removeListener(visibleChangedListener);
            }
            if (zIndexChangedListener !== null) {
                google.maps.event.removeListener(zIndexChangedListener);
            }
            if (onUnmount) {
                onUnmount(marker);
            }
            if (clusterer) {
                clusterer.removeMarker(marker, !!noClustererRedraw);
            }
            else if (marker) {
                marker.setMap(null);
            }
        };
    }, []);
    const chx = (0,react.useMemo)(() => {
        return children
            ? react.Children.map(children, child => {
                if (!(0,react.isValidElement)(child)) {
                    return child;
                }
                const elementChild = child;
                return (0,react.cloneElement)(elementChild, { anchor: instance });
            })
            : null;
    }, [children, instance]);
    return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, { children: chx }) || null;
}
const MarkerF = (0,react.memo)(MarkerFunctional);
class Marker extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
    }
    componentDidMount() {
        const markerOptions = Object.assign(Object.assign(Object.assign({}, (this.props.options || defaultOptions$5)), (this.props.clusterer ? defaultOptions$5 : { map: this.context })), { position: this.props.position });
        // Unfortunately we can't just do this in the contstructor, because the
        // `MapContext` might not be filled in yet.
        this.marker = new google.maps.Marker(markerOptions);
        if (this.props.clusterer) {
            this.props.clusterer.addMarker(this.marker, !!this.props.noClustererRedraw);
        }
        else {
            this.marker.setMap(this.context);
        }
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$f,
            eventMap: eventMap$f,
            prevProps: {},
            nextProps: this.props,
            instance: this.marker,
        });
        if (this.props.onLoad) {
            this.props.onLoad(this.marker);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.marker) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$f,
                eventMap: eventMap$f,
                prevProps,
                nextProps: this.props,
                instance: this.marker,
            });
        }
    }
    componentWillUnmount() {
        if (this.marker) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.marker);
            }
            unregisterEvents(this.registeredEvents);
            if (this.props.clusterer) {
                this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
            }
            else {
                this.marker && this.marker.setMap(null);
            }
        }
    }
    render() {
        let children = null;
        if (this.props.children) {
            children = react.Children.map(this.props.children, child => {
                if (!(0,react.isValidElement)(child)) {
                    return child;
                }
                const elementChild = child;
                return (0,react.cloneElement)(elementChild, { anchor: this.marker });
            });
        }
        return children || null;
    }
}
Marker.contextType = MapContext;

var ClusterIcon = /** @class */ (function () {
    function ClusterIcon(cluster, styles) {
        cluster.getClusterer().extend(ClusterIcon, google.maps.OverlayView);
        this.cluster = cluster;
        this.clusterClassName = this.cluster.getClusterer().getClusterClass();
        this.className = this.clusterClassName;
        this.styles = styles;
        this.center = undefined;
        this.div = null;
        this.sums = null;
        this.visible = false;
        this.boundsChangedListener = null;
        this.url = '';
        this.height = 0;
        this.width = 0;
        this.anchorText = [0, 0];
        this.anchorIcon = [0, 0];
        this.textColor = 'black';
        this.textSize = 11;
        this.textDecoration = 'none';
        this.fontWeight = 'bold';
        this.fontStyle = 'normal';
        this.fontFamily = 'Arial,sans-serif';
        this.backgroundPosition = '0 0';
        this.cMouseDownInCluster = null;
        this.cDraggingMapByCluster = null;
        this.timeOut = null;
        this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
        this.onBoundsChanged = this.onBoundsChanged.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.draw = this.draw.bind(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.useStyle = this.useStyle.bind(this);
        this.setCenter = this.setCenter.bind(this);
        this.getPosFromLatLng = this.getPosFromLatLng.bind(this);
    }
    ClusterIcon.prototype.onBoundsChanged = function () {
        this.cDraggingMapByCluster = this.cMouseDownInCluster;
    };
    ClusterIcon.prototype.onMouseDown = function () {
        this.cMouseDownInCluster = true;
        this.cDraggingMapByCluster = false;
    };
    ClusterIcon.prototype.onClick = function (event) {
        this.cMouseDownInCluster = false;
        if (!this.cDraggingMapByCluster) {
            var markerClusterer_1 = this.cluster.getClusterer();
            /**
             * This event is fired when a cluster marker is clicked.
             * @name MarkerClusterer#click
             * @param {Cluster} c The cluster that was clicked.
             * @event
             */
            google.maps.event.trigger(markerClusterer_1, 'click', this.cluster);
            google.maps.event.trigger(markerClusterer_1, 'clusterclick', this.cluster); // deprecated name
            // The default click handler follows. Disable it by setting
            // the zoomOnClick property to false.
            if (markerClusterer_1.getZoomOnClick()) {
                // Zoom into the cluster.
                var maxZoom_1 = markerClusterer_1.getMaxZoom();
                var bounds_1 = this.cluster.getBounds();
                var map = markerClusterer_1.getMap();
                if (map !== null && 'fitBounds' in map) {
                    map.fitBounds(bounds_1);
                }
                // There is a fix for Issue 170 here:
                this.timeOut = window.setTimeout(function () {
                    var map = markerClusterer_1.getMap();
                    if (map !== null) {
                        if ('fitBounds' in map) {
                            map.fitBounds(bounds_1);
                        }
                        var zoom = map.getZoom() || 0;
                        // Don't zoom beyond the max zoom level
                        if (maxZoom_1 !== null &&
                            zoom > maxZoom_1) {
                            map.setZoom(maxZoom_1 + 1);
                        }
                    }
                }, 100);
            }
            // Prevent event propagation to the map:
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        }
    };
    ClusterIcon.prototype.onMouseOver = function () {
        /**
         * This event is fired when the mouse moves over a cluster marker.
         * @name MarkerClusterer#mouseover
         * @param {Cluster} c The cluster that the mouse moved over.
         * @event
         */
        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseover', this.cluster);
    };
    ClusterIcon.prototype.onMouseOut = function () {
        /**
         * This event is fired when the mouse moves out of a cluster marker.
         * @name MarkerClusterer#mouseout
         * @param {Cluster} c The cluster that the mouse moved out of.
         * @event
         */
        google.maps.event.trigger(this.cluster.getClusterer(), 'mouseout', this.cluster);
    };
    ClusterIcon.prototype.onAdd = function () {
        var _a;
        this.div = document.createElement('div');
        this.div.className = this.className;
        if (this.visible) {
            this.show();
        }
        (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a.overlayMouseTarget.appendChild(this.div);
        var map = this.getMap();
        if (map !== null) {
            // Fix for Issue 157
            this.boundsChangedListener = google.maps.event.addListener(map, 'bounds_changed', this.onBoundsChanged);
            this.div.addEventListener('mousedown', this.onMouseDown);
            this.div.addEventListener('click', this.onClick);
            this.div.addEventListener('mouseover', this.onMouseOver);
            this.div.addEventListener('mouseout', this.onMouseOut);
        }
    };
    ClusterIcon.prototype.onRemove = function () {
        if (this.div && this.div.parentNode) {
            this.hide();
            if (this.boundsChangedListener !== null) {
                google.maps.event.removeListener(this.boundsChangedListener);
            }
            this.div.removeEventListener('mousedown', this.onMouseDown);
            this.div.removeEventListener('click', this.onClick);
            this.div.removeEventListener('mouseover', this.onMouseOver);
            this.div.removeEventListener('mouseout', this.onMouseOut);
            this.div.parentNode.removeChild(this.div);
            if (this.timeOut !== null) {
                window.clearTimeout(this.timeOut);
                this.timeOut = null;
            }
            this.div = null;
        }
    };
    ClusterIcon.prototype.draw = function () {
        if (this.visible && this.div !== null && this.center) {
            var pos = this.getPosFromLatLng(this.center);
            this.div.style.top = pos !== null ? "".concat(pos.y, "px") : '0';
            this.div.style.left = pos !== null ? "".concat(pos.x, "px") : '0';
        }
    };
    ClusterIcon.prototype.hide = function () {
        if (this.div) {
            this.div.style.display = 'none';
        }
        this.visible = false;
    };
    ClusterIcon.prototype.show = function () {
        var _a, _b, _c, _d;
        if (this.div && this.center) {
            var divTitle = this.sums === null ||
                typeof this.sums.title === 'undefined' ||
                this.sums.title === '' ? this.cluster.getClusterer().getTitle() : this.sums.title;
            // NOTE: values must be specified in px units
            var bp = this.backgroundPosition.split(' ');
            var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ''), 10);
            var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ''), 10);
            var pos = this.getPosFromLatLng(this.center);
            this.div.className = this.className;
            this.div.setAttribute('style', "cursor: pointer; position: absolute; top: ".concat(pos !== null ? "".concat(pos.y, "px") : '0', "; left: ").concat(pos !== null ? "".concat(pos.x, "px") : '0', "; width: ").concat(this.width, "px; height: ").concat(this.height, "px; "));
            var img = document.createElement('img');
            img.alt = divTitle;
            img.src = this.url;
            img.width = this.width;
            img.height = this.height;
            img.setAttribute('style', "position: absolute; top: ".concat(spriteV, "px; left: ").concat(spriteH, "px"));
            if (!this.cluster.getClusterer().enableRetinaIcons) {
                img.style.clip = "rect(-".concat(spriteV, "px, -").concat(spriteH + this.width, "px, -").concat(spriteV + this.height, ", -").concat(spriteH, ")");
            }
            var textElm = document.createElement('div');
            textElm.setAttribute('style', "position: absolute; top: ".concat(this.anchorText[0], "px; left: ").concat(this.anchorText[1], "px; color: ").concat(this.textColor, "; font-size: ").concat(this.textSize, "px; font-family: ").concat(this.fontFamily, "; font-weight: ").concat(this.fontWeight, "; fontStyle: ").concat(this.fontStyle, "; text-decoration: ").concat(this.textDecoration, "; text-align: center; width: ").concat(this.width, "px; line-height: ").concat(this.height, "px"));
            if ((_a = this.sums) === null || _a === void 0 ? void 0 : _a.text)
                textElm.innerText = "".concat((_b = this.sums) === null || _b === void 0 ? void 0 : _b.text);
            if ((_c = this.sums) === null || _c === void 0 ? void 0 : _c.html)
                textElm.innerHTML = "".concat((_d = this.sums) === null || _d === void 0 ? void 0 : _d.html);
            this.div.innerHTML = '';
            this.div.appendChild(img);
            this.div.appendChild(textElm);
            this.div.title = divTitle;
            this.div.style.display = '';
        }
        this.visible = true;
    };
    ClusterIcon.prototype.useStyle = function (sums) {
        this.sums = sums;
        var styles = this.cluster.getClusterer().getStyles();
        var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        if (style.className)
            this.className = "".concat(this.clusterClassName, " ").concat(style.className);
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || 'black';
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || 'none';
        this.fontWeight = style.fontWeight || 'bold';
        this.fontStyle = style.fontStyle || 'normal';
        this.fontFamily = style.fontFamily || 'Arial,sans-serif';
        this.backgroundPosition = style.backgroundPosition || '0 0';
    };
    ClusterIcon.prototype.setCenter = function (center) {
        this.center = center;
    };
    ClusterIcon.prototype.getPosFromLatLng = function (latlng) {
        var pos = this.getProjection().fromLatLngToDivPixel(latlng);
        if (pos !== null) {
            pos.x -= this.anchorIcon[1];
            pos.y -= this.anchorIcon[0];
        }
        return pos;
    };
    return ClusterIcon;
}());

var Cluster$1 = /** @class */ (function () {
    function Cluster(markerClusterer) {
        this.markerClusterer = markerClusterer;
        this.map = this.markerClusterer.getMap();
        this.gridSize = this.markerClusterer.getGridSize();
        this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
        this.averageCenter = this.markerClusterer.getAverageCenter();
        this.markers = [];
        this.center = undefined;
        this.bounds = null;
        this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
        this.getSize = this.getSize.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.getMap = this.getMap.bind(this);
        this.getClusterer = this.getClusterer.bind(this);
        this.getBounds = this.getBounds.bind(this);
        this.remove = this.remove.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.isMarkerInClusterBounds = this.isMarkerInClusterBounds.bind(this);
        this.calculateBounds = this.calculateBounds.bind(this);
        this.updateIcon = this.updateIcon.bind(this);
        this.isMarkerAlreadyAdded = this.isMarkerAlreadyAdded.bind(this);
    }
    Cluster.prototype.getSize = function () {
        return this.markers.length;
    };
    Cluster.prototype.getMarkers = function () {
        return this.markers;
    };
    Cluster.prototype.getCenter = function () {
        return this.center;
    };
    Cluster.prototype.getMap = function () {
        return this.map;
    };
    Cluster.prototype.getClusterer = function () {
        return this.markerClusterer;
    };
    Cluster.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds(this.center, this.center);
        var markers = this.getMarkers();
        for (var i = 0; i < markers.length; i++) {
            var position = markers[i].getPosition();
            if (position) {
                bounds.extend(position);
            }
        }
        return bounds;
    };
    Cluster.prototype.remove = function () {
        this.clusterIcon.setMap(null);
        this.markers = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete this.markers;
    };
    Cluster.prototype.addMarker = function (marker) {
        var _a;
        if (this.isMarkerAlreadyAdded(marker)) {
            return false;
        }
        if (!this.center) {
            var position = marker.getPosition();
            if (position) {
                this.center = position;
                this.calculateBounds();
            }
        }
        else {
            if (this.averageCenter) {
                var position = marker.getPosition();
                if (position) {
                    var length_1 = this.markers.length + 1;
                    this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position.lng()) / length_1);
                    this.calculateBounds();
                }
            }
        }
        marker.isAdded = true;
        this.markers.push(marker);
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
            // Zoomed in past max zoom, so show the marker.
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount < this.minClusterSize) {
            // Min cluster size not reached so show the marker.
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount === this.minClusterSize) {
            // Hide the markers that were showing.
            for (var i = 0; i < mCount; i++) {
                this.markers[i].setMap(null);
            }
        }
        else {
            marker.setMap(null);
        }
        return true;
    };
    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
        if (this.bounds !== null) {
            var position = marker.getPosition();
            if (position) {
                return this.bounds.contains(position);
            }
        }
        return false;
    };
    Cluster.prototype.calculateBounds = function () {
        this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster.prototype.updateIcon = function () {
        var _a;
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        var zoom = (_a = this.map) === null || _a === void 0 ? void 0 : _a.getZoom();
        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
            this.clusterIcon.hide();
            return;
        }
        if (mCount < this.minClusterSize) {
            // Min cluster size not yet reached.
            this.clusterIcon.hide();
            return;
        }
        if (this.center) {
            this.clusterIcon.setCenter(this.center);
        }
        this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
        this.clusterIcon.show();
    };
    Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
        if (this.markers.includes) {
            return this.markers.includes(marker);
        }
        for (var i = 0; i < this.markers.length; i++) {
            if (marker === this.markers[i]) {
                return true;
            }
        }
        return false;
    };
    return Cluster;
}());

/* global google */
/**
 * Supports up to 9007199254740991 (Number.MAX_SAFE_INTEGER) markers
 * which is not a problem as max array length is 4294967296 (2**32)
 */
function CALCULATOR(markers, numStyles) {
    var count = markers.length;
    var numberOfDigits = count.toString().length;
    var index = Math.min(numberOfDigits, numStyles);
    return {
        text: count.toString(),
        index: index,
        title: '',
    };
}
var BATCH_SIZE = 2000;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
var IMAGE_EXTENSION = 'png';
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = 'cluster';
var Clusterer = /** @class */ (function () {
    function Clusterer(map, optMarkers, optOptions) {
        if (optMarkers === void 0) { optMarkers = []; }
        if (optOptions === void 0) { optOptions = {}; }
        this.getMinimumClusterSize = this.getMinimumClusterSize.bind(this);
        this.setMinimumClusterSize = this.setMinimumClusterSize.bind(this);
        this.getEnableRetinaIcons = this.getEnableRetinaIcons.bind(this);
        this.setEnableRetinaIcons = this.setEnableRetinaIcons.bind(this);
        this.addToClosestCluster = this.addToClosestCluster.bind(this);
        this.getImageExtension = this.getImageExtension.bind(this);
        this.setImageExtension = this.setImageExtension.bind(this);
        this.getExtendedBounds = this.getExtendedBounds.bind(this);
        this.getAverageCenter = this.getAverageCenter.bind(this);
        this.setAverageCenter = this.setAverageCenter.bind(this);
        this.getTotalClusters = this.getTotalClusters.bind(this);
        this.fitMapToMarkers = this.fitMapToMarkers.bind(this);
        this.getIgnoreHidden = this.getIgnoreHidden.bind(this);
        this.setIgnoreHidden = this.setIgnoreHidden.bind(this);
        this.getClusterClass = this.getClusterClass.bind(this);
        this.setClusterClass = this.setClusterClass.bind(this);
        this.getTotalMarkers = this.getTotalMarkers.bind(this);
        this.getZoomOnClick = this.getZoomOnClick.bind(this);
        this.setZoomOnClick = this.setZoomOnClick.bind(this);
        this.getBatchSizeIE = this.getBatchSizeIE.bind(this);
        this.setBatchSizeIE = this.setBatchSizeIE.bind(this);
        this.createClusters = this.createClusters.bind(this);
        this.onZoomChanged = this.onZoomChanged.bind(this);
        this.getImageSizes = this.getImageSizes.bind(this);
        this.setImageSizes = this.setImageSizes.bind(this);
        this.getCalculator = this.getCalculator.bind(this);
        this.setCalculator = this.setCalculator.bind(this);
        this.removeMarkers = this.removeMarkers.bind(this);
        this.resetViewport = this.resetViewport.bind(this);
        this.getImagePath = this.getImagePath.bind(this);
        this.setImagePath = this.setImagePath.bind(this);
        this.pushMarkerTo = this.pushMarkerTo.bind(this);
        this.removeMarker = this.removeMarker.bind(this);
        this.clearMarkers = this.clearMarkers.bind(this);
        this.setupStyles = this.setupStyles.bind(this);
        this.getGridSize = this.getGridSize.bind(this);
        this.setGridSize = this.setGridSize.bind(this);
        this.getClusters = this.getClusters.bind(this);
        this.getMaxZoom = this.getMaxZoom.bind(this);
        this.setMaxZoom = this.setMaxZoom.bind(this);
        this.getMarkers = this.getMarkers.bind(this);
        this.addMarkers = this.addMarkers.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.setStyles = this.setStyles.bind(this);
        this.addMarker = this.addMarker.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.repaint = this.repaint.bind(this);
        this.onIdle = this.onIdle.bind(this);
        this.redraw = this.redraw.bind(this);
        this.extend = this.extend.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.draw = this.draw.bind(this);
        this.extend(Clusterer, google.maps.OverlayView);
        this.markers = [];
        this.clusters = [];
        this.listeners = [];
        this.activeMap = null;
        this.ready = false;
        this.gridSize = optOptions.gridSize || 60;
        this.minClusterSize = optOptions.minimumClusterSize || 2;
        this.maxZoom = optOptions.maxZoom || null;
        this.styles = optOptions.styles || [];
        this.title = optOptions.title || '';
        this.zoomOnClick = true;
        if (optOptions.zoomOnClick !== undefined) {
            this.zoomOnClick = optOptions.zoomOnClick;
        }
        this.averageCenter = false;
        if (optOptions.averageCenter !== undefined) {
            this.averageCenter = optOptions.averageCenter;
        }
        this.ignoreHidden = false;
        if (optOptions.ignoreHidden !== undefined) {
            this.ignoreHidden = optOptions.ignoreHidden;
        }
        this.enableRetinaIcons = false;
        if (optOptions.enableRetinaIcons !== undefined) {
            this.enableRetinaIcons = optOptions.enableRetinaIcons;
        }
        this.imagePath = optOptions.imagePath || IMAGE_PATH;
        this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
        this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
        this.calculator = optOptions.calculator || CALCULATOR;
        this.batchSize = optOptions.batchSize || BATCH_SIZE;
        this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
        this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
            // Try to avoid IE timeout when processing a huge number of markers:
            this.batchSize = this.batchSizeIE;
        }
        this.timerRefStatic = null;
        this.setupStyles();
        this.addMarkers(optMarkers, true);
        this.setMap(map); // Note: this causes onAdd to be called
    }
    Clusterer.prototype.onZoomChanged = function () {
        var _a, _b;
        this.resetViewport(false);
        // Workaround for this Google bug: when map is at level 0 and "-" of
        // zoom slider is clicked, a "zoom_changed" event is fired even though
        // the map doesn't zoom out any further. In this situation, no "idle"
        // event is triggered so the cluster markers that have been removed
        // do not get redrawn. Same goes for a zoom in at maxZoom.
        if (((_a = this.getMap()) === null || _a === void 0 ? void 0 : _a.getZoom()) === (this.get('minZoom') || 0) ||
            ((_b = this.getMap()) === null || _b === void 0 ? void 0 : _b.getZoom()) === this.get('maxZoom')) {
            google.maps.event.trigger(this, 'idle');
        }
    };
    Clusterer.prototype.onIdle = function () {
        this.redraw();
    };
    Clusterer.prototype.onAdd = function () {
        var map = this.getMap();
        this.activeMap = map;
        this.ready = true;
        this.repaint();
        if (map !== null) {
            // Add the map event listeners
            this.listeners = [
                google.maps.event.addListener(map, 'zoom_changed', this.onZoomChanged),
                google.maps.event.addListener(map, 'idle', this.onIdle),
            ];
        }
    };
    Clusterer.prototype.onRemove = function () {
        // Put all the managed markers back on the map:
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].getMap() !== this.activeMap) {
                this.markers[i].setMap(this.activeMap);
            }
        }
        // Remove all clusters:
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        // Remove map event listeners:
        for (var i = 0; i < this.listeners.length; i++) {
            google.maps.event.removeListener(this.listeners[i]);
        }
        this.listeners = [];
        this.activeMap = null;
        this.ready = false;
    };
    Clusterer.prototype.draw = function () { return; };
    Clusterer.prototype.setupStyles = function () {
        if (this.styles.length > 0) {
            return;
        }
        for (var i = 0; i < this.imageSizes.length; i++) {
            this.styles.push({
                url: "".concat(this.imagePath + (i + 1), ".").concat(this.imageExtension),
                height: this.imageSizes[i],
                width: this.imageSizes[i],
            });
        }
    };
    Clusterer.prototype.fitMapToMarkers = function () {
        var markers = this.getMarkers();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            var position = markers[i].getPosition();
            if (position) {
                bounds.extend(position);
            }
        }
        var map = this.getMap();
        if (map !== null && 'fitBounds' in map) {
            map.fitBounds(bounds);
        }
    };
    Clusterer.prototype.getGridSize = function () {
        return this.gridSize;
    };
    Clusterer.prototype.setGridSize = function (gridSize) {
        this.gridSize = gridSize;
    };
    Clusterer.prototype.getMinimumClusterSize = function () {
        return this.minClusterSize;
    };
    Clusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
        this.minClusterSize = minimumClusterSize;
    };
    Clusterer.prototype.getMaxZoom = function () {
        return this.maxZoom;
    };
    Clusterer.prototype.setMaxZoom = function (maxZoom) {
        this.maxZoom = maxZoom;
    };
    Clusterer.prototype.getStyles = function () {
        return this.styles;
    };
    Clusterer.prototype.setStyles = function (styles) {
        this.styles = styles;
    };
    Clusterer.prototype.getTitle = function () {
        return this.title;
    };
    Clusterer.prototype.setTitle = function (title) {
        this.title = title;
    };
    Clusterer.prototype.getZoomOnClick = function () {
        return this.zoomOnClick;
    };
    Clusterer.prototype.setZoomOnClick = function (zoomOnClick) {
        this.zoomOnClick = zoomOnClick;
    };
    Clusterer.prototype.getAverageCenter = function () {
        return this.averageCenter;
    };
    Clusterer.prototype.setAverageCenter = function (averageCenter) {
        this.averageCenter = averageCenter;
    };
    Clusterer.prototype.getIgnoreHidden = function () {
        return this.ignoreHidden;
    };
    Clusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
        this.ignoreHidden = ignoreHidden;
    };
    Clusterer.prototype.getEnableRetinaIcons = function () {
        return this.enableRetinaIcons;
    };
    Clusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
        this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer.prototype.getImageExtension = function () {
        return this.imageExtension;
    };
    Clusterer.prototype.setImageExtension = function (imageExtension) {
        this.imageExtension = imageExtension;
    };
    Clusterer.prototype.getImagePath = function () {
        return this.imagePath;
    };
    Clusterer.prototype.setImagePath = function (imagePath) {
        this.imagePath = imagePath;
    };
    Clusterer.prototype.getImageSizes = function () {
        return this.imageSizes;
    };
    Clusterer.prototype.setImageSizes = function (imageSizes) {
        this.imageSizes = imageSizes;
    };
    Clusterer.prototype.getCalculator = function () {
        return this.calculator;
    };
    Clusterer.prototype.setCalculator = function (calculator) {
        this.calculator = calculator;
    };
    Clusterer.prototype.getBatchSizeIE = function () {
        return this.batchSizeIE;
    };
    Clusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
        this.batchSizeIE = batchSizeIE;
    };
    Clusterer.prototype.getClusterClass = function () {
        return this.clusterClass;
    };
    Clusterer.prototype.setClusterClass = function (clusterClass) {
        this.clusterClass = clusterClass;
    };
    Clusterer.prototype.getMarkers = function () {
        return this.markers;
    };
    Clusterer.prototype.getTotalMarkers = function () {
        return this.markers.length;
    };
    Clusterer.prototype.getClusters = function () {
        return this.clusters;
    };
    Clusterer.prototype.getTotalClusters = function () {
        return this.clusters.length;
    };
    Clusterer.prototype.addMarker = function (marker, optNoDraw) {
        this.pushMarkerTo(marker);
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.addMarkers = function (markers, optNoDraw) {
        for (var key in markers) {
            if (Object.prototype.hasOwnProperty.call(markers, key)) {
                this.pushMarkerTo(markers[key]);
            }
        }
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.pushMarkerTo = function (marker) {
        var _this = this;
        // If the marker is draggable add a listener so we can update the clusters on the dragend:
        if (marker.getDraggable()) {
            google.maps.event.addListener(marker, 'dragend', function () {
                if (_this.ready) {
                    marker.isAdded = false;
                    _this.repaint();
                }
            });
        }
        marker.isAdded = false;
        this.markers.push(marker);
    };
    Clusterer.prototype.removeMarker_ = function (marker) {
        var index = -1;
        if (this.markers.indexOf) {
            index = this.markers.indexOf(marker);
        }
        else {
            for (var i = 0; i < this.markers.length; i++) {
                if (marker === this.markers[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        return true;
    };
    Clusterer.prototype.removeMarker = function (marker, optNoDraw) {
        var removed = this.removeMarker_(marker);
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.removeMarkers = function (markers, optNoDraw) {
        var removed = false;
        for (var i = 0; i < markers.length; i++) {
            removed = removed || this.removeMarker_(markers[i]);
        }
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.clearMarkers = function () {
        this.resetViewport(true);
        this.markers = [];
    };
    Clusterer.prototype.repaint = function () {
        var oldClusters = this.clusters.slice();
        this.clusters = [];
        this.resetViewport(false);
        this.redraw();
        // Remove the old clusters.
        // Do it in a timeout to prevent blinking effect.
        setTimeout(function timeout() {
            for (var i = 0; i < oldClusters.length; i++) {
                oldClusters[i].remove();
            }
        }, 0);
    };
    Clusterer.prototype.getExtendedBounds = function (bounds) {
        var projection = this.getProjection();
        // Convert the points to pixels and the extend out by the grid size.
        var trPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()));
        if (trPix !== null) {
            trPix.x += this.gridSize;
            trPix.y -= this.gridSize;
        }
        var blPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()));
        if (blPix !== null) {
            blPix.x -= this.gridSize;
            blPix.y += this.gridSize;
        }
        // Extend the bounds to contain the new bounds.
        if (trPix !== null) {
            // Convert the pixel points back to LatLng nw
            var point1 = projection.fromDivPixelToLatLng(trPix);
            if (point1 !== null) {
                bounds.extend(point1);
            }
        }
        if (blPix !== null) {
            // Convert the pixel points back to LatLng sw
            var point2 = projection.fromDivPixelToLatLng(blPix);
            if (point2 !== null) {
                bounds.extend(point2);
            }
        }
        return bounds;
    };
    Clusterer.prototype.redraw = function () {
        // Redraws all the clusters.
        this.createClusters(0);
    };
    Clusterer.prototype.resetViewport = function (optHide) {
        // Remove all the clusters
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        // Reset the markers to not be added and to be removed from the map.
        for (var i = 0; i < this.markers.length; i++) {
            var marker = this.markers[i];
            marker.isAdded = false;
            if (optHide) {
                marker.setMap(null);
            }
        }
    };
    Clusterer.prototype.distanceBetweenPoints = function (p1, p2) {
        var R = 6371; // Radius of the Earth in km
        var dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180;
        var dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((p1.lat() * Math.PI) / 180) *
                Math.cos((p2.lat() * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };
    Clusterer.prototype.isMarkerInBounds = function (marker, bounds) {
        var position = marker.getPosition();
        if (position) {
            return bounds.contains(position);
        }
        return false;
    };
    Clusterer.prototype.addToClosestCluster = function (marker) {
        var cluster;
        var distance = 40000; // Some large number
        var clusterToAddTo = null;
        for (var i = 0; i < this.clusters.length; i++) {
            cluster = this.clusters[i];
            var center = cluster.getCenter();
            var position = marker.getPosition();
            if (center && position) {
                var d = this.distanceBetweenPoints(center, position);
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
            clusterToAddTo.addMarker(marker);
        }
        else {
            cluster = new Cluster$1(this);
            cluster.addMarker(marker);
            this.clusters.push(cluster);
        }
    };
    Clusterer.prototype.createClusters = function (iFirst) {
        var _this = this;
        if (!this.ready) {
            return;
        }
        // Cancel previous batch processing if we're working on the first batch:
        if (iFirst === 0) {
            /**
             * This event is fired when the <code>Clusterer</code> begins
             *  clustering markers.
             * @name Clusterer#clusteringbegin
             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
             * @event
             */
            google.maps.event.trigger(this, 'clusteringbegin', this);
            if (this.timerRefStatic !== null) {
                window.clearTimeout(this.timerRefStatic);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                delete this.timerRefStatic;
            }
        }
        var map = this.getMap();
        var bounds = map !== null && 'getBounds' in map ? map.getBounds() : null;
        var zoom = (map === null || map === void 0 ? void 0 : map.getZoom()) || 0;
        // Get our current map view bounds.
        // Create a new bounds object so we don't affect the map.
        //
        // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
        var mapBounds = zoom > 3
            ? new google.maps.LatLngBounds(bounds === null || bounds === void 0 ? void 0 : bounds.getSouthWest(), bounds === null || bounds === void 0 ? void 0 : bounds.getNorthEast())
            : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
        var extendedMapBounds = this.getExtendedBounds(mapBounds);
        var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
        for (var i = iFirst; i < iLast; i++) {
            var marker = this.markers[i];
            if (!marker.isAdded && this.isMarkerInBounds(marker, extendedMapBounds) && (!this.ignoreHidden || (this.ignoreHidden && marker.getVisible()))) {
                this.addToClosestCluster(marker);
            }
        }
        if (iLast < this.markers.length) {
            this.timerRefStatic = window.setTimeout(function () {
                _this.createClusters(iLast);
            }, 0);
        }
        else {
            this.timerRefStatic = null;
            /**
             * This event is fired when the <code>Clusterer</code> stops
             *  clustering markers.
             * @name Clusterer#clusteringend
             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
             * @event
             */
            google.maps.event.trigger(this, 'clusteringend', this);
            for (var i = 0; i < this.clusters.length; i++) {
                this.clusters[i].updateIcon();
            }
        }
    };
    Clusterer.prototype.extend = function (obj1, obj2) {
        return function applyExtend(object) {
            for (var property in object.prototype) {
                // @ts-ignore
                this.prototype[property] = object.prototype[property];
            }
            return this;
        }.apply(obj1, [obj2]);
    };
    return Clusterer;
}());

const eventMap$e = {
    onClick: 'click',
    onClusteringBegin: 'clusteringbegin',
    onClusteringEnd: 'clusteringend',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
};
const updaterMap$e = {
    averageCenter(instance, averageCenter) {
        instance.setAverageCenter(averageCenter);
    },
    batchSizeIE(instance, batchSizeIE) {
        instance.setBatchSizeIE(batchSizeIE);
    },
    calculator(instance, calculator) {
        instance.setCalculator(calculator);
    },
    clusterClass(instance, clusterClass) {
        instance.setClusterClass(clusterClass);
    },
    enableRetinaIcons(instance, enableRetinaIcons) {
        instance.setEnableRetinaIcons(enableRetinaIcons);
    },
    gridSize(instance, gridSize) {
        instance.setGridSize(gridSize);
    },
    ignoreHidden(instance, ignoreHidden) {
        instance.setIgnoreHidden(ignoreHidden);
    },
    imageExtension(instance, imageExtension) {
        instance.setImageExtension(imageExtension);
    },
    imagePath(instance, imagePath) {
        instance.setImagePath(imagePath);
    },
    imageSizes(instance, imageSizes) {
        instance.setImageSizes(imageSizes);
    },
    maxZoom(instance, maxZoom) {
        instance.setMaxZoom(maxZoom);
    },
    minimumClusterSize(instance, minimumClusterSize) {
        instance.setMinimumClusterSize(minimumClusterSize);
    },
    styles(instance, styles) {
        instance.setStyles(styles);
    },
    title(instance, title) {
        instance.setTitle(title);
    },
    zoomOnClick(instance, zoomOnClick) {
        instance.setZoomOnClick(zoomOnClick);
    },
};
const defaultOptions$4 = {};
function MarkerClustererFunctional(props) {
    const { children, options, averageCenter, batchSizeIE, calculator, clusterClass, enableRetinaIcons, gridSize, ignoreHidden, imageExtension, imagePath, imageSizes, maxZoom, minimumClusterSize, styles, title, zoomOnClick, onClick, onClusteringBegin, onClusteringEnd, onMouseOver, onMouseOut, onLoad, onUnmount, } = props;
    const [instance, setInstance] = (0,react.useState)(null);
    const map = (0,react.useContext)(MapContext);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [clusteringBeginListener, setClusteringBeginListener] = (0,react.useState)(null);
    const [clusteringEndListener, setClusteringEndListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, eventMap$e.onMouseOut, onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, eventMap$e.onMouseOver, onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, eventMap$e.onClick, onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onClusteringBegin) {
            if (clusteringBeginListener !== null) {
                google.maps.event.removeListener(clusteringBeginListener);
            }
            setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringBegin, onClusteringBegin));
        }
    }, [onClusteringBegin]);
    (0,react.useEffect)(() => {
        if (instance && onClusteringEnd) {
            if (clusteringEndListener !== null) {
                google.maps.event.removeListener(clusteringEndListener);
            }
            setClusteringBeginListener(google.maps.event.addListener(instance, eventMap$e.onClusteringEnd, onClusteringEnd));
        }
    }, [onClusteringEnd]);
    (0,react.useEffect)(() => {
        if (typeof averageCenter !== 'undefined' && instance !== null) {
            updaterMap$e.averageCenter(instance, averageCenter);
        }
    }, [instance, averageCenter]);
    (0,react.useEffect)(() => {
        if (typeof batchSizeIE !== 'undefined' && instance !== null) {
            updaterMap$e.batchSizeIE(instance, batchSizeIE);
        }
    }, [instance, batchSizeIE]);
    (0,react.useEffect)(() => {
        if (typeof calculator !== 'undefined' && instance !== null) {
            updaterMap$e.calculator(instance, calculator);
        }
    }, [instance, calculator]);
    (0,react.useEffect)(() => {
        if (typeof clusterClass !== 'undefined' && instance !== null) {
            updaterMap$e.clusterClass(instance, clusterClass);
        }
    }, [instance, clusterClass]);
    (0,react.useEffect)(() => {
        if (typeof enableRetinaIcons !== 'undefined' && instance !== null) {
            updaterMap$e.enableRetinaIcons(instance, enableRetinaIcons);
        }
    }, [instance, enableRetinaIcons]);
    (0,react.useEffect)(() => {
        if (typeof gridSize !== 'undefined' && instance !== null) {
            updaterMap$e.gridSize(instance, gridSize);
        }
    }, [instance, gridSize]);
    (0,react.useEffect)(() => {
        if (typeof ignoreHidden !== 'undefined' && instance !== null) {
            updaterMap$e.ignoreHidden(instance, ignoreHidden);
        }
    }, [instance, ignoreHidden]);
    (0,react.useEffect)(() => {
        if (typeof imageExtension !== 'undefined' && instance !== null) {
            updaterMap$e.imageExtension(instance, imageExtension);
        }
    }, [instance, imageExtension]);
    (0,react.useEffect)(() => {
        if (typeof imagePath !== 'undefined' && instance !== null) {
            updaterMap$e.imagePath(instance, imagePath);
        }
    }, [instance, imagePath]);
    (0,react.useEffect)(() => {
        if (typeof imageSizes !== 'undefined' && instance !== null) {
            updaterMap$e.imageSizes(instance, imageSizes);
        }
    }, [instance, imageSizes]);
    (0,react.useEffect)(() => {
        if (typeof maxZoom !== 'undefined' && instance !== null) {
            updaterMap$e.maxZoom(instance, maxZoom);
        }
    }, [instance, maxZoom]);
    (0,react.useEffect)(() => {
        if (typeof minimumClusterSize !== 'undefined' && instance !== null) {
            updaterMap$e.minimumClusterSize(instance, minimumClusterSize);
        }
    }, [instance, minimumClusterSize]);
    (0,react.useEffect)(() => {
        if (typeof styles !== 'undefined' && instance !== null) {
            updaterMap$e.styles(instance, styles);
        }
    }, [instance, styles]);
    (0,react.useEffect)(() => {
        if (typeof title !== 'undefined' && instance !== null) {
            updaterMap$e.title(instance, title);
        }
    }, [instance, title]);
    (0,react.useEffect)(() => {
        if (typeof zoomOnClick !== 'undefined' && instance !== null) {
            updaterMap$e.zoomOnClick(instance, zoomOnClick);
        }
    }, [instance, zoomOnClick]);
    (0,react.useEffect)(() => {
        if (!map)
            return;
        const clustererOptions = Object.assign({}, (options || defaultOptions$4));
        const clusterer = new Clusterer(map, [], clustererOptions);
        if (averageCenter) {
            updaterMap$e.averageCenter(clusterer, averageCenter);
        }
        if (batchSizeIE) {
            updaterMap$e.batchSizeIE(clusterer, batchSizeIE);
        }
        if (calculator) {
            updaterMap$e.calculator(clusterer, calculator);
        }
        if (clusterClass) {
            updaterMap$e.clusterClass(clusterer, clusterClass);
        }
        if (enableRetinaIcons) {
            updaterMap$e.enableRetinaIcons(clusterer, enableRetinaIcons);
        }
        if (gridSize) {
            updaterMap$e.gridSize(clusterer, gridSize);
        }
        if (ignoreHidden) {
            updaterMap$e.ignoreHidden(clusterer, ignoreHidden);
        }
        if (imageExtension) {
            updaterMap$e.imageExtension(clusterer, imageExtension);
        }
        if (imagePath) {
            updaterMap$e.imagePath(clusterer, imagePath);
        }
        if (imageSizes) {
            updaterMap$e.imageSizes(clusterer, imageSizes);
        }
        if (maxZoom) {
            updaterMap$e.maxZoom(clusterer, maxZoom);
        }
        if (minimumClusterSize) {
            updaterMap$e.minimumClusterSize(clusterer, minimumClusterSize);
        }
        if (styles) {
            updaterMap$e.styles(clusterer, styles);
        }
        if (title) {
            updaterMap$e.title(clusterer, title);
        }
        if (zoomOnClick) {
            updaterMap$e.zoomOnClick(clusterer, zoomOnClick);
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOut, onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(clusterer, eventMap$e.onMouseOver, onMouseOver));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(clusterer, eventMap$e.onClick, onClick));
        }
        if (onClusteringBegin) {
            setClusteringBeginListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringBegin, onClusteringBegin));
        }
        if (onClusteringEnd) {
            setClusteringEndListener(google.maps.event.addListener(clusterer, eventMap$e.onClusteringEnd, onClusteringEnd));
        }
        setInstance(clusterer);
        if (onLoad) {
            onLoad(clusterer);
        }
        return () => {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (clusteringBeginListener !== null) {
                google.maps.event.removeListener(clusteringBeginListener);
            }
            if (clusteringEndListener !== null) {
                google.maps.event.removeListener(clusteringEndListener);
            }
            if (onUnmount) {
                onUnmount(clusterer);
            }
        };
    }, []);
    return instance !== null ? children(instance) || null : null;
}
const MarkerClustererF = (0,react.memo)(MarkerClustererFunctional);
class ClustererComponent extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            markerClusterer: null,
        };
        this.setClustererCallback = () => {
            if (this.state.markerClusterer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.markerClusterer);
            }
        };
    }
    componentDidMount() {
        if (this.context) {
            const markerClusterer = new Clusterer(this.context, [], this.props.options);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$e,
                eventMap: eventMap$e,
                prevProps: {},
                nextProps: this.props,
                instance: markerClusterer,
            });
            this.setState(() => {
                return {
                    markerClusterer,
                };
            }, this.setClustererCallback);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.markerClusterer) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$e,
                eventMap: eventMap$e,
                prevProps,
                nextProps: this.props,
                instance: this.state.markerClusterer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.markerClusterer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.markerClusterer);
            }
            unregisterEvents(this.registeredEvents);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.state.markerClusterer.setMap(null);
        }
    }
    render() {
        return this.state.markerClusterer !== null
            ? this.props.children(this.state.markerClusterer)
            : null;
    }
}
ClustererComponent.contextType = MapContext;

// This handler prevents an event in the InfoBox from being passed on to the map.
function cancelHandler(event) {
    event.cancelBubble = true;
    if (event.stopPropagation) {
        event.stopPropagation();
    }
}
var InfoBox = /** @class */ (function () {
    function InfoBox(options) {
        if (options === void 0) { options = {}; }
        this.getCloseClickHandler = this.getCloseClickHandler.bind(this);
        this.closeClickHandler = this.closeClickHandler.bind(this);
        this.createInfoBoxDiv = this.createInfoBoxDiv.bind(this);
        this.addClickHandler = this.addClickHandler.bind(this);
        this.getCloseBoxImg = this.getCloseBoxImg.bind(this);
        this.getBoxWidths = this.getBoxWidths.bind(this);
        this.setBoxStyle = this.setBoxStyle.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.setOptions = this.setOptions.bind(this);
        this.setContent = this.setContent.bind(this);
        this.setVisible = this.setVisible.bind(this);
        this.getContent = this.getContent.bind(this);
        this.getVisible = this.getVisible.bind(this);
        this.setZIndex = this.setZIndex.bind(this);
        this.getZIndex = this.getZIndex.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.panBox = this.panBox.bind(this);
        this.extend = this.extend.bind(this);
        this.close = this.close.bind(this);
        this.draw = this.draw.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.open = this.open.bind(this);
        this.extend(InfoBox, google.maps.OverlayView);
        // Standard options (in common with google.maps.InfoWindow):
        this.content = options.content || '';
        this.disableAutoPan = options.disableAutoPan || false;
        this.maxWidth = options.maxWidth || 0;
        this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
        this.position = options.position || new google.maps.LatLng(0, 0);
        this.zIndex = options.zIndex || null;
        // Additional options (unique to InfoBox):
        this.boxClass = options.boxClass || 'infoBox';
        this.boxStyle = options.boxStyle || {};
        this.closeBoxMargin = options.closeBoxMargin || '2px';
        this.closeBoxURL = options.closeBoxURL || 'http://www.google.com/intl/en_us/mapfiles/close.gif';
        if (options.closeBoxURL === '') {
            this.closeBoxURL = '';
        }
        this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
        if (typeof options.visible === 'undefined') {
            if (typeof options.isHidden === 'undefined') {
                options.visible = true;
            }
            else {
                options.visible = !options.isHidden;
            }
        }
        this.isHidden = !options.visible;
        this.alignBottom = options.alignBottom || false;
        this.pane = options.pane || 'floatPane';
        this.enableEventPropagation = options.enableEventPropagation || false;
        this.div = null;
        this.closeListener = null;
        this.moveListener = null;
        this.mapListener = null;
        this.contextListener = null;
        this.eventListeners = null;
        this.fixedWidthSet = null;
    }
    InfoBox.prototype.createInfoBoxDiv = function () {
        var _this = this;
        // This handler ignores the current event in the InfoBox and conditionally prevents
        // the event from being passed on to the map. It is used for the contextmenu event.
        var ignoreHandler = function (event) {
            event.returnValue = false;
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (!_this.enableEventPropagation) {
                cancelHandler(event);
            }
        };
        if (!this.div) {
            this.div = document.createElement('div');
            this.setBoxStyle();
            if (typeof this.content === 'string') {
                this.div.innerHTML = this.getCloseBoxImg() + this.content;
            }
            else {
                this.div.innerHTML = this.getCloseBoxImg();
                this.div.appendChild(this.content);
            }
            var panes = this.getPanes();
            if (panes !== null) {
                panes[this.pane].appendChild(this.div); // Add the InfoBox div to the DOM
            }
            this.addClickHandler();
            if (this.div.style.width) {
                this.fixedWidthSet = true;
            }
            else {
                if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
                    this.div.style.width = this.maxWidth + 'px';
                    this.fixedWidthSet = true;
                }
                else {
                    // The following code is needed to overcome problems with MSIE
                    var bw = this.getBoxWidths();
                    this.div.style.width = this.div.offsetWidth - bw.left - bw.right + 'px';
                    this.fixedWidthSet = false;
                }
            }
            this.panBox(this.disableAutoPan);
            if (!this.enableEventPropagation) {
                this.eventListeners = [];
                // Cancel event propagation.
                // Note: mousemove not included (to resolve Issue 152)
                var events = [
                    'mousedown',
                    'mouseover',
                    'mouseout',
                    'mouseup',
                    'click',
                    'dblclick',
                    'touchstart',
                    'touchend',
                    'touchmove',
                ];
                for (var i = 0; i < events.length; i++) {
                    this.eventListeners.push(google.maps.event.addListener(this.div, events[i], cancelHandler));
                }
                // Workaround for Google bug that causes the cursor to change to a pointer
                // when the mouse moves over a marker underneath InfoBox.
                this.eventListeners.push(google.maps.event.addListener(this.div, 'mouseover', function () {
                    if (_this.div) {
                        _this.div.style.cursor = 'default';
                    }
                }));
            }
            this.contextListener = google.maps.event.addListener(this.div, 'contextmenu', ignoreHandler);
            /**
             * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
             * @name InfoBox#domready
             * @event
             */
            google.maps.event.trigger(this, 'domready');
        }
    };
    InfoBox.prototype.getCloseBoxImg = function () {
        var img = '';
        if (this.closeBoxURL !== '') {
            img = '<img alt=""';
            img += ' aria-hidden="true"';
            img += " src='" + this.closeBoxURL + "'";
            img += ' align=right'; // Do this because Opera chokes on style='float: right;'
            img += " style='";
            img += ' position: relative;'; // Required by MSIE
            img += ' cursor: pointer;';
            img += ' margin: ' + this.closeBoxMargin + ';';
            img += "'>";
        }
        return img;
    };
    InfoBox.prototype.addClickHandler = function () {
        this.closeListener = this.div && this.div.firstChild && this.closeBoxURL !== ''
            ? google.maps.event.addListener(this.div.firstChild, 'click', this.getCloseClickHandler())
            : null;
    };
    InfoBox.prototype.closeClickHandler = function (event) {
        // 1.0.3 fix: Always prevent propagation of a close box click to the map:
        event.cancelBubble = true;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        /**
         * This event is fired when the InfoBox's close box is clicked.
         * @name InfoBox#closeclick
         * @event
         */
        google.maps.event.trigger(this, 'closeclick');
        this.close();
    };
    InfoBox.prototype.getCloseClickHandler = function () {
        return this.closeClickHandler;
    };
    InfoBox.prototype.panBox = function (disablePan) {
        if (this.div && !disablePan) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            var map = this.getMap();
            // Only pan if attached to map, not panorama
            if (map instanceof google.maps.Map) {
                var xOffset = 0;
                var yOffset = 0;
                var bounds = map.getBounds();
                if (bounds && !bounds.contains(this.position)) {
                    // Marker not in visible area of map, so set center
                    // of map to the marker position first.
                    map.setCenter(this.position);
                }
                var mapDiv = map.getDiv();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                var mapWidth = mapDiv.offsetWidth;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                var mapHeight = mapDiv.offsetHeight;
                var iwOffsetX = this.pixelOffset.width;
                var iwOffsetY = this.pixelOffset.height;
                var iwWidth = this.div.offsetWidth;
                var iwHeight = this.div.offsetHeight;
                var padX = this.infoBoxClearance.width;
                var padY = this.infoBoxClearance.height;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                var projection = this.getProjection();
                var pixPosition = projection.fromLatLngToContainerPixel(this.position);
                if (pixPosition !== null) {
                    if (pixPosition.x < -iwOffsetX + padX) {
                        xOffset = pixPosition.x + iwOffsetX - padX;
                    }
                    else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
                        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
                    }
                    if (this.alignBottom) {
                        if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
                            yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
                        }
                        else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
                            yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
                        }
                    }
                    else {
                        if (pixPosition.y < -iwOffsetY + padY) {
                            yOffset = pixPosition.y + iwOffsetY - padY;
                        }
                        else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
                            yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
                        }
                    }
                }
                if (!(xOffset === 0 && yOffset === 0)) {
                    // Move the map to the shifted center.
                    map.panBy(xOffset, yOffset);
                }
            }
        }
    };
    InfoBox.prototype.setBoxStyle = function () {
        if (this.div) {
            // Apply style values from the style sheet defined in the boxClass parameter:
            this.div.className = this.boxClass;
            // Clear existing inline style values:
            this.div.style.cssText = '';
            // Apply style values defined in the boxStyle parameter:
            var boxStyle = this.boxStyle;
            for (var i in boxStyle) {
                if (Object.prototype.hasOwnProperty.call(boxStyle, i)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.div.style[i] = boxStyle[i];
                }
            }
            // Fix for iOS disappearing InfoBox problem
            // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
            this.div.style.webkitTransform = 'translateZ(0)';
            // Fix up opacity style for benefit of MSIE
            if (typeof this.div.style.opacity !== 'undefined' && this.div.style.opacity !== '') {
                // See http://www.quirksmode.org/css/opacity.html
                var opacity = parseFloat(this.div.style.opacity || '');
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.div.style.msFilter =
                    '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
                this.div.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
            }
            // Apply required styles
            this.div.style.position = 'absolute';
            this.div.style.visibility = 'hidden';
            if (this.zIndex !== null) {
                this.div.style.zIndex = this.zIndex + '';
            }
            if (!this.div.style.overflow) {
                this.div.style.overflow = 'auto';
            }
        }
    };
    InfoBox.prototype.getBoxWidths = function () {
        var bw = { top: 0, bottom: 0, left: 0, right: 0 };
        if (!this.div) {
            return bw;
        }
        if (document.defaultView) {
            var ownerDocument = this.div.ownerDocument;
            var computedStyle = ownerDocument && ownerDocument.defaultView
                ? ownerDocument.defaultView.getComputedStyle(this.div, '')
                : null;
            if (computedStyle) {
                // The computed styles are always in pixel units (good!)
                bw.top = parseInt(computedStyle.borderTopWidth || '', 10) || 0;
                bw.bottom = parseInt(computedStyle.borderBottomWidth || '', 10) || 0;
                bw.left = parseInt(computedStyle.borderLeftWidth || '', 10) || 0;
                bw.right = parseInt(computedStyle.borderRightWidth || '', 10) || 0;
            }
        }
        else if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.documentElement.currentStyle // MSIE
        ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            var currentStyle = this.div.currentStyle;
            if (currentStyle) {
                // The current styles may not be in pixel units, but assume they are (bad!)
                bw.top = parseInt(currentStyle.borderTopWidth || '', 10) || 0;
                bw.bottom = parseInt(currentStyle.borderBottomWidth || '', 10) || 0;
                bw.left = parseInt(currentStyle.borderLeftWidth || '', 10) || 0;
                bw.right = parseInt(currentStyle.borderRightWidth || '', 10) || 0;
            }
        }
        return bw;
    };
    InfoBox.prototype.onRemove = function () {
        if (this.div && this.div.parentNode) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };
    InfoBox.prototype.draw = function () {
        this.createInfoBoxDiv();
        if (this.div) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            var projection = this.getProjection();
            var pixPosition = projection.fromLatLngToDivPixel(this.position);
            if (pixPosition !== null) {
                this.div.style.left = pixPosition.x + this.pixelOffset.width + 'px';
                if (this.alignBottom) {
                    this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + 'px';
                }
                else {
                    this.div.style.top = pixPosition.y + this.pixelOffset.height + 'px';
                }
            }
            if (this.isHidden) {
                this.div.style.visibility = 'hidden';
            }
            else {
                this.div.style.visibility = 'visible';
            }
        }
    };
    InfoBox.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.boxClass !== 'undefined') {
            // Must be first
            this.boxClass = options.boxClass;
            this.setBoxStyle();
        }
        if (typeof options.boxStyle !== 'undefined') {
            // Must be second
            this.boxStyle = options.boxStyle;
            this.setBoxStyle();
        }
        if (typeof options.content !== 'undefined') {
            this.setContent(options.content);
        }
        if (typeof options.disableAutoPan !== 'undefined') {
            this.disableAutoPan = options.disableAutoPan;
        }
        if (typeof options.maxWidth !== 'undefined') {
            this.maxWidth = options.maxWidth;
        }
        if (typeof options.pixelOffset !== 'undefined') {
            this.pixelOffset = options.pixelOffset;
        }
        if (typeof options.alignBottom !== 'undefined') {
            this.alignBottom = options.alignBottom;
        }
        if (typeof options.position !== 'undefined') {
            this.setPosition(options.position);
        }
        if (typeof options.zIndex !== 'undefined') {
            this.setZIndex(options.zIndex);
        }
        if (typeof options.closeBoxMargin !== 'undefined') {
            this.closeBoxMargin = options.closeBoxMargin;
        }
        if (typeof options.closeBoxURL !== 'undefined') {
            this.closeBoxURL = options.closeBoxURL;
        }
        if (typeof options.infoBoxClearance !== 'undefined') {
            this.infoBoxClearance = options.infoBoxClearance;
        }
        if (typeof options.isHidden !== 'undefined') {
            this.isHidden = options.isHidden;
        }
        if (typeof options.visible !== 'undefined') {
            this.isHidden = !options.visible;
        }
        if (typeof options.enableEventPropagation !== 'undefined') {
            this.enableEventPropagation = options.enableEventPropagation;
        }
        if (this.div) {
            this.draw();
        }
    };
    InfoBox.prototype.setContent = function (content) {
        this.content = content;
        if (this.div) {
            if (this.closeListener) {
                google.maps.event.removeListener(this.closeListener);
                this.closeListener = null;
            }
            // Odd code required to make things work with MSIE.
            if (!this.fixedWidthSet) {
                this.div.style.width = '';
            }
            if (typeof content === 'string') {
                this.div.innerHTML = this.getCloseBoxImg() + content;
            }
            else {
                this.div.innerHTML = this.getCloseBoxImg();
                this.div.appendChild(content);
            }
            // Perverse code required to make things work with MSIE.
            // (Ensures the close box does, in fact, float to the right.)
            if (!this.fixedWidthSet) {
                this.div.style.width = this.div.offsetWidth + 'px';
                if (typeof content === 'string') {
                    this.div.innerHTML = this.getCloseBoxImg() + content;
                }
                else {
                    this.div.innerHTML = this.getCloseBoxImg();
                    this.div.appendChild(content);
                }
            }
            this.addClickHandler();
        }
        /**
         * This event is fired when the content of the InfoBox changes.
         * @name InfoBox#content_changed
         * @event
         */
        google.maps.event.trigger(this, 'content_changed');
    };
    InfoBox.prototype.setPosition = function (latLng) {
        this.position = latLng;
        if (this.div) {
            this.draw();
        }
        /**
         * This event is fired when the position of the InfoBox changes.
         * @name InfoBox#position_changed
         * @event
         */
        google.maps.event.trigger(this, 'position_changed');
    };
    InfoBox.prototype.setVisible = function (isVisible) {
        this.isHidden = !isVisible;
        if (this.div) {
            this.div.style.visibility = this.isHidden ? 'hidden' : 'visible';
        }
    };
    InfoBox.prototype.setZIndex = function (index) {
        this.zIndex = index;
        if (this.div) {
            this.div.style.zIndex = index + '';
        }
        /**
         * This event is fired when the zIndex of the InfoBox changes.
         * @name InfoBox#zindex_changed
         * @event
         */
        google.maps.event.trigger(this, 'zindex_changed');
    };
    InfoBox.prototype.getContent = function () {
        return this.content;
    };
    InfoBox.prototype.getPosition = function () {
        return this.position;
    };
    InfoBox.prototype.getZIndex = function () {
        return this.zIndex;
    };
    InfoBox.prototype.getVisible = function () {
        var map = this.getMap();
        return typeof map === 'undefined' || map === null ? false : !this.isHidden;
    };
    InfoBox.prototype.show = function () {
        this.isHidden = false;
        if (this.div) {
            this.div.style.visibility = 'visible';
        }
    };
    InfoBox.prototype.hide = function () {
        this.isHidden = true;
        if (this.div) {
            this.div.style.visibility = 'hidden';
        }
    };
    InfoBox.prototype.open = function (map, anchor) {
        var _this = this;
        if (anchor) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.position = anchor.getPosition();
            this.moveListener = google.maps.event.addListener(anchor, 'position_changed', function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                var position = anchor.getPosition();
                _this.setPosition(position);
            });
            this.mapListener = google.maps.event.addListener(anchor, 'map_changed', function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                _this.setMap(anchor.map);
            });
        }
        this.setMap(map);
        if (this.div) {
            this.panBox();
        }
    };
    InfoBox.prototype.close = function () {
        if (this.closeListener) {
            google.maps.event.removeListener(this.closeListener);
            this.closeListener = null;
        }
        if (this.eventListeners) {
            for (var i = 0; i < this.eventListeners.length; i++) {
                google.maps.event.removeListener(this.eventListeners[i]);
            }
            this.eventListeners = null;
        }
        if (this.moveListener) {
            google.maps.event.removeListener(this.moveListener);
            this.moveListener = null;
        }
        if (this.mapListener) {
            google.maps.event.removeListener(this.mapListener);
            this.mapListener = null;
        }
        if (this.contextListener) {
            google.maps.event.removeListener(this.contextListener);
            this.contextListener = null;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.setMap(null);
    };
    InfoBox.prototype.extend = function (obj1, obj2) {
        return function applyExtend(object) {
            for (var property in object.prototype) {
                if (!Object.prototype.hasOwnProperty.call(this, property)) {
                    // @ts-ignore
                    this.prototype[property] = object.prototype[property];
                }
            }
            return this;
        }.apply(obj1, [obj2]);
    };
    return InfoBox;
}());

const eventMap$d = {
    onCloseClick: 'closeclick',
    onContentChanged: 'content_changed',
    onDomReady: 'domready',
    onPositionChanged: 'position_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$d = {
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        if (position instanceof google.maps.LatLng) {
            instance.setPosition(position);
        }
        else {
            instance.setPosition(new google.maps.LatLng(position.lat, position.lng));
        }
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
const defaultOptions$3 = {};
function InfoBoxFunctional({ children, anchor, options, position, zIndex, onCloseClick, onDomReady, onContentChanged, onPositionChanged, onZindexChanged, onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [closeclickListener, setCloseClickListener] = (0,react.useState)(null);
    const [domreadyclickListener, setDomReadyClickListener] = (0,react.useState)(null);
    const [contentchangedclickListener, setContentChangedClickListener] = (0,react.useState)(null);
    const [positionchangedclickListener, setPositionChangedClickListener] = (0,react.useState)(null);
    const [zindexchangedclickListener, setZindexChangedClickListener] = (0,react.useState)(null);
    const containerElementRef = (0,react.useRef)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (map && instance !== null) {
            instance.close();
            if (anchor) {
                instance.open(map, anchor);
            }
            else if (instance.getPosition()) {
                instance.open(map);
            }
        }
    }, [map, instance, anchor]);
    (0,react.useEffect)(() => {
        if (options && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (position && instance !== null) {
            const positionLatLng = position instanceof google.maps.LatLng
                ? position
                // @ts-ignore
                : new google.maps.LatLng(position.lat, position.lng);
            instance.setPosition(positionLatLng);
        }
    }, [position]);
    (0,react.useEffect)(() => {
        if (typeof zIndex === 'number' && instance !== null) {
            instance.setZIndex(zIndex);
        }
    }, [zIndex]);
    (0,react.useEffect)(() => {
        if (instance && onCloseClick) {
            if (closeclickListener !== null) {
                google.maps.event.removeListener(closeclickListener);
            }
            setCloseClickListener(google.maps.event.addListener(instance, 'closeclick', onCloseClick));
        }
    }, [onCloseClick]);
    (0,react.useEffect)(() => {
        if (instance && onDomReady) {
            if (domreadyclickListener !== null) {
                google.maps.event.removeListener(domreadyclickListener);
            }
            setDomReadyClickListener(google.maps.event.addListener(instance, 'domready', onDomReady));
        }
    }, [onDomReady]);
    (0,react.useEffect)(() => {
        if (instance && onContentChanged) {
            if (contentchangedclickListener !== null) {
                google.maps.event.removeListener(contentchangedclickListener);
            }
            setContentChangedClickListener(google.maps.event.addListener(instance, 'content_changed', onContentChanged));
        }
    }, [onContentChanged]);
    (0,react.useEffect)(() => {
        if (instance && onPositionChanged) {
            if (positionchangedclickListener !== null) {
                google.maps.event.removeListener(positionchangedclickListener);
            }
            setPositionChangedClickListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
        }
    }, [onPositionChanged]);
    (0,react.useEffect)(() => {
        if (instance && onZindexChanged) {
            if (zindexchangedclickListener !== null) {
                google.maps.event.removeListener(zindexchangedclickListener);
            }
            setZindexChangedClickListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
        }
    }, [onZindexChanged]);
    (0,react.useEffect)(() => {
        if (map) {
            const _a = options || defaultOptions$3, { position } = _a, infoBoxOptions = __rest$1(_a, ["position"]);
            let positionLatLng;
            if (position && !(position instanceof google.maps.LatLng)) {
                // @ts-ignore
                positionLatLng = new google.maps.LatLng(position.lat, position.lng);
            }
            const infoBox = new InfoBox(Object.assign(Object.assign({}, infoBoxOptions), (positionLatLng ? { position: positionLatLng } : {})));
            containerElementRef.current = document.createElement('div');
            setInstance(infoBox);
            if (onCloseClick) {
                setCloseClickListener(google.maps.event.addListener(infoBox, 'closeclick', onCloseClick));
            }
            if (onDomReady) {
                setDomReadyClickListener(google.maps.event.addListener(infoBox, 'domready', onDomReady));
            }
            if (onContentChanged) {
                setContentChangedClickListener(google.maps.event.addListener(infoBox, 'content_changed', onContentChanged));
            }
            if (onPositionChanged) {
                setPositionChangedClickListener(google.maps.event.addListener(infoBox, 'position_changed', onPositionChanged));
            }
            if (onZindexChanged) {
                setZindexChangedClickListener(google.maps.event.addListener(infoBox, 'zindex_changed', onZindexChanged));
            }
            infoBox.setContent(containerElementRef.current);
            if (anchor) {
                infoBox.open(map, anchor);
            }
            else if (infoBox.getPosition()) {
                infoBox.open(map);
            }
            else {
                invariant_1(false, 'You must provide either an anchor or a position prop for <InfoBox>.');
            }
            if (onLoad) {
                onLoad(infoBox);
            }
        }
        return () => {
            if (instance !== null) {
                if (closeclickListener) {
                    google.maps.event.removeListener(closeclickListener);
                }
                if (contentchangedclickListener) {
                    google.maps.event.removeListener(contentchangedclickListener);
                }
                if (domreadyclickListener) {
                    google.maps.event.removeListener(domreadyclickListener);
                }
                if (positionchangedclickListener) {
                    google.maps.event.removeListener(positionchangedclickListener);
                }
                if (zindexchangedclickListener) {
                    google.maps.event.removeListener(zindexchangedclickListener);
                }
                if (onUnmount) {
                    onUnmount(instance);
                }
                instance.close();
            }
        };
    }, []);
    return containerElementRef.current ? (0,react_dom.createPortal)(react.Children.only(children), containerElementRef.current) : null;
}
const InfoBoxF = (0,react.memo)(InfoBoxFunctional);
class InfoBoxComponent extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = null;
        this.state = {
            infoBox: null,
        };
        this.open = (infoBox, anchor) => {
            if (anchor) {
                // @ts-ignore
                infoBox.open(this.context, anchor);
            }
            else if (infoBox.getPosition()) {
                // @ts-ignore
                infoBox.open(this.context);
            }
            else {
                invariant_1(false, 'You must provide either an anchor or a position prop for <InfoBox>.');
            }
        };
        this.setInfoBoxCallback = () => {
            if (this.state.infoBox !== null && this.containerElement !== null) {
                this.state.infoBox.setContent(this.containerElement);
                this.open(this.state.infoBox, this.props.anchor);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.infoBox);
                }
            }
        };
    }
    componentDidMount() {
        const _a = this.props.options || {}, { position } = _a, infoBoxOptions = __rest$1(_a, ["position"]);
        let positionLatLng;
        if (position && !(position instanceof google.maps.LatLng)) {
            // @ts-ignore
            positionLatLng = new google.maps.LatLng(position.lat, position.lng);
        }
        const infoBox = new InfoBox(Object.assign(Object.assign({}, infoBoxOptions), (positionLatLng ? { position: positionLatLng } : {})));
        this.containerElement = document.createElement('div');
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$d,
            eventMap: eventMap$d,
            prevProps: {},
            nextProps: this.props,
            instance: infoBox,
        });
        this.setState({ infoBox }, this.setInfoBoxCallback);
    }
    componentDidUpdate(prevProps) {
        const { infoBox } = this.state;
        if (infoBox !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$d,
                eventMap: eventMap$d,
                prevProps,
                nextProps: this.props,
                instance: infoBox,
            });
        }
    }
    componentWillUnmount() {
        const { onUnmount } = this.props;
        const { infoBox } = this.state;
        if (infoBox !== null) {
            if (onUnmount) {
                onUnmount(infoBox);
            }
            unregisterEvents(this.registeredEvents);
            infoBox.close();
        }
    }
    render() {
        return this.containerElement ? (0,react_dom.createPortal)(react.Children.only(this.props.children), this.containerElement) : null;
    }
}
InfoBoxComponent.contextType = MapContext;

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

var kdbush = {exports: {}};

(function (module, exports) {
	(function (global, factory) {
	module.exports = factory() ;
	}(commonjsGlobal, (function () {
	function sortKD(ids, coords, nodeSize, left, right, depth) {
	    if (right - left <= nodeSize) { return; }

	    var m = (left + right) >> 1;

	    select(ids, coords, m, left, right, depth % 2);

	    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
	    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
	}

	function select(ids, coords, k, left, right, inc) {

	    while (right > left) {
	        if (right - left > 600) {
	            var n = right - left + 1;
	            var m = k - left + 1;
	            var z = Math.log(n);
	            var s = 0.5 * Math.exp(2 * z / 3);
	            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
	            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
	            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
	            select(ids, coords, k, newLeft, newRight, inc);
	        }

	        var t = coords[2 * k + inc];
	        var i = left;
	        var j = right;

	        swapItem(ids, coords, left, k);
	        if (coords[2 * right + inc] > t) { swapItem(ids, coords, left, right); }

	        while (i < j) {
	            swapItem(ids, coords, i, j);
	            i++;
	            j--;
	            while (coords[2 * i + inc] < t) { i++; }
	            while (coords[2 * j + inc] > t) { j--; }
	        }

	        if (coords[2 * left + inc] === t) { swapItem(ids, coords, left, j); }
	        else {
	            j++;
	            swapItem(ids, coords, j, right);
	        }

	        if (j <= k) { left = j + 1; }
	        if (k <= j) { right = j - 1; }
	    }
	}

	function swapItem(ids, coords, i, j) {
	    swap(ids, i, j);
	    swap(coords, 2 * i, 2 * j);
	    swap(coords, 2 * i + 1, 2 * j + 1);
	}

	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}

	function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var x, y;

	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();

	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                x = coords[2 * i];
	                y = coords[2 * i + 1];
	                if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[i]); }
	            }
	            continue;
	        }

	        var m = Math.floor((left + right) / 2);

	        x = coords[2 * m];
	        y = coords[2 * m + 1];

	        if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[m]); }

	        var nextAxis = (axis + 1) % 2;

	        if (axis === 0 ? minX <= x : minY <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? maxX >= x : maxY >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }

	    return result;
	}

	function within(ids, coords, qx, qy, r, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var r2 = r * r;

	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();

	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) { result.push(ids[i]); }
	            }
	            continue;
	        }

	        var m = Math.floor((left + right) / 2);

	        var x = coords[2 * m];
	        var y = coords[2 * m + 1];

	        if (sqDist(x, y, qx, qy) <= r2) { result.push(ids[m]); }

	        var nextAxis = (axis + 1) % 2;

	        if (axis === 0 ? qx - r <= x : qy - r <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? qx + r >= x : qy + r >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }

	    return result;
	}

	function sqDist(ax, ay, bx, by) {
	    var dx = ax - bx;
	    var dy = ay - by;
	    return dx * dx + dy * dy;
	}

	var defaultGetX = function (p) { return p[0]; };
	var defaultGetY = function (p) { return p[1]; };

	var KDBush = function KDBush(points, getX, getY, nodeSize, ArrayType) {
	    if ( getX === void 0 ) getX = defaultGetX;
	    if ( getY === void 0 ) getY = defaultGetY;
	    if ( nodeSize === void 0 ) nodeSize = 64;
	    if ( ArrayType === void 0 ) ArrayType = Float64Array;

	    this.nodeSize = nodeSize;
	    this.points = points;

	    var IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

	    var ids = this.ids = new IndexArrayType(points.length);
	    var coords = this.coords = new ArrayType(points.length * 2);

	    for (var i = 0; i < points.length; i++) {
	        ids[i] = i;
	        coords[2 * i] = getX(points[i]);
	        coords[2 * i + 1] = getY(points[i]);
	    }

	    sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
	};

	KDBush.prototype.range = function range$1 (minX, minY, maxX, maxY) {
	    return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
	};

	KDBush.prototype.within = function within$1 (x, y, r) {
	    return within(this.ids, this.coords, x, y, r, this.nodeSize);
	};

	return KDBush;

	})));
} (kdbush));

var KDBush = kdbush.exports;

const defaultOptions$2 = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: props => props // props => ({sum: props.my_value})
};

const fround = Math.fround || (tmp => ((x) => { tmp[0] = +x; return tmp[0]; }))(new Float32Array(1));

class Supercluster {
    constructor(options) {
        this.options = extend$1(Object.create(defaultOptions$2), options);
        this.trees = new Array(this.options.maxZoom + 1);
    }

    load(points) {
        const {log, minZoom, maxZoom, nodeSize} = this.options;

        if (log) console.time('total time');

        const timerId = `prepare ${  points.length  } points`;
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        let clusters = [];
        for (let i = 0; i < points.length; i++) {
            if (!points[i].geometry) continue;
            clusters.push(createPointCluster(points[i], i));
        }
        this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (let z = maxZoom; z >= minZoom; z--) {
            const now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            clusters = this._cluster(clusters, z);
            this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    }

    getClusters(bbox, zoom) {
        let minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
        const minLat = Math.max(-90, Math.min(90, bbox[1]));
        let maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
        const maxLat = Math.max(-90, Math.min(90, bbox[3]));

        if (bbox[2] - bbox[0] >= 360) {
            minLng = -180;
            maxLng = 180;
        } else if (minLng > maxLng) {
            const easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
            const westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
            return easternHem.concat(westernHem);
        }

        const tree = this.trees[this._limitZoom(zoom)];
        const ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
        const clusters = [];
        for (const id of ids) {
            const c = tree.points[id];
            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
        return clusters;
    }

    getChildren(clusterId) {
        const originId = this._getOriginId(clusterId);
        const originZoom = this._getOriginZoom(clusterId);
        const errorMsg = 'No cluster with the specified id.';

        const index = this.trees[originZoom];
        if (!index) throw new Error(errorMsg);

        const origin = index.points[originId];
        if (!origin) throw new Error(errorMsg);

        const r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        const ids = index.within(origin.x, origin.y, r);
        const children = [];
        for (const id of ids) {
            const c = index.points[id];
            if (c.parentId === clusterId) {
                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    }

    getLeaves(clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        const leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    }

    getTile(z, x, y) {
        const tree = this.trees[this._limitZoom(z)];
        const z2 = Math.pow(2, z);
        const {extent, radius} = this.options;
        const p = radius / extent;
        const top = (y - p) / z2;
        const bottom = (y + 1 + p) / z2;

        const tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.points, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.points, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.points, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    }

    getClusterExpansionZoom(clusterId) {
        let expansionZoom = this._getOriginZoom(clusterId) - 1;
        while (expansionZoom <= this.options.maxZoom) {
            const children = this.getChildren(clusterId);
            expansionZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return expansionZoom;
    }

    _appendLeaves(result, clusterId, limit, offset, skipped) {
        const children = this.getChildren(clusterId);

        for (const child of children) {
            const props = child.properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(child);
            }
            if (result.length === limit) break;
        }

        return skipped;
    }

    _addTileFeatures(ids, points, x, y, z2, tile) {
        for (const i of ids) {
            const c = points[i];
            const isCluster = c.numPoints;

            let tags, px, py;
            if (isCluster) {
                tags = getClusterProperties(c);
                px = c.x;
                py = c.y;
            } else {
                const p = this.points[c.index];
                tags = p.properties;
                px = lngX(p.geometry.coordinates[0]);
                py = latY(p.geometry.coordinates[1]);
            }

            const f = {
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (px * z2 - x)),
                    Math.round(this.options.extent * (py * z2 - y))
                ]],
                tags
            };

            // assign id
            let id;
            if (isCluster) {
                id = c.id;
            } else if (this.options.generateId) {
                // optionally generate id
                id = c.index;
            } else if (this.points[c.index].id) {
                // keep id if already assigned
                id = this.points[c.index].id;
            }

            if (id !== undefined) f.id = id;

            tile.features.push(f);
        }
    }

    _limitZoom(z) {
        return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
    }

    _cluster(points, zoom) {
        const clusters = [];
        const {radius, extent, reduce, minPoints} = this.options;
        const r = radius / (extent * Math.pow(2, zoom));

        // loop through each point
        for (let i = 0; i < points.length; i++) {
            const p = points[i];
            // if we've already visited the point at this zoom level, skip it
            if (p.zoom <= zoom) continue;
            p.zoom = zoom;

            // find all nearby points
            const tree = this.trees[zoom + 1];
            const neighborIds = tree.within(p.x, p.y, r);

            const numPointsOrigin = p.numPoints || 1;
            let numPoints = numPointsOrigin;

            // count the number of points in a potential cluster
            for (const neighborId of neighborIds) {
                const b = tree.points[neighborId];
                // filter out neighbors that are already processed
                if (b.zoom > zoom) numPoints += b.numPoints || 1;
            }

            // if there were neighbors to merge, and there are enough points to form a cluster
            if (numPoints > numPointsOrigin && numPoints >= minPoints) {
                let wx = p.x * numPointsOrigin;
                let wy = p.y * numPointsOrigin;

                let clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

                // encode both zoom and point index on which the cluster originated -- offset by total length of features
                const id = (i << 5) + (zoom + 1) + this.points.length;

                for (const neighborId of neighborIds) {
                    const b = tree.points[neighborId];

                    if (b.zoom <= zoom) continue;
                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                    const numPoints2 = b.numPoints || 1;
                    wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
                    wy += b.y * numPoints2;

                    b.parentId = id;

                    if (reduce) {
                        if (!clusterProperties) clusterProperties = this._map(p, true);
                        reduce(clusterProperties, this._map(b));
                    }
                }

                p.parentId = id;
                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));

            } else { // left points as unclustered
                clusters.push(p);

                if (numPoints > 1) {
                    for (const neighborId of neighborIds) {
                        const b = tree.points[neighborId];
                        if (b.zoom <= zoom) continue;
                        b.zoom = zoom;
                        clusters.push(b);
                    }
                }
            }
        }

        return clusters;
    }

    // get index of the point from which the cluster originated
    _getOriginId(clusterId) {
        return (clusterId - this.points.length) >> 5;
    }

    // get zoom of the point from which the cluster originated
    _getOriginZoom(clusterId) {
        return (clusterId - this.points.length) % 32;
    }

    _map(point, clone) {
        if (point.numPoints) {
            return clone ? extend$1({}, point.properties) : point.properties;
        }
        const original = this.points[point.index].properties;
        const result = this.options.map(original);
        return clone && result === original ? extend$1({}, result) : result;
    }
}

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: fround(x), // weighted cluster center; round for consistency with Float32Array index
        y: fround(y),
        zoom: Infinity, // the last zoom the cluster was processed at
        id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints,
        properties
    };
}

function createPointCluster(p, id) {
    const [x, y] = p.geometry.coordinates;
    return {
        x: fround(lngX(x)), // projected point coordinates
        y: fround(latY(y)),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    const count = cluster.numPoints;
    const abbrev =
        count >= 10000 ? `${Math.round(count / 1000)  }k` :
        count >= 1000 ? `${Math.round(count / 100) / 10  }k` : count;
    return extend$1(extend$1({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    const y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend$1(dest, src) {
    for (const id in src) dest[id] = src[id];
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cluster {
    constructor({ markers, position }) {
        this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return undefined;
        }
        return this.markers.reduce((bounds, marker) => {
            return bounds.extend(marker.getPosition());
        }, new google.maps.LatLngBounds(this._position, this._position));
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => m.getVisible())
            .length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            this.marker.setMap(null);
            delete this.marker;
        }
        this.markers.length = 0;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPadding) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPadding);
    return markers.filter((marker) => extendedMapBounds.contains(marker.getPosition()));
};
/**
 * Extends a bounds by a number of pixels in each direction.
 */
const extendBoundsToPaddedViewport = (bounds, projection, pixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, pixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, pixels) => {
    northEast.x += pixels;
    northEast.y -= pixels;
    southWest.x -= pixels;
    southWest.y += pixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(projection.fromDivPixelToLatLng(northEast));
    bounds.extend(projection.fromDivPixelToLatLng(southWest));
    return bounds;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers, map})
     *    }
     * }
     * ```
     */
    noop({ markers }) {
        return noop$1(markers);
    }
}
/**
 * Abstract viewport algorithm proves a class to filter markers by a padded
 * viewport. This is a common optimization.
 *
 * @hidden
 */
class AbstractViewportAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
        super(options);
        this.viewportPadding = 60;
        this.viewportPadding = viewportPadding;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                    map,
                    mapCanvasProjection,
                }),
                changed: false,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
}
/**
 * @hidden
 */
const noop$1 = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: marker.getPosition(),
        markers: [marker],
    }));
    return clusters;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default Grid algorithm historically used in Google Maps marker
 * clustering.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 */
class GridAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
        super(options);
        this.clusters = [];
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
        this.state = { zoom: null };
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        const state = { zoom: map.getZoom() };
        let changed = false;
        if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
        else {
            changed = !fastDeepEqual(this.state, state);
        }
        this.state = state;
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                    map,
                    mapCanvasProjection,
                }),
                changed: changed,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
    cluster({ markers, map, mapCanvasProjection, }) {
        this.clusters = [];
        markers.forEach((marker) => {
            this.addToClosestCluster(marker, map, mapCanvasProjection);
        });
        return this.clusters;
    }
    addToClosestCluster(marker, map, projection) {
        let maxDistance = this.maxDistance; // Some large number
        let cluster = null;
        for (let i = 0; i < this.clusters.length; i++) {
            const candidate = this.clusters[i];
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), marker.getPosition().toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(marker.getPosition())) {
            cluster.push(marker);
        }
        else {
            const cluster = new Cluster({ markers: [marker] });
            this.clusters.push(cluster);
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
 */
class NoopAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var options = __rest(_a, []);
        super(options);
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        return {
            clusters: this.cluster({ markers, map, mapCanvasProjection }),
            changed: false,
        };
    }
    cluster(input) {
        return this.noop(input);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.superCluster = new Supercluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
        this.state = { zoom: null };
    }
    calculate(input) {
        let changed = false;
        if (!fastDeepEqual(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            marker.getPosition().lng(),
                            marker.getPosition().lat(),
                        ],
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        const state = { zoom: input.map.getZoom() };
        if (!changed) {
            if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
            else {
                changed = changed || !fastDeepEqual(this.state, state);
            }
        }
        this.state = state;
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        return this.superCluster
            .getClusters([-180, -90, 180, 90], Math.round(map.getZoom()))
            .map(this.transformCluster.bind(this));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: new google.maps.LatLng({ lat, lng }),
            });
        }
        else {
            const marker = properties.marker;
            return new Cluster({
                markers: [marker],
                position: marker.getPosition(),
            });
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg url with fill color
        const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
        // create marker using svg icon
        return new google.maps.Marker({
            position,
            icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(45, 45),
            },
            label: {
                text: String(count),
                color: "rgba(255,255,255,0.9)",
                fontSize: "12px",
            },
            title: `Cluster of ${count} markers`,
            // adjust zIndex to be above other markers
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && this.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // allow algorithms to return flag on whether the clusters/markers have changed
            if (changed || changed == undefined) {
                // reset visibility of markers and clusters
                this.reset();
                // store new clusters
                this.clusters = clusters;
                this.renderClusters();
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => marker.setMap(null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // generate stats to pass to renderers
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                cluster.marker = this.renderer.render(cluster, stats);
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            cluster.marker.setMap(map);
        });
    }
}

var index_esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AbstractAlgorithm: AbstractAlgorithm,
	AbstractViewportAlgorithm: AbstractViewportAlgorithm,
	Cluster: Cluster,
	ClusterStats: ClusterStats,
	DefaultRenderer: DefaultRenderer,
	GridAlgorithm: GridAlgorithm,
	MarkerClusterer: MarkerClusterer,
	get MarkerClustererEvents () { return MarkerClustererEvents; },
	NoopAlgorithm: NoopAlgorithm,
	SuperClusterAlgorithm: SuperClusterAlgorithm,
	defaultOnClusterClickHandler: defaultOnClusterClickHandler,
	distanceBetweenPoints: distanceBetweenPoints,
	extendBoundsToPaddedViewport: extendBoundsToPaddedViewport,
	extendPixelBounds: extendPixelBounds,
	filterMarkersToPaddedViewport: filterMarkersToPaddedViewport,
	noop: noop$1,
	pixelBoundsToLatLngBounds: pixelBoundsToLatLngBounds
});

function useGoogleMarkerClusterer(options) {
    const map = useGoogleMap();
    const [markerClusterer, setMarkerClusterer] = (0,react.useState)(null);
    (0,react.useEffect)(() => {
        if (map && markerClusterer === null) {
            const markerCluster = new MarkerClusterer(Object.assign(Object.assign({}, options), { map }));
            setMarkerClusterer(markerCluster);
        }
    }, [map]);
    return markerClusterer;
}
/** Wrapper around [@googlemaps/markerclusterer](https://github.com/googlemaps/js-markerclusterer)
 *
 * Accepts {@link  MarkerClustererOptionsSubset} which is a subset of  {@link MarkerClustererOptions}
 */
function GoogleMarkerClusterer({ children, options }) {
    const markerClusterer = useGoogleMarkerClusterer(options);
    return markerClusterer !== null ? children(markerClusterer) : null;
}
var GoogleMarkerClusterer$1 = (0,react.memo)(GoogleMarkerClusterer);

/* global google */
const eventMap$c = {
    onCloseClick: 'closeclick',
    onContentChanged: 'content_changed',
    onDomReady: 'domready',
    onPositionChanged: 'position_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$c = {
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
function InfoWindowFunctional({ children, anchor, options, position, zIndex, onCloseClick, onDomReady, onContentChanged, onPositionChanged, onZindexChanged, onLoad, onUnmount }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [closeclickListener, setCloseClickListener] = (0,react.useState)(null);
    const [domreadyclickListener, setDomReadyClickListener] = (0,react.useState)(null);
    const [contentchangedclickListener, setContentChangedClickListener] = (0,react.useState)(null);
    const [positionchangedclickListener, setPositionChangedClickListener] = (0,react.useState)(null);
    const [zindexchangedclickListener, setZindexChangedClickListener] = (0,react.useState)(null);
    const containerElementRef = (0,react.useRef)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.close();
            if (anchor) {
                instance.open(map, anchor);
            }
            else if (instance.getPosition()) {
                instance.open(map);
            }
        }
    }, [map, instance, anchor]);
    (0,react.useEffect)(() => {
        if (options && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (position && instance !== null) {
            instance.setPosition(position);
        }
    }, [position]);
    (0,react.useEffect)(() => {
        if (typeof zIndex === 'number' && instance !== null) {
            instance.setZIndex(zIndex);
        }
    }, [zIndex]);
    (0,react.useEffect)(() => {
        if (instance && onCloseClick) {
            if (closeclickListener !== null) {
                google.maps.event.removeListener(closeclickListener);
            }
            setCloseClickListener(google.maps.event.addListener(instance, 'closeclick', onCloseClick));
        }
    }, [onCloseClick]);
    (0,react.useEffect)(() => {
        if (instance && onDomReady) {
            if (domreadyclickListener !== null) {
                google.maps.event.removeListener(domreadyclickListener);
            }
            setDomReadyClickListener(google.maps.event.addListener(instance, 'domready', onDomReady));
        }
    }, [onDomReady]);
    (0,react.useEffect)(() => {
        if (instance && onContentChanged) {
            if (contentchangedclickListener !== null) {
                google.maps.event.removeListener(contentchangedclickListener);
            }
            setContentChangedClickListener(google.maps.event.addListener(instance, 'content_changed', onContentChanged));
        }
    }, [onContentChanged]);
    (0,react.useEffect)(() => {
        if (instance && onPositionChanged) {
            if (positionchangedclickListener !== null) {
                google.maps.event.removeListener(positionchangedclickListener);
            }
            setPositionChangedClickListener(google.maps.event.addListener(instance, 'position_changed', onPositionChanged));
        }
    }, [onPositionChanged]);
    (0,react.useEffect)(() => {
        if (instance && onZindexChanged) {
            if (zindexchangedclickListener !== null) {
                google.maps.event.removeListener(zindexchangedclickListener);
            }
            setZindexChangedClickListener(google.maps.event.addListener(instance, 'zindex_changed', onZindexChanged));
        }
    }, [onZindexChanged]);
    (0,react.useEffect)(() => {
        const infoWindow = new google.maps.InfoWindow(Object.assign({}, (options || {})));
        setInstance(infoWindow);
        containerElementRef.current = document.createElement('div');
        if (onCloseClick) {
            setCloseClickListener(google.maps.event.addListener(infoWindow, 'closeclick', onCloseClick));
        }
        if (onDomReady) {
            setDomReadyClickListener(google.maps.event.addListener(infoWindow, 'domready', onDomReady));
        }
        if (onContentChanged) {
            setContentChangedClickListener(google.maps.event.addListener(infoWindow, 'content_changed', onContentChanged));
        }
        if (onPositionChanged) {
            setPositionChangedClickListener(google.maps.event.addListener(infoWindow, 'position_changed', onPositionChanged));
        }
        if (onZindexChanged) {
            setZindexChangedClickListener(google.maps.event.addListener(infoWindow, 'zindex_changed', onZindexChanged));
        }
        infoWindow.setContent(containerElementRef.current);
        if (position) {
            infoWindow.setPosition(position);
        }
        if (zIndex) {
            infoWindow.setZIndex(zIndex);
        }
        if (anchor) {
            infoWindow.open(map, anchor);
        }
        else if (infoWindow.getPosition()) {
            infoWindow.open(map);
        }
        else {
            invariant_1(false, `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`);
        }
        if (onLoad) {
            onLoad(infoWindow);
        }
        return () => {
            if (closeclickListener) {
                google.maps.event.removeListener(closeclickListener);
            }
            if (contentchangedclickListener) {
                google.maps.event.removeListener(contentchangedclickListener);
            }
            if (domreadyclickListener) {
                google.maps.event.removeListener(domreadyclickListener);
            }
            if (positionchangedclickListener) {
                google.maps.event.removeListener(positionchangedclickListener);
            }
            if (zindexchangedclickListener) {
                google.maps.event.removeListener(zindexchangedclickListener);
            }
            if (onUnmount) {
                onUnmount(infoWindow);
            }
            infoWindow.close();
        };
    }, []);
    return containerElementRef.current ? ((0,react_dom.createPortal)(react.Children.only(children), containerElementRef.current)) : (null);
}
const InfoWindowF = (0,react.memo)(InfoWindowFunctional);
class InfoWindow extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = null;
        this.state = {
            infoWindow: null,
        };
        this.open = (infoWindow, anchor) => {
            if (anchor) {
                infoWindow.open(this.context, anchor);
            }
            else if (infoWindow.getPosition()) {
                // @ts-ignore
                infoWindow.open(this.context);
            }
            else {
                invariant_1(false, `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`);
            }
        };
        this.setInfoWindowCallback = () => {
            if (this.state.infoWindow !== null && this.containerElement !== null) {
                this.state.infoWindow.setContent(this.containerElement);
                this.open(this.state.infoWindow, this.props.anchor);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.infoWindow);
                }
            }
        };
    }
    componentDidMount() {
        const infoWindow = new google.maps.InfoWindow(Object.assign({}, (this.props.options || {})));
        this.containerElement = document.createElement('div');
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$c,
            eventMap: eventMap$c,
            prevProps: {},
            nextProps: this.props,
            instance: infoWindow,
        });
        this.setState(() => {
            return {
                infoWindow,
            };
        }, this.setInfoWindowCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.infoWindow !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$c,
                eventMap: eventMap$c,
                prevProps,
                nextProps: this.props,
                instance: this.state.infoWindow,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.infoWindow !== null) {
            unregisterEvents(this.registeredEvents);
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.infoWindow);
            }
            this.state.infoWindow.close();
        }
    }
    render() {
        return this.containerElement ? ((0,react_dom.createPortal)(react.Children.only(this.props.children), this.containerElement)) : (null);
    }
}
InfoWindow.contextType = MapContext;

const eventMap$b = {
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$b = {
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    path(instance, path) {
        instance.setPath(path);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
const defaultOptions$1 = {};
function PolylineFunctional({ options, draggable, editable, visible, path, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onLoad, onUnmount, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof options !== 'undefined' && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (typeof draggable !== 'undefined' && instance !== null) {
            instance.setDraggable(draggable);
        }
    }, [instance, draggable]);
    (0,react.useEffect)(() => {
        if (typeof editable !== 'undefined' && instance !== null) {
            instance.setEditable(editable);
        }
    }, [instance, editable]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && instance !== null) {
            instance.setVisible(visible);
        }
    }, [instance, visible]);
    (0,react.useEffect)(() => {
        if (typeof path !== 'undefined' && instance !== null) {
            instance.setPath(path);
        }
    }, [instance, path]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (instance && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        const polyline = new google.maps.Polyline(Object.assign(Object.assign({}, (options || defaultOptions$1)), { map }));
        if (path) {
            polyline.setPath(path);
        }
        if (typeof visible !== 'undefined') {
            polyline.setVisible(visible);
        }
        if (typeof editable !== 'undefined') {
            polyline.setEditable(editable);
        }
        if (typeof draggable !== 'undefined') {
            polyline.setDraggable(draggable);
        }
        if (onDblClick) {
            setDblclickListener(google.maps.event.addListener(polyline, 'dblclick', onDblClick));
        }
        if (onDragEnd) {
            setDragendListener(google.maps.event.addListener(polyline, 'dragend', onDragEnd));
        }
        if (onDragStart) {
            setDragstartListener(google.maps.event.addListener(polyline, 'dragstart', onDragStart));
        }
        if (onMouseDown) {
            setMousedownListener(google.maps.event.addListener(polyline, 'mousedown', onMouseDown));
        }
        if (onMouseMove) {
            setMousemoveListener(google.maps.event.addListener(polyline, 'mousemove', onMouseMove));
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(polyline, 'mouseout', onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(polyline, 'mouseover', onMouseOver));
        }
        if (onMouseUp) {
            setMouseupListener(google.maps.event.addListener(polyline, 'mouseup', onMouseUp));
        }
        if (onRightClick) {
            setRightclickListener(google.maps.event.addListener(polyline, 'rightclick', onRightClick));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(polyline, 'click', onClick));
        }
        if (onDrag) {
            setDragListener(google.maps.event.addListener(polyline, 'drag', onDrag));
        }
        setInstance(polyline);
        if (onLoad) {
            onLoad(polyline);
        }
        return () => {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (onUnmount) {
                onUnmount(polyline);
            }
            polyline.setMap(null);
        };
    }, []);
    return null;
}
const PolylineF = (0,react.memo)(PolylineFunctional);
class Polyline extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            polyline: null,
        };
        this.setPolylineCallback = () => {
            if (this.state.polyline !== null && this.props.onLoad) {
                this.props.onLoad(this.state.polyline);
            }
        };
    }
    componentDidMount() {
        const polyline = new google.maps.Polyline(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$b,
            eventMap: eventMap$b,
            prevProps: {},
            nextProps: this.props,
            instance: polyline,
        });
        this.setState(function setPolyline() {
            return {
                polyline,
            };
        }, this.setPolylineCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.polyline !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$b,
                eventMap: eventMap$b,
                prevProps,
                nextProps: this.props,
                instance: this.state.polyline,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.polyline !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polyline);
            }
            unregisterEvents(this.registeredEvents);
            this.state.polyline.setMap(null);
        }
    }
    render() {
        return null;
    }
}
Polyline.contextType = MapContext;

/* global google */
const eventMap$a = {
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$a = {
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    path(instance, path) {
        instance.setPath(path);
    },
    paths(instance, paths) {
        instance.setPaths(paths);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
function PolygonFunctional({ options, draggable, editable, visible, path, paths, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onLoad, onUnmount, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof options !== 'undefined' && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (typeof draggable !== 'undefined' && instance !== null) {
            instance.setDraggable(draggable);
        }
    }, [instance, draggable]);
    (0,react.useEffect)(() => {
        if (typeof editable !== 'undefined' && instance !== null) {
            instance.setEditable(editable);
        }
    }, [instance, editable]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && instance !== null) {
            instance.setVisible(visible);
        }
    }, [instance, visible]);
    (0,react.useEffect)(() => {
        if (typeof path !== 'undefined' && instance !== null) {
            instance.setPath(path);
        }
    }, [instance, path]);
    (0,react.useEffect)(() => {
        if (typeof paths !== 'undefined' && instance !== null) {
            instance.setPaths(paths);
        }
    }, [instance, paths]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (instance && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        const polygon = new google.maps.Polygon(Object.assign(Object.assign({}, (options || {})), { map }));
        if (path) {
            polygon.setPath(path);
        }
        if (paths) {
            polygon.setPaths(paths);
        }
        if (typeof visible !== 'undefined') {
            polygon.setVisible(visible);
        }
        if (typeof editable !== 'undefined') {
            polygon.setEditable(editable);
        }
        if (typeof draggable !== 'undefined') {
            polygon.setDraggable(draggable);
        }
        if (onDblClick) {
            setDblclickListener(google.maps.event.addListener(polygon, 'dblclick', onDblClick));
        }
        if (onDragEnd) {
            setDragendListener(google.maps.event.addListener(polygon, 'dragend', onDragEnd));
        }
        if (onDragStart) {
            setDragstartListener(google.maps.event.addListener(polygon, 'dragstart', onDragStart));
        }
        if (onMouseDown) {
            setMousedownListener(google.maps.event.addListener(polygon, 'mousedown', onMouseDown));
        }
        if (onMouseMove) {
            setMousemoveListener(google.maps.event.addListener(polygon, 'mousemove', onMouseMove));
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(polygon, 'mouseout', onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(polygon, 'mouseover', onMouseOver));
        }
        if (onMouseUp) {
            setMouseupListener(google.maps.event.addListener(polygon, 'mouseup', onMouseUp));
        }
        if (onRightClick) {
            setRightclickListener(google.maps.event.addListener(polygon, 'rightclick', onRightClick));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(polygon, 'click', onClick));
        }
        if (onDrag) {
            setDragListener(google.maps.event.addListener(polygon, 'drag', onDrag));
        }
        setInstance(polygon);
        if (onLoad) {
            onLoad(polygon);
        }
        return () => {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (onUnmount) {
                onUnmount(polygon);
            }
            polygon.setMap(null);
        };
    }, []);
    return null;
}
const PolygonF = (0,react.memo)(PolygonFunctional);
class Polygon extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            polygon: null,
        };
        this.setPolygonCallback = () => {
            if (this.state.polygon !== null && this.props.onLoad) {
                this.props.onLoad(this.state.polygon);
            }
        };
    }
    componentDidMount() {
        const polygon = new google.maps.Polygon(Object.assign(Object.assign({}, (this.props.options || {})), { 
            // @ts-ignore
            map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$a,
            eventMap: eventMap$a,
            prevProps: {},
            nextProps: this.props,
            instance: polygon,
        });
        this.setState(function setPolygon() {
            return {
                polygon,
            };
        }, this.setPolygonCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.polygon !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$a,
                eventMap: eventMap$a,
                prevProps,
                nextProps: this.props,
                instance: this.state.polygon,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.polygon !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polygon);
            }
            unregisterEvents(this.registeredEvents);
            this.state.polygon && this.state.polygon.setMap(null);
        }
    }
    render() {
        return null;
    }
}
Polygon.contextType = MapContext;

const eventMap$9 = {
    onBoundsChanged: 'bounds_changed',
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$9 = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
function RectangleFunctional({ options, bounds, draggable, editable, visible, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onBoundsChanged, onLoad, onUnmount, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    const [boundsChangedListener, setBoundsChangedListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof options !== 'undefined' && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (typeof draggable !== 'undefined' && instance !== null) {
            instance.setDraggable(draggable);
        }
    }, [instance, draggable]);
    (0,react.useEffect)(() => {
        if (typeof editable !== 'undefined' && instance !== null) {
            instance.setEditable(editable);
        }
    }, [instance, editable]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && instance !== null) {
            instance.setVisible(visible);
        }
    }, [instance, visible]);
    (0,react.useEffect)(() => {
        if (typeof bounds !== 'undefined' && instance !== null) {
            instance.setBounds(bounds);
        }
    }, [instance, bounds]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (instance && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        if (instance && onBoundsChanged) {
            if (boundsChangedListener !== null) {
                google.maps.event.removeListener(boundsChangedListener);
            }
            setBoundsChangedListener(google.maps.event.addListener(instance, 'bounds_changed', onBoundsChanged));
        }
    }, [onBoundsChanged]);
    (0,react.useEffect)(() => {
        const rectangle = new google.maps.Rectangle(Object.assign(Object.assign({}, (options || {})), { map }));
        if (typeof visible !== 'undefined') {
            rectangle.setVisible(visible);
        }
        if (typeof editable !== 'undefined') {
            rectangle.setEditable(editable);
        }
        if (typeof draggable !== 'undefined') {
            rectangle.setDraggable(draggable);
        }
        if (typeof bounds !== 'undefined') {
            rectangle.setBounds(bounds);
        }
        if (onDblClick) {
            setDblclickListener(google.maps.event.addListener(rectangle, 'dblclick', onDblClick));
        }
        if (onDragEnd) {
            setDragendListener(google.maps.event.addListener(rectangle, 'dragend', onDragEnd));
        }
        if (onDragStart) {
            setDragstartListener(google.maps.event.addListener(rectangle, 'dragstart', onDragStart));
        }
        if (onMouseDown) {
            setMousedownListener(google.maps.event.addListener(rectangle, 'mousedown', onMouseDown));
        }
        if (onMouseMove) {
            setMousemoveListener(google.maps.event.addListener(rectangle, 'mousemove', onMouseMove));
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(rectangle, 'mouseout', onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(rectangle, 'mouseover', onMouseOver));
        }
        if (onMouseUp) {
            setMouseupListener(google.maps.event.addListener(rectangle, 'mouseup', onMouseUp));
        }
        if (onRightClick) {
            setRightclickListener(google.maps.event.addListener(rectangle, 'rightclick', onRightClick));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(rectangle, 'click', onClick));
        }
        if (onDrag) {
            setDragListener(google.maps.event.addListener(rectangle, 'drag', onDrag));
        }
        if (onBoundsChanged) {
            setBoundsChangedListener(google.maps.event.addListener(rectangle, 'bounds_changed', onBoundsChanged));
        }
        setInstance(rectangle);
        if (onLoad) {
            onLoad(rectangle);
        }
        return () => {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            if (boundsChangedListener !== null) {
                google.maps.event.removeListener(boundsChangedListener);
            }
            if (onUnmount) {
                onUnmount(rectangle);
            }
            rectangle.setMap(null);
        };
    }, []);
    return null;
}
const RectangleF = (0,react.memo)(RectangleFunctional);
class Rectangle extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            rectangle: null,
        };
        this.setRectangleCallback = () => {
            if (this.state.rectangle !== null && this.props.onLoad) {
                this.props.onLoad(this.state.rectangle);
            }
        };
    }
    componentDidMount() {
        const rectangle = new google.maps.Rectangle(Object.assign(Object.assign({}, (this.props.options || {})), { 
            // @ts-ignore
            map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$9,
            eventMap: eventMap$9,
            prevProps: {},
            nextProps: this.props,
            instance: rectangle,
        });
        this.setState(function setRectangle() {
            return {
                rectangle,
            };
        }, this.setRectangleCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.rectangle !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$9,
                eventMap: eventMap$9,
                prevProps,
                nextProps: this.props,
                instance: this.state.rectangle,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.rectangle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.rectangle);
            }
            unregisterEvents(this.registeredEvents);
            this.state.rectangle.setMap(null);
        }
    }
    render() {
        return null;
    }
}
Rectangle.contextType = MapContext;

const eventMap$8 = {
    onCenterChanged: 'center_changed',
    onRadiusChanged: 'radius_changed',
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$8 = {
    center(instance, center) {
        instance.setCenter(center);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    radius(instance, radius) {
        instance.setRadius(radius);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
const defaultOptions = {};
function CircleFunctional({ options, center, radius, draggable, editable, visible, onDblClick, onDragEnd, onDragStart, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onClick, onDrag, onCenterChanged, onRadiusChanged, onLoad, onUnmount, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [dragendListener, setDragendListener] = (0,react.useState)(null);
    const [dragstartListener, setDragstartListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [dragListener, setDragListener] = (0,react.useState)(null);
    const [centerChangedListener, setCenterChangedListener] = (0,react.useState)(null);
    const [radiusChangedListener, setRadiusChangedListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof options !== 'undefined' && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        if (typeof draggable !== 'undefined' && instance !== null) {
            instance.setDraggable(draggable);
        }
    }, [instance, draggable]);
    (0,react.useEffect)(() => {
        if (typeof editable !== 'undefined' && instance !== null) {
            instance.setEditable(editable);
        }
    }, [instance, editable]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && instance !== null) {
            instance.setVisible(visible);
        }
    }, [instance, visible]);
    (0,react.useEffect)(() => {
        if (typeof radius === 'number' && instance !== null) {
            instance.setRadius(radius);
        }
    }, [instance, radius]);
    (0,react.useEffect)(() => {
        if (typeof center !== 'undefined' && instance !== null) {
            instance.setCenter(center);
        }
    }, [instance, center]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onDragEnd) {
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            setDragendListener(google.maps.event.addListener(instance, 'dragend', onDragEnd));
        }
    }, [onDragEnd]);
    (0,react.useEffect)(() => {
        if (instance && onDragStart) {
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            setDragstartListener(google.maps.event.addListener(instance, 'dragstart', onDragStart));
        }
    }, [onDragStart]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onDrag) {
            if (dragListener !== null) {
                google.maps.event.removeListener(dragListener);
            }
            setDragListener(google.maps.event.addListener(instance, 'drag', onDrag));
        }
    }, [onDrag]);
    (0,react.useEffect)(() => {
        if (instance && onCenterChanged) {
            if (centerChangedListener !== null) {
                google.maps.event.removeListener(centerChangedListener);
            }
            setCenterChangedListener(google.maps.event.addListener(instance, 'center_changed', onCenterChanged));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onRadiusChanged) {
            if (radiusChangedListener !== null) {
                google.maps.event.removeListener(radiusChangedListener);
            }
            setRadiusChangedListener(google.maps.event.addListener(instance, 'radius_changed', onRadiusChanged));
        }
    }, [onRadiusChanged]);
    (0,react.useEffect)(() => {
        const circle = new google.maps.Circle(Object.assign(Object.assign({}, (options || defaultOptions)), { map }));
        if (typeof radius === 'number') {
            circle.setRadius(radius);
        }
        if (typeof center !== 'undefined') {
            circle.setCenter(center);
        }
        if (typeof radius === 'number') {
            circle.setRadius(radius);
        }
        if (typeof visible !== 'undefined') {
            circle.setVisible(visible);
        }
        if (typeof editable !== 'undefined') {
            circle.setEditable(editable);
        }
        if (typeof draggable !== 'undefined') {
            circle.setDraggable(draggable);
        }
        if (onDblClick) {
            setDblclickListener(google.maps.event.addListener(circle, 'dblclick', onDblClick));
        }
        if (onDragEnd) {
            setDragendListener(google.maps.event.addListener(circle, 'dragend', onDragEnd));
        }
        if (onDragStart) {
            setDragstartListener(google.maps.event.addListener(circle, 'dragstart', onDragStart));
        }
        if (onMouseDown) {
            setMousedownListener(google.maps.event.addListener(circle, 'mousedown', onMouseDown));
        }
        if (onMouseMove) {
            setMousemoveListener(google.maps.event.addListener(circle, 'mousemove', onMouseMove));
        }
        if (onMouseOut) {
            setMouseoutListener(google.maps.event.addListener(circle, 'mouseout', onMouseOut));
        }
        if (onMouseOver) {
            setMouseoverListener(google.maps.event.addListener(circle, 'mouseover', onMouseOver));
        }
        if (onMouseUp) {
            setMouseupListener(google.maps.event.addListener(circle, 'mouseup', onMouseUp));
        }
        if (onRightClick) {
            setRightclickListener(google.maps.event.addListener(circle, 'rightclick', onRightClick));
        }
        if (onClick) {
            setClickListener(google.maps.event.addListener(circle, 'click', onClick));
        }
        if (onDrag) {
            setDragListener(google.maps.event.addListener(circle, 'drag', onDrag));
        }
        if (onCenterChanged) {
            setCenterChangedListener(google.maps.event.addListener(circle, 'center_changed', onCenterChanged));
        }
        if (onRadiusChanged) {
            setRadiusChangedListener(google.maps.event.addListener(circle, 'radius_changed', onRadiusChanged));
        }
        setInstance(circle);
        if (onLoad) {
            onLoad(circle);
        }
        return () => {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            if (dragendListener !== null) {
                google.maps.event.removeListener(dragendListener);
            }
            if (dragstartListener !== null) {
                google.maps.event.removeListener(dragstartListener);
            }
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            if (centerChangedListener !== null) {
                google.maps.event.removeListener(centerChangedListener);
            }
            if (radiusChangedListener !== null) {
                google.maps.event.removeListener(radiusChangedListener);
            }
            if (onUnmount) {
                onUnmount(circle);
            }
            circle.setMap(null);
        };
    }, []);
    return null;
}
const CircleF = (0,react.memo)(CircleFunctional);
class Circle extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            circle: null,
        };
        this.setCircleCallback = () => {
            if (this.state.circle !== null && this.props.onLoad) {
                this.props.onLoad(this.state.circle);
            }
        };
    }
    componentDidMount() {
        const circle = new google.maps.Circle(Object.assign(Object.assign({}, (this.props.options || {})), { 
            // @ts-ignore
            map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$8,
            eventMap: eventMap$8,
            prevProps: {},
            nextProps: this.props,
            instance: circle,
        });
        this.setState(function setCircle() {
            return {
                circle,
            };
        }, this.setCircleCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.circle !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$8,
                eventMap: eventMap$8,
                prevProps,
                nextProps: this.props,
                instance: this.state.circle,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.circle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.circle);
            }
            unregisterEvents(this.registeredEvents);
            this.state.circle && this.state.circle.setMap(null);
        }
    }
    render() {
        return null;
    }
}
Circle.contextType = MapContext;

const eventMap$7 = {
    onClick: 'click',
    onDblClick: 'dblclick',
    onMouseDown: 'mousedown',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
    onAddFeature: 'addfeature',
    onRemoveFeature: 'removefeature',
    onRemoveProperty: 'removeproperty',
    onSetGeometry: 'setgeometry',
    onSetProperty: 'setproperty',
};
const updaterMap$7 = {
    add(instance, feature) {
        instance.add(feature);
    },
    addgeojson(instance, geojson, options) {
        instance.addGeoJson(geojson, options);
    },
    contains(instance, feature) {
        instance.contains(feature);
    },
    foreach(instance, callback) {
        instance.forEach(callback);
    },
    loadgeojson(instance, url, options, callback) {
        instance.loadGeoJson(url, options, callback);
    },
    overridestyle(instance, feature, style) {
        instance.overrideStyle(feature, style);
    },
    remove(instance, feature) {
        instance.remove(feature);
    },
    revertstyle(instance, feature) {
        instance.revertStyle(feature);
    },
    controlposition(instance, controlPosition) {
        instance.setControlPosition(controlPosition);
    },
    controls(instance, controls) {
        instance.setControls(controls);
    },
    drawingmode(instance, mode) {
        instance.setDrawingMode(mode);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    style(instance, style) {
        instance.setStyle(style);
    },
    togeojson(instance, callback) {
        instance.toGeoJson(callback);
    },
};
function DataFunctional({ options, onClick, onDblClick, onMouseDown, onMouseMove, onMouseOut, onMouseOver, onMouseUp, onRightClick, onAddFeature, onRemoveFeature, onRemoveProperty, onSetGeometry, onSetProperty, onLoad, onUnmount, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    const [dblclickListener, setDblclickListener] = (0,react.useState)(null);
    const [mousedownListener, setMousedownListener] = (0,react.useState)(null);
    const [mousemoveListener, setMousemoveListener] = (0,react.useState)(null);
    const [mouseoutListener, setMouseoutListener] = (0,react.useState)(null);
    const [mouseoverListener, setMouseoverListener] = (0,react.useState)(null);
    const [mouseupListener, setMouseupListener] = (0,react.useState)(null);
    const [rightclickListener, setRightclickListener] = (0,react.useState)(null);
    const [clickListener, setClickListener] = (0,react.useState)(null);
    const [addFeatureListener, setAddFeatureListener] = (0,react.useState)(null);
    const [removeFeatureListener, setRemoveFeatureListener] = (0,react.useState)(null);
    const [removePropertyListener, setRemovePropertyListener] = (0,react.useState)(null);
    const [setGeometryListener, setSetGeometryListener] = (0,react.useState)(null);
    const [setPropertyListener, setSetPropertyListener] = (0,react.useState)(null);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (instance && onDblClick) {
            if (dblclickListener !== null) {
                google.maps.event.removeListener(dblclickListener);
            }
            setDblclickListener(google.maps.event.addListener(instance, 'dblclick', onDblClick));
        }
    }, [onDblClick]);
    (0,react.useEffect)(() => {
        if (instance && onMouseDown) {
            if (mousedownListener !== null) {
                google.maps.event.removeListener(mousedownListener);
            }
            setMousedownListener(google.maps.event.addListener(instance, 'mousedown', onMouseDown));
        }
    }, [onMouseDown]);
    (0,react.useEffect)(() => {
        if (instance && onMouseMove) {
            if (mousemoveListener !== null) {
                google.maps.event.removeListener(mousemoveListener);
            }
            setMousemoveListener(google.maps.event.addListener(instance, 'mousemove', onMouseMove));
        }
    }, [onMouseMove]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOut) {
            if (mouseoutListener !== null) {
                google.maps.event.removeListener(mouseoutListener);
            }
            setMouseoutListener(google.maps.event.addListener(instance, 'mouseout', onMouseOut));
        }
    }, [onMouseOut]);
    (0,react.useEffect)(() => {
        if (instance && onMouseOver) {
            if (mouseoverListener !== null) {
                google.maps.event.removeListener(mouseoverListener);
            }
            setMouseoverListener(google.maps.event.addListener(instance, 'mouseover', onMouseOver));
        }
    }, [onMouseOver]);
    (0,react.useEffect)(() => {
        if (instance && onMouseUp) {
            if (mouseupListener !== null) {
                google.maps.event.removeListener(mouseupListener);
            }
            setMouseupListener(google.maps.event.addListener(instance, 'mouseup', onMouseUp));
        }
    }, [onMouseUp]);
    (0,react.useEffect)(() => {
        if (instance && onRightClick) {
            if (rightclickListener !== null) {
                google.maps.event.removeListener(rightclickListener);
            }
            setRightclickListener(google.maps.event.addListener(instance, 'rightclick', onRightClick));
        }
    }, [onRightClick]);
    (0,react.useEffect)(() => {
        if (instance && onClick) {
            if (clickListener !== null) {
                google.maps.event.removeListener(clickListener);
            }
            setClickListener(google.maps.event.addListener(instance, 'click', onClick));
        }
    }, [onClick]);
    (0,react.useEffect)(() => {
        if (instance && onAddFeature) {
            if (addFeatureListener !== null) {
                google.maps.event.removeListener(addFeatureListener);
            }
            setAddFeatureListener(google.maps.event.addListener(instance, 'addfeature', onAddFeature));
        }
    }, [onAddFeature]);
    (0,react.useEffect)(() => {
        if (instance && onRemoveFeature) {
            if (removeFeatureListener !== null) {
                google.maps.event.removeListener(removeFeatureListener);
            }
            setRemoveFeatureListener(google.maps.event.addListener(instance, 'removefeature', onRemoveFeature));
        }
    }, [onRemoveFeature]);
    (0,react.useEffect)(() => {
        if (instance && onRemoveProperty) {
            if (removePropertyListener !== null) {
                google.maps.event.removeListener(removePropertyListener);
            }
            setRemovePropertyListener(google.maps.event.addListener(instance, 'removeproperty', onRemoveProperty));
        }
    }, [onRemoveProperty]);
    (0,react.useEffect)(() => {
        if (instance && onSetGeometry) {
            if (setGeometryListener !== null) {
                google.maps.event.removeListener(setGeometryListener);
            }
            setSetGeometryListener(google.maps.event.addListener(instance, 'setgeometry', onSetGeometry));
        }
    }, [onSetGeometry]);
    (0,react.useEffect)(() => {
        if (instance && onSetProperty) {
            if (setPropertyListener !== null) {
                google.maps.event.removeListener(setPropertyListener);
            }
            setSetPropertyListener(google.maps.event.addListener(instance, 'setproperty', onSetProperty));
        }
    }, [onSetProperty]);
    (0,react.useEffect)(() => {
        if (map !== null) {
            const data = new google.maps.Data(Object.assign(Object.assign({}, (options || {})), { map }));
            if (onDblClick) {
                setDblclickListener(google.maps.event.addListener(data, 'dblclick', onDblClick));
            }
            if (onMouseDown) {
                setMousedownListener(google.maps.event.addListener(data, 'mousedown', onMouseDown));
            }
            if (onMouseMove) {
                setMousemoveListener(google.maps.event.addListener(data, 'mousemove', onMouseMove));
            }
            if (onMouseOut) {
                setMouseoutListener(google.maps.event.addListener(data, 'mouseout', onMouseOut));
            }
            if (onMouseOver) {
                setMouseoverListener(google.maps.event.addListener(data, 'mouseover', onMouseOver));
            }
            if (onMouseUp) {
                setMouseupListener(google.maps.event.addListener(data, 'mouseup', onMouseUp));
            }
            if (onRightClick) {
                setRightclickListener(google.maps.event.addListener(data, 'rightclick', onRightClick));
            }
            if (onClick) {
                setClickListener(google.maps.event.addListener(data, 'click', onClick));
            }
            if (onAddFeature) {
                setAddFeatureListener(google.maps.event.addListener(data, 'addfeature', onAddFeature));
            }
            if (onRemoveFeature) {
                setRemoveFeatureListener(google.maps.event.addListener(data, 'removefeature', onRemoveFeature));
            }
            if (onRemoveProperty) {
                setRemovePropertyListener(google.maps.event.addListener(data, 'removeproperty', onRemoveProperty));
            }
            if (onSetGeometry) {
                setSetGeometryListener(google.maps.event.addListener(data, 'setgeometry', onSetGeometry));
            }
            if (onSetProperty) {
                setSetPropertyListener(google.maps.event.addListener(data, 'setproperty', onSetProperty));
            }
            setInstance(data);
            if (onLoad) {
                onLoad(data);
            }
        }
        return () => {
            if (instance) {
                if (dblclickListener !== null) {
                    google.maps.event.removeListener(dblclickListener);
                }
                if (mousedownListener !== null) {
                    google.maps.event.removeListener(mousedownListener);
                }
                if (mousemoveListener !== null) {
                    google.maps.event.removeListener(mousemoveListener);
                }
                if (mouseoutListener !== null) {
                    google.maps.event.removeListener(mouseoutListener);
                }
                if (mouseoverListener !== null) {
                    google.maps.event.removeListener(mouseoverListener);
                }
                if (mouseupListener !== null) {
                    google.maps.event.removeListener(mouseupListener);
                }
                if (rightclickListener !== null) {
                    google.maps.event.removeListener(rightclickListener);
                }
                if (clickListener !== null) {
                    google.maps.event.removeListener(clickListener);
                }
                if (addFeatureListener !== null) {
                    google.maps.event.removeListener(addFeatureListener);
                }
                if (removeFeatureListener !== null) {
                    google.maps.event.removeListener(removeFeatureListener);
                }
                if (removePropertyListener !== null) {
                    google.maps.event.removeListener(removePropertyListener);
                }
                if (setGeometryListener !== null) {
                    google.maps.event.removeListener(setGeometryListener);
                }
                if (setPropertyListener !== null) {
                    google.maps.event.removeListener(setPropertyListener);
                }
                if (onUnmount) {
                    onUnmount(instance);
                }
                instance.setMap(null);
            }
        };
    }, []);
    return null;
}
const DataF = (0,react.memo)(DataFunctional);
class Data extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            data: null,
        };
        this.setDataCallback = () => {
            if (this.state.data !== null && this.props.onLoad) {
                this.props.onLoad(this.state.data);
            }
        };
    }
    componentDidMount() {
        if (this.context !== null) {
            const data = new google.maps.Data(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$7,
                eventMap: eventMap$7,
                prevProps: {},
                nextProps: this.props,
                instance: data,
            });
            this.setState(() => {
                return {
                    data,
                };
            }, this.setDataCallback);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.data !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$7,
                eventMap: eventMap$7,
                prevProps,
                nextProps: this.props,
                instance: this.state.data,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.data !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.data);
            }
            unregisterEvents(this.registeredEvents);
            if (this.state.data) {
                this.state.data.setMap(null);
            }
        }
    }
    render() {
        return null;
    }
}
Data.contextType = MapContext;

const eventMap$6 = {
    onClick: 'click',
    onDefaultViewportChanged: 'defaultviewport_changed',
    onStatusChanged: 'status_changed',
};
const updaterMap$6 = {
    options(instance, options) {
        instance.setOptions(options);
    },
    url(instance, url) {
        instance.setUrl(url);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
class KmlLayer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            kmlLayer: null,
        };
        this.setKmlLayerCallback = () => {
            if (this.state.kmlLayer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.kmlLayer);
            }
        };
    }
    componentDidMount() {
        const kmlLayer = new google.maps.KmlLayer(Object.assign(Object.assign({}, this.props.options), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$6,
            eventMap: eventMap$6,
            prevProps: {},
            nextProps: this.props,
            instance: kmlLayer,
        });
        this.setState(function setLmlLayer() {
            return {
                kmlLayer,
            };
        }, this.setKmlLayerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.kmlLayer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$6,
                eventMap: eventMap$6,
                prevProps,
                nextProps: this.props,
                instance: this.state.kmlLayer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.kmlLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.kmlLayer);
            }
            unregisterEvents(this.registeredEvents);
            this.state.kmlLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
KmlLayer.contextType = MapContext;

function getOffsetOverride(containerElement, getPixelPositionOffset) {
    return typeof getPixelPositionOffset === 'function'
        ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
        : {
            x: 0,
            y: 0,
        };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLatLng(inst, Type) { return new Type(inst.lat, inst.lng); }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createLatLngBounds(inst, Type) {
    return new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ensureOfType(inst, type, factory) {
    return inst instanceof type ? inst : factory(inst, type);
}
function ensureOfTypeBounds(inst, type, factory) {
    return inst instanceof type ? inst : factory(inst, type);
}
function getLayoutStylesByBounds(mapCanvasProjection, offset, bounds) {
    const ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
    const sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
    if (ne && sw) {
        return {
            left: `${sw.x + offset.x}px`,
            top: `${ne.y + offset.y}px`,
            width: `${ne.x - sw.x - offset.x}px`,
            height: `${sw.y - ne.y - offset.y}px`,
        };
    }
    return {
        left: '-9999px',
        top: '-9999px',
    };
}
function getLayoutStylesByPosition(mapCanvasProjection, offset, position) {
    const point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position);
    if (point) {
        const { x, y } = point;
        return {
            left: `${x + offset.x}px`,
            top: `${y + offset.y}px`,
        };
    }
    return {
        left: '-9999px',
        top: '-9999px',
    };
}
function getLayoutStyles(mapCanvasProjection, offset, bounds, position) {
    return bounds !== undefined
        ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfTypeBounds(bounds, google.maps.LatLngBounds, createLatLngBounds))
        : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
}
function arePositionsEqual(currentPosition, previousPosition) {
    return currentPosition.left === previousPosition.left
        && currentPosition.top === previousPosition.top
        && currentPosition.width === previousPosition.height
        && currentPosition.height === previousPosition.height;
}

function createOverlay(container, pane, position, bounds, getPixelPositionOffset) {
    class Overlay extends google.maps.OverlayView {
        constructor(container, pane, position, bounds) {
            super();
            this.container = container;
            this.pane = pane;
            this.position = position;
            this.bounds = bounds;
        }
        onAdd() {
            var _a;
            const pane = (_a = this.getPanes()) === null || _a === void 0 ? void 0 : _a[this.pane];
            pane === null || pane === void 0 ? void 0 : pane.appendChild(this.container);
        }
        draw() {
            const projection = this.getProjection();
            const offset = Object.assign({}, (this.container
                ? getOffsetOverride(this.container, getPixelPositionOffset)
                : {
                    x: 0,
                    y: 0,
                }));
            const layoutStyles = getLayoutStyles(projection, offset, this.bounds, this.position);
            for (const [key, value] of Object.entries(layoutStyles)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.container.style[key] = value;
            }
        }
        onRemove() {
            if (this.container.parentNode !== null) {
                this.container.parentNode.removeChild(this.container);
            }
        }
    }
    return new Overlay(container, pane, position, bounds);
}

function convertToLatLngString(latLngLike) {
    if (!latLngLike) {
        return '';
    }
    const latLng = latLngLike instanceof google.maps.LatLng
        ? latLngLike
        : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
    return latLng + '';
}
function convertToLatLngBoundsString(latLngBoundsLike) {
    if (!latLngBoundsLike) {
        return '';
    }
    const latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds
        ? latLngBoundsLike
        : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
    return latLngBounds + '';
}
const FLOAT_PANE = (/* unused pure expression or super */ null && (`floatPane`));
const MAP_PANE = (/* unused pure expression or super */ null && (`mapPane`));
const MARKER_LAYER = (/* unused pure expression or super */ null && (`markerLayer`));
const OVERLAY_LAYER = (/* unused pure expression or super */ null && (`overlayLayer`));
const OVERLAY_MOUSE_TARGET = (/* unused pure expression or super */ null && (`overlayMouseTarget`));
function OverlayViewFunctional({ position, bounds, mapPaneName, zIndex, onLoad, onUnmount, getPixelPositionOffset, children, }) {
    const map = (0,react.useContext)(MapContext);
    const container = (0,react.useMemo)(() => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        return div;
    }, []);
    const overlay = (0,react.useMemo)(() => {
        return createOverlay(container, mapPaneName, position, bounds, getPixelPositionOffset);
    }, [container, mapPaneName, position, bounds]);
    (0,react.useEffect)(() => {
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(overlay);
        overlay === null || overlay === void 0 ? void 0 : overlay.setMap(map);
        return () => {
            onUnmount === null || onUnmount === void 0 ? void 0 : onUnmount(overlay);
            overlay === null || overlay === void 0 ? void 0 : overlay.setMap(null);
        };
    }, [map, overlay]);
    // to move the container to the foreground and background
    (0,react.useEffect)(() => {
        container.style.zIndex = `${zIndex}`;
    }, [zIndex, container]);
    return react_dom.createPortal(children, container);
}
const OverlayViewF = (0,react.memo)(OverlayViewFunctional);
class OverlayView extends react.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paneEl: null,
            containerStyle: {
                // set initial position
                position: 'absolute',
            },
        };
        this.updatePane = () => {
            const mapPaneName = this.props.mapPaneName;
            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
            const mapPanes = this.overlayView.getPanes();
            invariant_1(!!mapPaneName, `OverlayView requires props.mapPaneName but got %s`, mapPaneName);
            if (mapPanes) {
                this.setState({
                    paneEl: mapPanes[mapPaneName],
                });
            }
            else {
                this.setState({
                    paneEl: null,
                });
            }
        };
        this.onAdd = () => {
            var _a, _b;
            this.updatePane();
            (_b = (_a = this.props).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
        };
        this.onPositionElement = () => {
            const mapCanvasProjection = this.overlayView.getProjection();
            const offset = Object.assign({ x: 0, y: 0 }, (this.containerRef.current
                ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset)
                : {}));
            const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
            const { left, top, width, height } = this.state.containerStyle;
            if (!arePositionsEqual(layoutStyles, { left, top, width, height })) {
                this.setState({
                    containerStyle: Object.assign(Object.assign({}, layoutStyles), { position: 'absolute' }),
                });
            }
        };
        this.draw = () => {
            this.onPositionElement();
        };
        this.onRemove = () => {
            var _a, _b;
            this.setState(() => ({
                paneEl: null,
            }));
            // this.mapPaneEl = null
            (_b = (_a = this.props).onUnmount) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
        };
        this.containerRef = (0,react.createRef)();
        // You must implement three methods: onAdd(), draw(), and onRemove().
        const overlayView = new google.maps.OverlayView();
        overlayView.onAdd = this.onAdd;
        overlayView.draw = this.draw;
        overlayView.onRemove = this.onRemove;
        this.overlayView = overlayView;
    }
    componentDidMount() {
        // You must call setMap() with a valid Map object to trigger the call to
        // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.overlayView.setMap(this.context);
    }
    componentDidUpdate(prevProps) {
        const prevPositionString = convertToLatLngString(prevProps.position);
        const positionString = convertToLatLngString(this.props.position);
        const prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
        const boundsString = convertToLatLngBoundsString(this.props.bounds);
        if (prevPositionString !== positionString ||
            prevBoundsString !== boundsString) {
            this.overlayView.draw();
        }
        if (prevProps.mapPaneName !== this.props.mapPaneName) {
            this.updatePane();
        }
    }
    componentWillUnmount() {
        this.overlayView.setMap(null);
    }
    render() {
        const paneEl = this.state.paneEl;
        if (paneEl) {
            return react_dom.createPortal((0,jsx_runtime.jsx)("div", Object.assign({ ref: this.containerRef, style: this.state.containerStyle }, { children: react.Children.only(this.props.children) })), paneEl);
        }
        else {
            return null;
        }
    }
}
OverlayView.FLOAT_PANE = `floatPane`;
OverlayView.MAP_PANE = `mapPane`;
OverlayView.MARKER_LAYER = `markerLayer`;
OverlayView.OVERLAY_LAYER = `overlayLayer`;
OverlayView.OVERLAY_MOUSE_TARGET = `overlayMouseTarget`;
OverlayView.contextType = MapContext;

function noop() { return; }

const eventMap$5 = {
    onDblClick: 'dblclick',
    onClick: 'click',
};
const updaterMap$5 = {
    opacity(instance, opacity) {
        instance.setOpacity(opacity);
    },
};
function GroundOverlayFunctional({ url, bounds, options, visible }) {
    const map = (0,react.useContext)(MapContext);
    const imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
    const groundOverlay = (0,react.useMemo)(() => {
        const overlay = new google.maps.GroundOverlay(url, imageBounds, Object.assign({}, options));
        return overlay;
    }, []);
    (0,react.useEffect)(() => {
        if (groundOverlay !== null) {
            groundOverlay.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (typeof url !== 'undefined' && groundOverlay !== null) {
            groundOverlay.set("url", url);
            groundOverlay.setMap(map);
        }
    }, [groundOverlay, url]);
    (0,react.useEffect)(() => {
        if (typeof visible !== 'undefined' && groundOverlay !== null) {
            groundOverlay.setOpacity(visible ? 1 : 0);
        }
    }, [groundOverlay, visible]);
    (0,react.useEffect)(() => {
        const newBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds.south, bounds.west), new google.maps.LatLng(bounds.north, bounds.east));
        if (typeof bounds !== 'undefined' && groundOverlay !== null) {
            groundOverlay.set("bounds", newBounds);
            groundOverlay.setMap(map);
        }
    }, [groundOverlay, bounds]);
    return null;
}
const GroundOverlayF = (0,react.memo)(GroundOverlayFunctional);
class GroundOverlay extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            groundOverlay: null,
        };
        this.setGroundOverlayCallback = () => {
            if (this.state.groundOverlay !== null && this.props.onLoad) {
                this.props.onLoad(this.state.groundOverlay);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.url || !!this.props.bounds, `For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`);
        const groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, Object.assign(Object.assign({}, this.props.options), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$5,
            eventMap: eventMap$5,
            prevProps: {},
            nextProps: this.props,
            instance: groundOverlay,
        });
        this.setState(function setGroundOverlay() {
            return {
                groundOverlay,
            };
        }, this.setGroundOverlayCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.groundOverlay !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$5,
                eventMap: eventMap$5,
                prevProps,
                nextProps: this.props,
                instance: this.state.groundOverlay,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.groundOverlay) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.groundOverlay);
            }
            this.state.groundOverlay.setMap(null);
        }
    }
    render() {
        return null;
    }
}
GroundOverlay.defaultProps = {
    onLoad: noop,
};
GroundOverlay.contextType = MapContext;

const eventMap$4 = {};
const updaterMap$4 = {
    data(instance, data) {
        instance.setData(data);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
};
function HeatmapLayerFunctional({ data, onLoad, onUnmount, options, }) {
    const map = (0,react.useContext)(MapContext);
    const [instance, setInstance] = (0,react.useState)(null);
    (0,react.useEffect)(() => {
        if (!google.maps.visualization) {
            invariant_1(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} in useJsApiScript? %s', google.maps.visualization);
        }
    }, []);
    (0,react.useEffect)(() => {
        invariant_1(!!data, 'data property is required in HeatmapLayer %s', data);
    }, [data]);
    // Order does matter
    (0,react.useEffect)(() => {
        if (instance !== null) {
            instance.setMap(map);
        }
    }, [map]);
    (0,react.useEffect)(() => {
        if (options && instance !== null) {
            instance.setOptions(options);
        }
    }, [instance, options]);
    (0,react.useEffect)(() => {
        const heatmapLayer = new google.maps.visualization.HeatmapLayer(Object.assign(Object.assign({}, (options || {})), { data,
            map }));
        setInstance(heatmapLayer);
        if (onLoad) {
            onLoad(heatmapLayer);
        }
        return () => {
            if (instance !== null) {
                if (onUnmount) {
                    onUnmount(instance);
                }
                instance.setMap(null);
            }
        };
    }, []);
    return null;
}
const HeatmapLayerF = (0,react.memo)(HeatmapLayerFunctional);
class HeatmapLayer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            heatmapLayer: null,
        };
        this.setHeatmapLayerCallback = () => {
            if (this.state.heatmapLayer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.heatmapLayer);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
        invariant_1(!!this.props.data, 'data property is required in HeatmapLayer %s', this.props.data);
        const heatmapLayer = new google.maps.visualization.HeatmapLayer(Object.assign(Object.assign({}, (this.props.options || {})), { data: this.props.data, map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$4,
            eventMap: eventMap$4,
            prevProps: {},
            nextProps: this.props,
            instance: heatmapLayer,
        });
        this.setState(function setHeatmapLayer() {
            return {
                heatmapLayer,
            };
        }, this.setHeatmapLayerCallback);
    }
    componentDidUpdate(prevProps) {
        unregisterEvents(this.registeredEvents);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$4,
            eventMap: eventMap$4,
            prevProps,
            nextProps: this.props,
            instance: this.state.heatmapLayer,
        });
    }
    componentWillUnmount() {
        if (this.state.heatmapLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.heatmapLayer);
            }
            unregisterEvents(this.registeredEvents);
            this.state.heatmapLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
HeatmapLayer.contextType = MapContext;

const eventMap$3 = {
    onCloseClick: 'closeclick',
    onPanoChanged: 'pano_changed',
    onPositionChanged: 'position_changed',
    onPovChanged: 'pov_changed',
    onResize: 'resize',
    onStatusChanged: 'status_changed',
    onVisibleChanged: 'visible_changed',
    onZoomChanged: 'zoom_changed',
};
const updaterMap$3 = {
    register(instance, provider, options) {
        instance.registerPanoProvider(provider, options);
    },
    links(instance, links) {
        instance.setLinks(links);
    },
    motionTracking(instance, motionTracking) {
        instance.setMotionTracking(motionTracking);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    pano(instance, pano) {
        instance.setPano(pano);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    pov(instance, pov) {
        instance.setPov(pov);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zoom(instance, zoom) {
        instance.setZoom(zoom);
    },
};
class StreetViewPanorama extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            streetViewPanorama: null,
        };
        this.setStreetViewPanoramaCallback = () => {
            if (this.state.streetViewPanorama !== null && this.props.onLoad) {
                this.props.onLoad(this.state.streetViewPanorama);
            }
        };
    }
    componentDidMount() {
        // @ts-ignore
        const streetViewPanorama = this.context.getStreetView();
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$3,
            eventMap: eventMap$3,
            prevProps: {},
            nextProps: this.props,
            instance: streetViewPanorama,
        });
        this.setState(() => {
            return {
                streetViewPanorama,
            };
        }, this.setStreetViewPanoramaCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.streetViewPanorama !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$3,
                eventMap: eventMap$3,
                prevProps,
                nextProps: this.props,
                instance: this.state.streetViewPanorama,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.streetViewPanorama !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.streetViewPanorama);
            }
            unregisterEvents(this.registeredEvents);
            this.state.streetViewPanorama.setVisible(false);
        }
    }
    render() {
        return null;
    }
}
StreetViewPanorama.contextType = MapContext;

class StreetViewService extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            streetViewService: null,
        };
        this.setStreetViewServiceCallback = () => {
            if (this.state.streetViewService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.streetViewService);
            }
        };
    }
    componentDidMount() {
        const streetViewService = new google.maps.StreetViewService();
        this.setState(function setStreetViewService() {
            return {
                streetViewService,
            };
        }, this.setStreetViewServiceCallback);
    }
    componentWillUnmount() {
        if (this.state.streetViewService !== null && this.props.onUnmount) {
            this.props.onUnmount(this.state.streetViewService);
        }
    }
    render() {
        return null;
    }
}
StreetViewService.contextType = MapContext;

class DirectionsService extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            directionsService: null,
        };
        this.setDirectionsServiceCallback = () => {
            if (this.state.directionsService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.directionsService);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.options, 'DirectionsService expected options object as parameter, but got %s', this.props.options);
        const directionsService = new google.maps.DirectionsService();
        this.setState(function setDirectionsService() {
            return {
                directionsService,
            };
        }, this.setDirectionsServiceCallback);
    }
    componentDidUpdate() {
        if (this.state.directionsService !== null) {
            this.state.directionsService.route(this.props.options, this.props.callback);
        }
    }
    componentWillUnmount() {
        if (this.state.directionsService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsService);
            }
        }
    }
    render() {
        return null;
    }
}

const eventMap$2 = {
    onDirectionsChanged: 'directions_changed',
};
const updaterMap$2 = {
    directions(instance, directions) {
        instance.setDirections(directions);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    panel(instance, panel) {
        instance.setPanel(panel);
    },
    routeIndex(instance, routeIndex) {
        instance.setRouteIndex(routeIndex);
    },
};
class DirectionsRenderer extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            directionsRenderer: null,
        };
        this.setDirectionsRendererCallback = () => {
            if (this.state.directionsRenderer !== null) {
                // @ts-ignore
                this.state.directionsRenderer.setMap(this.context);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.directionsRenderer);
                }
            }
        };
    }
    componentDidMount() {
        const directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$2,
            eventMap: eventMap$2,
            prevProps: {},
            nextProps: this.props,
            instance: directionsRenderer,
        });
        this.setState(function setDirectionsRenderer() {
            return {
                directionsRenderer,
            };
        }, this.setDirectionsRendererCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.directionsRenderer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$2,
                eventMap: eventMap$2,
                prevProps,
                nextProps: this.props,
                instance: this.state.directionsRenderer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.directionsRenderer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsRenderer);
            }
            unregisterEvents(this.registeredEvents);
            if (this.state.directionsRenderer) {
                this.state.directionsRenderer.setMap(null);
            }
        }
    }
    render() {
        return (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
    }
}
DirectionsRenderer.contextType = MapContext;

class DistanceMatrixService extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            distanceMatrixService: null,
        };
        this.setDistanceMatrixServiceCallback = () => {
            if (this.state.distanceMatrixService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.distanceMatrixService);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.options, 'DistanceMatrixService expected options object as parameter, but go %s', this.props.options);
        const distanceMatrixService = new google.maps.DistanceMatrixService();
        this.setState(function setDistanceMatrixService() {
            return {
                distanceMatrixService,
            };
        }, this.setDistanceMatrixServiceCallback);
    }
    componentDidUpdate() {
        if (this.state.distanceMatrixService !== null) {
            this.state.distanceMatrixService.getDistanceMatrix(this.props.options, this.props.callback);
        }
    }
    componentWillUnmount() {
        if (this.state.distanceMatrixService !== null && this.props.onUnmount) {
            this.props.onUnmount(this.state.distanceMatrixService);
        }
    }
    render() {
        return null;
    }
}

const eventMap$1 = {
    onPlacesChanged: 'places_changed',
};
const updaterMap$1 = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
};
class StandaloneSearchBox extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = (0,react.createRef)();
        this.state = {
            searchBox: null,
        };
        this.setSearchBoxCallback = () => {
            if (this.state.searchBox !== null && this.props.onLoad) {
                this.props.onLoad(this.state.searchBox);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
        if (this.containerElement !== null && this.containerElement.current !== null) {
            const input = this.containerElement.current.querySelector('input');
            if (input !== null) {
                const searchBox = new google.maps.places.SearchBox(input, this.props.options);
                this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                    updaterMap: updaterMap$1,
                    eventMap: eventMap$1,
                    prevProps: {},
                    nextProps: this.props,
                    instance: searchBox,
                });
                this.setState(function setSearchBox() {
                    return {
                        searchBox,
                    };
                }, this.setSearchBoxCallback);
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.searchBox !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$1,
                eventMap: eventMap$1,
                prevProps,
                nextProps: this.props,
                instance: this.state.searchBox,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.searchBox !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.searchBox);
            }
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return (0,jsx_runtime.jsx)("div", Object.assign({ ref: this.containerElement }, { children: react.Children.only(this.props.children) }));
    }
}
StandaloneSearchBox.contextType = MapContext;

const eventMap = {
    onPlaceChanged: 'place_changed',
};
const updaterMap = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
    restrictions(instance, restrictions) {
        instance.setComponentRestrictions(restrictions);
    },
    fields(instance, fields) {
        instance.setFields(fields);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    types(instance, types) {
        instance.setTypes(types);
    },
};
class Autocomplete extends react.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = (0,react.createRef)();
        this.state = {
            autocomplete: null,
        };
        this.setAutocompleteCallback = () => {
            if (this.state.autocomplete !== null && this.props.onLoad) {
                this.props.onLoad(this.state.autocomplete);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
        // TODO: why current could be equal null?
        // @ts-ignore
        const input = this.containerElement.current.querySelector('input');
        if (input) {
            const autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap,
                eventMap,
                prevProps: {},
                nextProps: this.props,
                instance: autocomplete,
            });
            this.setState(() => {
                return {
                    autocomplete,
                };
            }, this.setAutocompleteCallback);
        }
    }
    componentDidUpdate(prevProps) {
        unregisterEvents(this.registeredEvents);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps,
            nextProps: this.props,
            instance: this.state.autocomplete,
        });
    }
    componentWillUnmount() {
        if (this.state.autocomplete !== null) {
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return (0,jsx_runtime.jsx)("div", Object.assign({ ref: this.containerElement, className: this.props.className }, { children: react.Children.only(this.props.children) }));
    }
}
Autocomplete.defaultProps = {
    className: ''
};
Autocomplete.contextType = MapContext;


//# sourceMappingURL=esm.js.map

// EXTERNAL MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/utils/axios.ts
var axios = __webpack_require__(77370);
;// CONCATENATED MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/utils/input.ts
const getDefaultCordsFromAttribute = ({
  optionsDefaultLat,
  optionsDefaultLng
}) => {
  const defaultLat = Number(optionsDefaultLat);
  const defaultLng = Number(optionsDefaultLng);
  if (defaultLat && defaultLng && !isNaN(defaultLat) && !isNaN(defaultLng)) {
    return { lat: defaultLat, lng: defaultLng };
  }
  return null;
};

// EXTERNAL MODULE: ./node_modules/react-geolocated/dist-modules/index.js
var dist_modules = __webpack_require__(14681);
;// CONCATENATED MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/components/Input/index.tsx









const mapsLibraries = ["places"];
const fallbackCenter = {
  lat: 51.51652494189269,
  lng: 7.45560626859687
};
const Input = ({
  attribute,
  intlLabel,
  onChange,
  value,
  name,
  required
}) => {
  const overwriteFieldValue = (value2) => {
    onChange({
      target: {
        name,
        value: value2 ? JSON.stringify(value2) : null,
        type: attribute.type
        // json
      }
    });
  };
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const { coords: userCords } = (0,dist_modules/* useGeolocated */.E)({
    positionOptions: {
      enableHighAccuracy: false
    }
  });
  const defaultCords = getDefaultCordsFromAttribute(attribute);
  const [configIsLoaded, setConfigIsLoaded] = (0,react.useState)(false);
  const [mapsIsLoaded, setMapsIsLoaded] = (0,react.useState)(false);
  const [requirementNotMet, setRequirementNotMet] = (0,react.useState)(false);
  const [config, setConfig] = (0,react.useState)({
    id: 0,
    googleMapsKey: ""
  });
  const [cords, setCords] = (0,react.useState)(null);
  const [mapsCenter, setMapsCenter] = (0,react.useState)(
    fallbackCenter
    // Current map's center coordinates
  );
  const [address, setAddress] = (0,react.useState)("");
  const [searchBox, setSearchBox] = (0,react.useState)(null);
  const resetComponent = (persistValue = true) => {
    if (!persistValue)
      overwriteFieldValue(null);
    const parsedValue = persistValue ? JSON.parse(value || null) : null;
    setCords(parsedValue?.coordinates || null);
    setMapsCenter(
      parsedValue?.coordinates ?? (userCords ? { lat: userCords.latitude, lng: userCords.longitude } : fallbackCenter)
      // Set map's center to saved coordinates, default coordinates, user coordinates or default coordinates
    );
    setAddress("");
  };
  (0,react.useEffect)(() => {
    if (!cords && userCords)
      setMapsCenter({ lat: userCords.latitude, lng: userCords.longitude });
  }, [userCords, cords]);
  (0,react.useEffect)(() => {
    resetComponent();
    (0,axios/* getConfig */.iE)().then((response) => {
      const { data } = response.data;
      setConfig(data);
      setConfigIsLoaded(true);
    }).catch((error) => {
      console.error(error);
    });
  }, []);
  (0,react.useEffect)(() => {
    if (mapsIsLoaded && !value && defaultCords) {
      setCords(defaultCords);
      setMapsCenter(defaultCords);
    }
  }, [mapsIsLoaded]);
  (0,react.useEffect)(() => {
    setRequirementNotMet(required && !cords);
    if (!cords || !mapsIsLoaded)
      return;
    const geohash = latlon_geohash.encode(cords?.lat, cords?.lng);
    const location = {
      coordinates: cords,
      geohash
    };
    overwriteFieldValue(location);
  }, [cords]);
  const handlePlaceChanged = () => {
    const results = searchBox?.getPlaces();
    if (results && results.length) {
      const place = results[0];
      if (place.formatted_address)
        setAddress(place.formatted_address);
      const coordinates = place.geometry?.location?.toJSON();
      setCords(coordinates);
      setMapsCenter(coordinates);
    }
  };
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "pi", fontWeight: "bold" }, formatMessage(intlLabel)), /* @__PURE__ */ react.createElement(
    Box/* Box */.x,
    {
      marginTop: 1,
      borderColor: requirementNotMet ? "danger600" : "primary200"
    },
    configIsLoaded && /* @__PURE__ */ react.createElement(
      LoadScript,
      {
        googleMapsApiKey: config.googleMapsKey,
        libraries: mapsLibraries,
        onLoad: () => setMapsIsLoaded(true)
      }
    ),
    !configIsLoaded || !mapsIsLoaded ? /* @__PURE__ */ react.createElement("div", { style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ react.createElement(Loader/* Loader */.a, { small: true }, "Loading content...")) : /* @__PURE__ */ react.createElement(
      GoogleMap,
      {
        mapContainerStyle: {
          width: "100%",
          height: "400px"
        },
        center: mapsCenter,
        zoom: 20,
        onClick: ({ latLng }) => setCords(latLng?.toJSON())
      },
      /* @__PURE__ */ react.createElement(
        StandaloneSearchBox,
        {
          bounds: userCords ? new google.maps.LatLngBounds({
            lat: userCords.latitude,
            lng: userCords.longitude
          }) : void 0,
          onLoad: (ref) => setSearchBox(ref),
          onPlacesChanged: handlePlaceChanged
        },
        /* @__PURE__ */ react.createElement(
          "input",
          {
            type: "text",
            placeholder: formatMessage({
              id: "google-maps.input.search.placeholder",
              defaultMessage: "Search for a place"
            }),
            value: address,
            onChange: (e) => setAddress(e.target.value),
            style: {
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `300px`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-140px",
              marginTop: "10px"
            }
          }
        )
      ),
      cords && /* @__PURE__ */ react.createElement(Marker, { position: cords })
    )
  ), requirementNotMet && /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 1 }, /* @__PURE__ */ react.createElement(Typography/* Typography */.Z, { variant: "pi", textColor: "danger600" }, formatMessage({
    id: "google-maps.input.error.required",
    defaultMessage: "You must pick a location"
  }))), /* @__PURE__ */ react.createElement(Box/* Box */.x, { paddingTop: 2 }, /* @__PURE__ */ react.createElement(Button/* Button */.z, { startIcon: /* @__PURE__ */ react.createElement(Refresh/* default */.Z, null), onClick: () => resetComponent(false) }, formatMessage({
    id: "google-maps.input.button.reset",
    defaultMessage: "Reset"
  }))));
};
/* harmony default export */ const components_Input = (Input);


/***/ }),

/***/ 77370:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   iE: () => (/* binding */ getConfig),
/* harmony export */   rF: () => (/* binding */ updateConfig)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(52861);
/* harmony import */ var _pluginId__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5150);
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52176);



const instance = axios__WEBPACK_IMPORTED_MODULE_2__["default"].create({
  baseURL: `${""}/${_pluginId__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z}`,
  headers: {
    Authorization: `Bearer ${_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_1__/* .auth */ .I8.getToken()}`,
    "Content-Type": "application/json"
  }
});
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (instance)));
const getConfig = () => instance.get("/config");
const updateConfig = (config) => instance.put("/config", {
  data: config
});


/***/ }),

/***/ 14681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
exports.E = void 0;
const react_1 = __webpack_require__(67294);
/**
 * Hook abstracting away the interaction with the Geolocation API.
 * @param config - the configuration to use
 */
function useGeolocated(config = {}) {
    const { positionOptions = {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    }, isOptimisticGeolocationEnabled = true, userDecisionTimeout = undefined, suppressLocationOnMount = false, watchPosition = false, geolocationProvider = typeof navigator !== "undefined"
        ? navigator.geolocation
        : undefined, watchLocationPermissionChange = false, onError, onSuccess, } = config;
    const userDecisionTimeoutId = (0, react_1.useRef)(0);
    const isCurrentlyMounted = (0, react_1.useRef)(true);
    const watchId = (0, react_1.useRef)(0);
    const [isGeolocationEnabled, setIsGeolocationEnabled] = (0, react_1.useState)(isOptimisticGeolocationEnabled);
    const [coords, setCoords] = (0, react_1.useState)();
    const [timestamp, setTimestamp] = (0, react_1.useState)();
    const [positionError, setPositionError] = (0, react_1.useState)();
    const [permissionState, setPermissionState] = (0, react_1.useState)();
    const cancelUserDecisionTimeout = (0, react_1.useCallback)(() => {
        if (userDecisionTimeoutId.current) {
            window.clearTimeout(userDecisionTimeoutId.current);
        }
    }, []);
    const handlePositionError = (0, react_1.useCallback)((error) => {
        cancelUserDecisionTimeout();
        if (isCurrentlyMounted.current) {
            setCoords(() => undefined);
            setIsGeolocationEnabled(false);
            setPositionError(error);
        }
        onError === null || onError === void 0 ? void 0 : onError(error);
    }, [onError, cancelUserDecisionTimeout]);
    const handlePositionSuccess = (0, react_1.useCallback)((position) => {
        cancelUserDecisionTimeout();
        if (isCurrentlyMounted.current) {
            setCoords(position.coords);
            setTimestamp(position.timestamp);
            setIsGeolocationEnabled(true);
            setPositionError(() => undefined);
        }
        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess(position);
    }, [onSuccess, cancelUserDecisionTimeout]);
    const getPosition = (0, react_1.useCallback)(() => {
        if (!geolocationProvider ||
            !geolocationProvider.getCurrentPosition ||
            !geolocationProvider.watchPosition) {
            throw new Error("The provided geolocation provider is invalid");
        }
        const funcPosition = (watchPosition
            ? geolocationProvider.watchPosition
            : geolocationProvider.getCurrentPosition).bind(geolocationProvider);
        if (userDecisionTimeout) {
            userDecisionTimeoutId.current = window.setTimeout(() => {
                handlePositionError();
            }, userDecisionTimeout);
        }
        watchId.current = funcPosition(handlePositionSuccess, handlePositionError, positionOptions);
    }, [
        geolocationProvider,
        watchPosition,
        userDecisionTimeout,
        handlePositionError,
        handlePositionSuccess,
        positionOptions,
    ]);
    (0, react_1.useEffect)(() => {
        let permission;
        if (watchLocationPermissionChange &&
            geolocationProvider &&
            "permissions" in navigator) {
            navigator.permissions
                .query({ name: "geolocation" })
                .then((result) => {
                permission = result;
                permission.onchange = () => {
                    setPermissionState(permission.state);
                };
            });
        }
        return () => {
            if (permission) {
                permission.onchange = null;
            }
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    (0, react_1.useEffect)(() => {
        if (!suppressLocationOnMount) {
            getPosition();
        }
        return () => {
            cancelUserDecisionTimeout();
            if (watchPosition && watchId.current) {
                geolocationProvider === null || geolocationProvider === void 0 ? void 0 : geolocationProvider.clearWatch(watchId.current);
            }
        };
    }, [permissionState]); // eslint-disable-line react-hooks/exhaustive-deps
    return {
        getPosition,
        coords,
        timestamp,
        isGeolocationEnabled,
        isGeolocationAvailable: Boolean(geolocationProvider),
        positionError,
    };
}
exports.E = useGeolocated;


/***/ })

}]);