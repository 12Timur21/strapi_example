"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[3710],{

/***/ 23710:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ROUTES_EE: () => (/* binding */ ROUTES_EE)
/* harmony export */ });
const ROUTES_EE = [
  ...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) ? [
    {
      async Component() {
        const component = await __webpack_require__.e(/* import() | audit-logs-settings-page */ 2812).then(__webpack_require__.bind(__webpack_require__, 35915));
        return component;
      },
      to: "/settings/audit-logs",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) ? [
    {
      async Component() {
        const component = await Promise.all(/* import() | review-workflows-settings */[__webpack_require__.e(3783), __webpack_require__.e(5862), __webpack_require__.e(8155)]).then(__webpack_require__.bind(__webpack_require__, 97259));
        return component;
      },
      to: "/settings/review-workflows",
      exact: true
    }
  ] : [],
  ...window.strapi.features.isEnabled(window.strapi.features.SSO) ? [
    {
      async Component() {
        const component = await __webpack_require__.e(/* import() | sso-settings-page */ 302).then(__webpack_require__.bind(__webpack_require__, 40316));
        return component;
      },
      to: "/settings/single-sign-on",
      exact: true
    }
  ] : []
];


/***/ })

}]);