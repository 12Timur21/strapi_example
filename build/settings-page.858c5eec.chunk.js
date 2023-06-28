"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[6652],{

/***/ 10173:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages_Settings)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/pluginId.ts
var pluginId = __webpack_require__(5150);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 24 modules
var helper_plugin_esm = __webpack_require__(52176);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/Layout.js
var Layout = __webpack_require__(17034);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Main/Main.js
var Main = __webpack_require__(185);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js + 2 modules
var HeaderLayout = __webpack_require__(53979);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Button/Button.js
var Button = __webpack_require__(29728);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Layout/ContentLayout.js
var ContentLayout = __webpack_require__(49066);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Loader/Loader.js + 1 modules
var Loader = __webpack_require__(77197);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/TextInput/TextInput.js
var TextInput = __webpack_require__(16364);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/Grid.js
var Grid = __webpack_require__(11276);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Grid/GridItem.js
var GridItem = __webpack_require__(67819);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Link/Link.js
var Link = __webpack_require__(23620);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Check.js
var Check = __webpack_require__(85018);
// EXTERNAL MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/utils/axios.ts
var axios = __webpack_require__(77370);
;// CONCATENATED MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/components/Settings/index.tsx






const Settings = () => {
  const toggleNotification = (0,helper_plugin_esm/* useNotification */.lm)();
  const [isLoading, setIsLoading] = (0,react.useState)(true);
  const [errorOccurred, setErrorOccurred] = (0,react.useState)(false);
  const [data, setData] = (0,react.useState)({
    id: 0,
    googleMapsKey: ""
  });
  const [madeChanges, setMadeChanges] = (0,react.useState)(false);
  (0,react.useEffect)(() => {
    (0,axios/* getConfig */.iE)().then((response) => {
      setIsLoading(false);
      const { data: config } = response.data;
      setData(config);
    }).catch((error) => {
      setIsLoading(false);
      console.error(error);
      setErrorOccurred(true);
    });
  }, []);
  const handleSave = async () => {
    setIsLoading(true);
    try {
      await (0,axios/* updateConfig */.rF)(data);
      setMadeChanges(false);
      toggleNotification({
        type: "success",
        message: {
          id: `${pluginId/* default */.Z}.config.updated`,
          defaultMessage: "Configuration updated"
        }
      });
    } catch (error) {
      console.error(error);
      toggleNotification({
        type: "warning",
        message: {
          id: `${pluginId/* default */.Z}.error`,
          defaultMessage: "An error occurred"
        }
      });
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ react.createElement(Box/* Box */.x, { background: "neutral100" }, /* @__PURE__ */ react.createElement(Layout/* Layout */.A, null, /* @__PURE__ */ react.createElement(Main/* Main */.o, { "aria-busy": isLoading }, /* @__PURE__ */ react.createElement(
    HeaderLayout/* HeaderLayout */.T,
    {
      primaryAction: /* @__PURE__ */ react.createElement(
        Button/* Button */.z,
        {
          startIcon: /* @__PURE__ */ react.createElement(Check/* default */.Z, null),
          loading: isLoading,
          disabled: errorOccurred || !madeChanges,
          onClick: handleSave
        },
        "Save"
      ),
      title: "Google Maps Configuration",
      subtitle: "Configure your Google Maps API key and other settings"
    }
  ), /* @__PURE__ */ react.createElement(ContentLayout/* ContentLayout */.D, null, errorOccurred ? /* @__PURE__ */ react.createElement(
    helper_plugin_esm/* AnErrorOccurred */.Hn,
    {
      content: {
        id: `${pluginId/* default */.Z}.error`,
        defaultMessage: "An error occurred"
      }
    }
  ) : isLoading ? /* @__PURE__ */ react.createElement("div", { style: { display: "flex", justifyContent: "center" } }, /* @__PURE__ */ react.createElement(Loader/* Loader */.a, null, "Loading content...")) : /* @__PURE__ */ react.createElement(
    Box/* Box */.x,
    {
      shadow: "tableShadow",
      background: "neutral0",
      paddingTop: 6,
      paddingLeft: 7,
      paddingRight: 7,
      paddingBottom: 6,
      hasRadius: true
    },
    /* @__PURE__ */ react.createElement(
      TextInput/* TextInput */.o,
      {
        type: "password",
        id: "apiKey",
        name: "apiKey",
        placeholder: "Paste your Google Maps API key here",
        label: "API Key",
        value: data.googleMapsKey,
        onChange: (e) => {
          setData({ ...data, googleMapsKey: e.target.value });
          setMadeChanges(true);
        }
      }
    ),
    /* @__PURE__ */ react.createElement(Grid/* Grid */.r, null, /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 5, padding: 2 }, /* @__PURE__ */ react.createElement(
      Link/* Link */.r,
      {
        href: "https://developers.google.com/maps/documentation/javascript/cloud-setup",
        isExternal: true
      },
      "Get your Google Maps API key"
    )), /* @__PURE__ */ react.createElement(GridItem/* GridItem */.P, { col: 5, padding: 2 }, /* @__PURE__ */ react.createElement(
      Link/* Link */.r,
      {
        href: "https://developers.google.com/maps/documentation/javascript/places",
        isExternal: true
      },
      "Grant your API key access to the Google Places API"
    )))
  )))));
};
/* harmony default export */ const components_Settings = (Settings);

;// CONCATENATED MODULE: ./node_modules/@amicaldo/strapi-google-maps/admin/src/pages/Settings/index.tsx




const permissions = [{ action: `plugin::${pluginId/* default */.Z}.config`, subject: null }];
const SettingsPage = () => {
  return /* @__PURE__ */ react.createElement(helper_plugin_esm/* CheckPagePermissions */.O4, { permissions }, /* @__PURE__ */ react.createElement(components_Settings, null));
};
/* harmony default export */ const pages_Settings = (SettingsPage);


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

/***/ 49066:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41580);


const d = ({ children: t }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Box_Box_js__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .x, { paddingLeft: 10, paddingRight: 10, children: t });



/***/ }),

/***/ 53979:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  T: () => (/* binding */ HeaderLayout_b)
});

// UNUSED EXPORTS: BaseHeaderLayout

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(85893);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(71997);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useElementOnScreen.js

const b = (t) => {
  const e = (0,react.useRef)(null), [s, c] = (0,react.useState)(!0), i = ([n]) => {
    c(n.isIntersecting);
  };
  return (0,react.useEffect)(() => {
    const n = e.current, r = new IntersectionObserver(i, t);
    return n && r.observe(e.current), () => {
      n && r.disconnect();
    };
  }, [e, t]), [e, s];
};


// EXTERNAL MODULE: ./node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var dist = __webpack_require__(79698);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/hooks/useResizeObserver.js


const c = (e, i) => {
  const t = (0,dist/* useCallbackRef */.W)(i);
  (0,react.useLayoutEffect)(() => {
    const r = new ResizeObserver(t);
    return Array.isArray(e) ? e.forEach((n) => {
      n.current && r.observe(n.current);
    }) : e.current && r.observe(e.current), () => {
      r.disconnect();
    };
  }, [e, t]);
};


// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(11047);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Typography/Typography.js + 2 modules
var Typography = __webpack_require__(75515);
;// CONCATENATED MODULE: ./node_modules/@strapi/design-system/dist/Layout/HeaderLayout.js








const HeaderLayout_b = (r) => {
  const t = (0,react.useRef)(null), [i, d] = (0,react.useState)(null), [a, h] = b({
    root: null,
    rootMargin: "0px",
    threshold: 0
  });
  return c(a, () => {
    a.current && d(a.current.getBoundingClientRect());
  }), (0,react.useEffect)(() => {
    t.current && d(t.current.getBoundingClientRect());
  }, [t]), (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, { children: [(0,jsx_runtime.jsx)("div", { style: { height: i?.height }, ref: a, children: h && (0,jsx_runtime.jsx)(p, { ref: t, ...r }) }), !h && (0,jsx_runtime.jsx)(p, { ...r, sticky: !0, width: i?.width })] });
};
HeaderLayout_b.displayName = "HeaderLayout";
const C = (0,styled_components_browser_esm/* default */.ZP)((0,Box/* Box */.x))`
  width: ${({ width: r }) => r ? `${r / 16}rem` : void 0};
  z-index: ${({ theme: r }) => r.zIndices[1]};
`, p = react.forwardRef(({ navigationAction: r, primaryAction: t, secondaryAction: i, subtitle: d, title: a, sticky: h, width: c, ...s }, g) => {
  const f = typeof d == "string";
  return h ? (0,jsx_runtime.jsx)(C, { paddingLeft: 6, paddingRight: 6, paddingTop: 3, paddingBottom: 3, position: "fixed", top: 0, right: 0, background: "neutral0", shadow: "tableShadow", width: c, "data-strapi-header-sticky": !0, children: (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { children: [r && (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingRight: 3, children: r }), (0,jsx_runtime.jsxs)(Box/* Box */.x, { children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "beta", as: "h1", ...s, children: a }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "pi", textColor: "neutral600", children: d }) : d] }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), (0,jsx_runtime.jsx)(Flex/* Flex */.k, { children: t ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 2, children: t }) : void 0 })] }) }) : (0,jsx_runtime.jsxs)(Box/* Box */.x, { ref: g, paddingLeft: 10, paddingRight: 10, paddingBottom: 8, paddingTop: r ? 6 : 8, background: "neutral100", "data-strapi-header": !0, children: [r ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingBottom: 2, children: r }) : null, (0,jsx_runtime.jsxs)(Flex/* Flex */.k, { justifyContent: "space-between", children: [(0,jsx_runtime.jsxs)(Flex/* Flex */.k, { minWidth: 0, children: [(0,jsx_runtime.jsx)(Typography/* Typography */.Z, { as: "h1", variant: "alpha", ...s, children: a }), i ? (0,jsx_runtime.jsx)(Box/* Box */.x, { paddingLeft: 4, children: i }) : null] }), t] }), f ? (0,jsx_runtime.jsx)(Typography/* Typography */.Z, { variant: "epsilon", textColor: "neutral600", as: "p", children: d }) : d] });
});



/***/ }),

/***/ 17034:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71997);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41580);



const d = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  display: grid;
  grid-template-columns: ${({ hasSideNav: o }) => o ? "auto 1fr" : "1fr"};
`, m = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  overflow-x: hidden;
`, f = ({ sideNav: o, children: e }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(d, { hasSideNav: !!o, children: [o, (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(m, { paddingBottom: 10, children: e })] });



/***/ }),

/***/ 185:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   o: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71997);
/* harmony import */ var _Box_Box_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(41580);



const a = (0,styled_components__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)((0,_Box_Box_js__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .x))`
  // To prevent global outline on focus visible to force an outline when Main is focused
  &:focus-visible {
    outline: none;
  }
`, m = ({ labelledBy: o = "main-content-title", ...n }) => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(a, { "aria-labelledby": o, as: "main", id: "main-content", tabIndex: -1, ...n });



/***/ })

}]);