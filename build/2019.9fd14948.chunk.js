"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[2019],{

/***/ 52019:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LINKS_EE: () => (/* binding */ LINKS_EE)
/* harmony export */ });
/* harmony import */ var _admin_src_permissions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(87751);

const LINKS_EE = {
  global: [
    ...window.strapi.features.isEnabled(window.strapi.features.SSO) ? [
      {
        intlLabel: { id: "Settings.sso.title", defaultMessage: "Single Sign-On" },
        to: "/settings/single-sign-on",
        id: "sso",
        permissions: _admin_src_permissions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.settings.sso.main
      }
    ] : [],
    ...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS) ? [
      {
        intlLabel: {
          id: "Settings.review-workflows.page.title",
          defaultMessage: "Review Workflows"
        },
        to: "/settings/review-workflows",
        id: "review-workflows",
        permissions: _admin_src_permissions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.settings["review-workflows"].main
      }
    ] : []
  ],
  admin: [
    ...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS) ? [
      {
        intlLabel: { id: "global.auditLogs", defaultMessage: "Audit Logs" },
        to: "/settings/audit-logs?pageSize=50&page=1&sort=date:DESC",
        id: "auditLogs",
        permissions: _admin_src_permissions__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.settings.auditLogs.main
      }
    ] : []
  ]
};


/***/ })

}]);