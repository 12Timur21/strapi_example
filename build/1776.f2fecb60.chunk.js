"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[1776],{

/***/ 61776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FieldActionWrapper: () => (/* binding */ FieldActionWrapper),
  "default": () => (/* binding */ Uuid_UuidInput)
});

// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldAction.js
var FieldAction = __webpack_require__(25752);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/Field.js
var Field = __webpack_require__(54574);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldLabel.js + 1 modules
var FieldLabel = __webpack_require__(19270);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldInput.js
var FieldInput = __webpack_require__(45377);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldHint.js
var FieldHint = __webpack_require__(63428);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Field/FieldError.js
var FieldError = __webpack_require__(96404);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Flex/Flex.js
var Flex = __webpack_require__(11047);
// EXTERNAL MODULE: ./node_modules/@strapi/icons/dist/Refresh.js
var Refresh = __webpack_require__(30815);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-intl/lib/src/components/useIntl.js
var useIntl = __webpack_require__(86896);
// EXTERNAL MODULE: ./node_modules/@strapi/admin/node_modules/styled-components/dist/styled-components.browser.esm.js + 4 modules
var styled_components_browser_esm = __webpack_require__(71997);
;// CONCATENATED MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/node_modules/uuid/dist/esm-browser/native.js
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const esm_browser_native = ({
  randomUUID
});

;// CONCATENATED MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/node_modules/uuid/dist/esm-browser/rng.js
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

;// CONCATENATED MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/node_modules/uuid/dist/esm-browser/stringify.js

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  if (!validate(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
/* harmony default export */ const esm_browser_stringify = ((/* unused pure expression or super */ null && (stringify)));

;// CONCATENATED MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  if (esm_browser_native.randomUUID && !buf && !options) {
    return esm_browser_native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
/* harmony default export */ const esm_browser_v4 = (v4);

// EXTERNAL MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/admin/src/utils/getTrad.js
var getTrad = __webpack_require__(40124);
;// CONCATENATED MODULE: ./node_modules/@bn-digital/strapi-plugin-field-uuid/admin/src/components/Uuid/UuidInput/index.js










const FieldActionWrapper = (0,styled_components_browser_esm/* default */.ZP)((0,FieldAction/* FieldAction */.E))`
  svg {
    height: 1rem;
    width: 1rem;

    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const UuidGenerateButton = ({ onClick, label }) => /* @__PURE__ */ react.createElement(FieldActionWrapper, { onClick, label }, /* @__PURE__ */ react.createElement(Refresh/* default */.Z, null));
const UuidInput = ({
  description,
  placeholder,
  disabled = true,
  intlLabel,
  error,
  labelAction,
  name,
  required = true,
  value: initialValue,
  onChange
}) => {
  const { formatMessage } = (0,useIntl/* default */.Z)();
  const [value, setValue] = (0,react.useState)(initialValue ?? esm_browser_v4());
  const ref = (0,react.useRef)(null);
  (0,react.useEffect)(() => {
    if (ref?.current) {
      ref.current.value = value;
    }
  }, [value]);
  return /* @__PURE__ */ react.createElement(Box/* Box */.x, null, /* @__PURE__ */ react.createElement(Field/* Field */.g, { id: name, name, hint: description && formatMessage(description), error }, /* @__PURE__ */ react.createElement(Flex/* Flex */.k, { direction: "column", alignItems: "stretch", gap: 1 }, /* @__PURE__ */ react.createElement(FieldLabel/* FieldLabel */.Q, { action: labelAction }, formatMessage(intlLabel)), /* @__PURE__ */ react.createElement(
    FieldInput/* FieldInput */._,
    {
      ref,
      defaultValue: initialValue,
      placeholder,
      disabled,
      requried: required,
      onChange,
      value,
      endAction: !disabled ? /* @__PURE__ */ react.createElement(
        UuidGenerateButton,
        {
          onClick: () => setValue(esm_browser_v4()),
          label: formatMessage({
            id: (0,getTrad/* default */.Z)("form.field.generate"),
            defaultMessage: "Generate"
          })
        }
      ) : null
    }
  ), /* @__PURE__ */ react.createElement(FieldHint/* FieldHint */.J, null), /* @__PURE__ */ react.createElement(FieldError/* FieldError */.c, null))));
};
/* harmony default export */ const Uuid_UuidInput = (UuidInput);


/***/ })

}]);