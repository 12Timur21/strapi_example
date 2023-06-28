"use strict";
(self["webpackChunkstrapi_example"] = self["webpackChunkstrapi_example"] || []).push([[5862],{

/***/ 27887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  r: () => (/* reexport */ DragLayer)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/@strapi/design-system/dist/Box/Box.js
var Box = __webpack_require__(41580);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(45697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-dnd/dist/cjs/index.js
var cjs = __webpack_require__(99168);
;// CONCATENATED MODULE: ./.cache/admin/src/components/DragLayer/DragLayer.js




function getStyle(initialOffset, currentOffset, mouseOffset) {
  if (!initialOffset || !currentOffset) {
    return { display: "none" };
  }
  const { x, y } = mouseOffset;
  return {
    transform: `translate(${x}px, ${y}px)`
  };
}
function DragLayer({ renderItem }) {
  const { itemType, isDragging, item, initialOffset, currentOffset, mouseOffset } = (0,cjs.useDragLayer)(
    (monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
      mouseOffset: monitor.getClientOffset()
    })
  );
  if (!isDragging) {
    return null;
  }
  return /* @__PURE__ */ react.createElement(
    Box/* Box */.x,
    {
      height: "100%",
      left: 0,
      position: "fixed",
      pointerEvents: "none",
      top: 0,
      zIndex: 100,
      width: "100%"
    },
    /* @__PURE__ */ react.createElement(Box/* Box */.x, { style: getStyle(initialOffset, currentOffset, mouseOffset) }, renderItem({ type: itemType, item }))
  );
}
DragLayer.propTypes = {
  renderItem: (prop_types_default()).func.isRequired
};

;// CONCATENATED MODULE: ./.cache/admin/src/components/DragLayer/index.js



/***/ }),

/***/ 99781:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

const WysiwygContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)();
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (WysiwygContext)));


/***/ }),

/***/ 75642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PL: () => (/* reexport */ hooks_useContentTypeLayout),
  Y9: () => (/* reexport */ useDragAndDrop/* useDragAndDrop */.Y),
  zE: () => (/* reexport */ hooks_useFetchContentTypeLayout),
  Ky: () => (/* reexport */ hooks_useFindRedirectionLink),
  fi: () => (/* reexport */ hooks_usePluginsQueryParams),
  zH: () => (/* reexport */ usePrev),
  r5: () => (/* reexport */ hooks_useSyncRbac)
});

// UNUSED EXPORTS: useKeyboardDragAndDrop, useWysiwyg

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(67294);
// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 21 modules
var es = __webpack_require__(86706);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/pages/EditViewLayoutManager/selectors.js
var selectors = __webpack_require__(21323);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useContentTypeLayout/index.js



const useContentTypeLayout = () => {
  const currentLayout = (0,es/* useSelector */.v9)(selectors/* default */.Z);
  const getComponentLayout = (0,react.useCallback)(
    (componentUid) => {
      return currentLayout?.components?.[componentUid] ?? {};
    },
    [currentLayout]
  );
  return { ...currentLayout, getComponentLayout };
};
/* harmony default export */ const hooks_useContentTypeLayout = (useContentTypeLayout);

// EXTERNAL MODULE: ./.cache/admin/src/content-manager/hooks/useDragAndDrop.js
var useDragAndDrop = __webpack_require__(15699);
// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 24 modules
var helper_plugin_esm = __webpack_require__(52176);
// EXTERNAL MODULE: ./node_modules/axios/lib/axios.js + 40 modules
var axios = __webpack_require__(52861);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/pages/App/selectors.js
var App_selectors = __webpack_require__(84668);
// EXTERNAL MODULE: ./node_modules/immer/dist/immer.esm.js
var immer_esm = __webpack_require__(18172);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFetchContentTypeLayout/reducer.js

const initialState = {
  error: null,
  isLoading: true,
  layout: {},
  layouts: {}
};
const reducer = (state, action) => (0,immer_esm/* default */.ZP)(state, (draftState) => {
  switch (action.type) {
    case "GET_DATA": {
      draftState.isLoading = true;
      draftState.error = null;
      draftState.layout = {};
      break;
    }
    case "GET_DATA_SUCCEEDED": {
      const contentTypeUid = action.data.contentType.uid;
      draftState.layout = action.data;
      draftState.layouts[contentTypeUid] = action.data;
      draftState.isLoading = false;
      break;
    }
    case "GET_DATA_ERROR": {
      draftState.isLoading = false;
      draftState.error = action.error;
      break;
    }
    case "SET_LAYOUT_FROM_STATE": {
      draftState.error = null;
      draftState.layout = state.layouts[action.uid];
      break;
    }
    case "UPDATE_LAYOUT": {
      const oldLayout = state.layout;
      draftState.layout = {
        ...oldLayout,
        contentType: { uid: oldLayout.contentType.uid, ...action.newLayout.contentType }
      };
      draftState.layouts[oldLayout.contentType.uid] = {
        ...oldLayout,
        contentType: { uid: oldLayout.contentType.uid, ...action.newLayout.contentType }
      };
      break;
    }
    default:
      return draftState;
  }
});
/* harmony default export */ const useFetchContentTypeLayout_reducer = (reducer);

// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(50361);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
// EXTERNAL MODULE: ./node_modules/lodash/get.js
var get = __webpack_require__(27361);
var get_default = /*#__PURE__*/__webpack_require__.n(get);
// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__(36968);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/index.js + 12 modules
var utils = __webpack_require__(13920);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFetchContentTypeLayout/utils/formatLayouts.js




const getRelationModel = (targetModel, models) => models.find((model) => model.uid === targetModel);
const formatLayouts = (initialData, models) => {
  const data = createMetasSchema(initialData, models);
  const formattedCTEditLayout = formatLayoutWithMetas(data.contentType, models);
  const formattedListLayout = formatListLayoutWithMetas(data.contentType, data.components);
  set_default()(data, ["contentType", "layouts", "edit"], formattedCTEditLayout);
  set_default()(data, ["contentType", "layouts", "list"], formattedListLayout);
  Object.keys(data.components).forEach((componentUid) => {
    const formattedComponentEditLayout = formatLayoutWithMetas(
      data.components[componentUid],
      models
    );
    set_default()(data, ["components", componentUid, "layouts", "edit"], formattedComponentEditLayout);
  });
  return data;
};
const createMetasSchema = (initialData, models) => {
  const data = (0,utils/* mergeMetasWithSchema */.w8)(cloneDeep_default()(initialData), models, "contentType");
  const { components, contentType } = data;
  const formatMetadatas = (targetSchema) => {
    return Object.keys(targetSchema.metadatas).reduce((acc, current) => {
      const schema = get_default()(targetSchema, ["attributes", current], {});
      let metadatas = targetSchema.metadatas[current];
      if (schema.type === "relation") {
        const relationModel = getRelationModel(schema.targetModel, models);
        const mainFieldName = metadatas.edit.mainField;
        const mainField = {
          name: mainFieldName,
          schema: get_default()(relationModel, ["attributes", mainFieldName])
        };
        metadatas = {
          list: {
            ...metadatas.list,
            mainField
          },
          edit: {
            ...metadatas.edit,
            mainField
          }
        };
      }
      acc[current] = metadatas;
      return acc;
    }, {});
  };
  set_default()(data, ["contentType", "metadatas"], formatMetadatas(contentType));
  Object.keys(components).forEach((compoUID) => {
    const currentCompo = components[compoUID];
    const updatedMetas = formatMetadatas(currentCompo);
    set_default()(data, ["components", compoUID, "metadatas"], updatedMetas);
  });
  return data;
};
const formatLayoutWithMetas = (contentTypeConfiguration, models) => contentTypeConfiguration.layouts.edit.reduce((acc, current) => {
  const row = current.map((attribute) => {
    const fieldSchema = get_default()(contentTypeConfiguration, ["attributes", attribute.name], {});
    const data = {
      ...attribute,
      fieldSchema,
      metadatas: get_default()(contentTypeConfiguration, ["metadatas", attribute.name, "edit"], {})
    };
    if (fieldSchema.type === "relation") {
      const targetModelSchema = getRelationModel(fieldSchema.targetModel, models);
      const targetModelPluginOptions = targetModelSchema.pluginOptions || {};
      set_default()(data, "targetModelPluginOptions", targetModelPluginOptions);
      set_default()(data, "queryInfos", {
        shouldDisplayRelationLink: shouldDisplayRelationLink(
          contentTypeConfiguration,
          attribute.name,
          models
        )
      });
    }
    return data;
  });
  acc.push(row);
  return acc;
}, []);
const formatListLayoutWithMetas = (contentTypeConfiguration, components) => {
  const formatted = contentTypeConfiguration.layouts.list.reduce((acc, current) => {
    const fieldSchema = get_default()(contentTypeConfiguration, ["attributes", current], {});
    const metadatas = get_default()(contentTypeConfiguration, ["metadatas", current, "list"], {});
    const type = fieldSchema.type;
    if (type === "relation") {
      acc.push({ key: `__${current}_key__`, name: current, fieldSchema, metadatas });
      return acc;
    }
    if (type === "component") {
      const component = components[fieldSchema.component];
      const mainFieldName = component.settings.mainField;
      const mainFieldAttribute = component.attributes[mainFieldName];
      acc.push({
        key: `__${current}_key__`,
        name: current,
        fieldSchema,
        metadatas: {
          ...metadatas,
          mainField: {
            ...mainFieldAttribute,
            name: mainFieldName
          }
        }
      });
      return acc;
    }
    acc.push({ key: `__${current}_key__`, name: current, fieldSchema, metadatas });
    return acc;
  }, []);
  return formatted;
};
const shouldDisplayRelationLink = (contentTypeConfiguration, fieldName, models) => {
  const targetModel = get_default()(contentTypeConfiguration, ["attributes", fieldName, "targetModel"], "");
  return getDisplayedModels(models).includes(targetModel);
};
const getDisplayedModels = (models) => models.filter((model) => model.isDisplayed).map(({ uid }) => uid);
/* harmony default export */ const utils_formatLayouts = (formatLayouts);


;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFetchContentTypeLayout/index.js







const useFetchContentTypeLayout = (contentTypeUID) => {
  const [{ error, isLoading, layout, layouts }, dispatch] = (0,react.useReducer)(useFetchContentTypeLayout_reducer, initialState);
  const schemasSelector = (0,react.useMemo)(App_selectors/* makeSelectModelAndComponentSchemas */.Vo, []);
  const { schemas } = (0,es/* useSelector */.v9)((state) => schemasSelector(state), es/* shallowEqual */.wU);
  const isMounted = (0,react.useRef)(true);
  const { get } = (0,helper_plugin_esm/* useFetchClient */.kY)();
  const getData = (0,react.useCallback)(
    async (uid, source) => {
      if (layouts[uid]) {
        dispatch({ type: "SET_LAYOUT_FROM_STATE", uid });
        return;
      }
      dispatch({ type: "GET_DATA" });
      try {
        const {
          data: { data }
        } = await get(`/content-manager/content-types/${uid}/configuration`, {
          cancelToken: source.token
        });
        dispatch({
          type: "GET_DATA_SUCCEEDED",
          data: utils_formatLayouts(data, schemas)
        });
      } catch (error2) {
        if (axios["default"].isCancel(error2)) {
          return;
        }
        if (isMounted.current) {
          console.error(error2);
        }
        if (isMounted.current) {
          dispatch({ type: "GET_DATA_ERROR", error: error2 });
        }
      }
    },
    [layouts, schemas, get]
  );
  (0,react.useEffect)(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  (0,react.useEffect)(() => {
    const CancelToken = axios["default"].CancelToken;
    const source = CancelToken.source();
    getData(contentTypeUID, source);
    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [contentTypeUID, getData]);
  const updateLayout = (0,react.useCallback)(
    (data) => {
      dispatch({
        type: "UPDATE_LAYOUT",
        newLayout: utils_formatLayouts(data, schemas)
      });
    },
    [schemas]
  );
  return {
    error,
    isLoading,
    layout,
    updateLayout
  };
};
/* harmony default export */ const hooks_useFetchContentTypeLayout = (useFetchContentTypeLayout);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFindRedirectionLink/selectors.js
const selectMenuLinks = (state) => {
  const cmState = state["content-manager_app"];
  return cmState.collectionTypeLinks;
};
/* harmony default export */ const useFindRedirectionLink_selectors = (selectMenuLinks);

// EXTERNAL MODULE: ./node_modules/lodash/isObject.js
var isObject = __webpack_require__(13218);
var isObject_default = /*#__PURE__*/__webpack_require__.n(isObject);
// EXTERNAL MODULE: ./node_modules/qs/lib/index.js
var lib = __webpack_require__(80129);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFindRedirectionLink/utils/getRedirectionLink.js



const mergeParams = (initialParams, params) => {
  return Object.keys(initialParams).reduce((acc, current) => {
    const intialValue = initialParams[current];
    const nextValue = get_default()(params, [current], intialValue);
    if (isObject_default()(intialValue)) {
      return { ...acc, [current]: mergeParams(intialValue, nextValue) };
    }
    acc[current] = nextValue;
    return acc;
  }, {});
};
const getRedirectionLink = (links, slug, rawQuery) => {
  const matchingLink = links.find(({ to: to2 }) => to2.includes(slug));
  if (!matchingLink) {
    return "/";
  }
  const { to, search } = matchingLink;
  const searchQueryParams = (0,lib.parse)(search);
  const currentQueryParams = (0,lib.parse)(rawQuery.substring(1));
  const mergedParams = mergeParams(searchQueryParams, currentQueryParams);
  const link = `${to}?${(0,lib.stringify)(mergedParams, { encode: false })}`;
  return link;
};
/* harmony default export */ const utils_getRedirectionLink = (getRedirectionLink);


;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useFindRedirectionLink/index.js




const useFindRedirectionLink = (slug) => {
  const [{ rawQuery }] = (0,helper_plugin_esm/* useQueryParams */.Kx)();
  const collectionTypesMenuLinks = (0,es/* useSelector */.v9)(useFindRedirectionLink_selectors);
  const redirectionLink = utils_getRedirectionLink(collectionTypesMenuLinks, slug, rawQuery);
  return redirectionLink;
};
/* harmony default export */ const hooks_useFindRedirectionLink = (useFindRedirectionLink);

// EXTERNAL MODULE: ./.cache/admin/src/content-manager/hooks/useKeyboardDragAndDrop.js
var useKeyboardDragAndDrop = __webpack_require__(40703);
// EXTERNAL MODULE: ./node_modules/react-router/esm/react-router.js
var react_router = __webpack_require__(16550);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/usePluginsQueryParams/index.js


const usePluginsQueryParams = () => {
  const { search } = (0,react_router/* useLocation */.TH)();
  const query = search ? (0,lib.parse)(search.substring(1)) : {};
  return query.plugins ? (0,lib.stringify)({ plugins: query.plugins }, { encode: false }) : "";
};
/* harmony default export */ const hooks_usePluginsQueryParams = (usePluginsQueryParams);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/usePrev.js

const usePrev = (value) => {
  const ref = (0,react.useRef)();
  (0,react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// EXTERNAL MODULE: ./.cache/admin/src/content-manager/hooks/useSyncRbac/constants.js
var constants = __webpack_require__(80015);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useSyncRbac/actions.js

const setPermissions = (permissions, plugins, containerName) => {
  return {
    type: constants/* SET_PERMISSIONS */.m,
    permissions,
    __meta__: {
      plugins,
      containerName
    }
  };
};
const resetPermissions = () => ({ type: constants/* RESET_PERMISSIONS */.Q });

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useSyncRbac/selectors.js
const selectPermissions = (state) => state["content-manager_rbacManager"].permissions;
const selectCollectionTypePermissions = (state) => state.rbacProvider.collectionTypesRelatedPermissions;

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useSyncRbac/index.js




const useSyncRbac = (query, collectionTypeUID, containerName = "listView") => {
  const collectionTypesRelatedPermissions = (0,es/* useSelector */.v9)(selectCollectionTypePermissions);
  const permissions = (0,es/* useSelector */.v9)(selectPermissions);
  const dispatch = (0,es/* useDispatch */.I0)();
  const relatedPermissions = collectionTypesRelatedPermissions[collectionTypeUID];
  (0,react.useEffect)(() => {
    if (relatedPermissions) {
      dispatch(setPermissions(relatedPermissions, query ? query.plugins : null, containerName));
      return () => {
        dispatch(resetPermissions());
      };
    }
    return () => {
    };
  }, [relatedPermissions, dispatch, query, containerName]);
  return permissions;
};
/* harmony default export */ const hooks_useSyncRbac = (useSyncRbac);

// EXTERNAL MODULE: ./.cache/admin/src/content-manager/contexts/Wysiwyg.js
var Wysiwyg = __webpack_require__(99781);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/useWysiwyg.js


const useWysiwyg = () => useContext(WysiwygContext);
/* harmony default export */ const hooks_useWysiwyg = ((/* unused pure expression or super */ null && (useWysiwyg)));

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/hooks/index.js











/***/ }),

/***/ 15699:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ useDragAndDrop)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(99168);
/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dnd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _useKeyboardDragAndDrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(40703);



const useDragAndDrop = (active, {
  type = "STRAPI_DND",
  index,
  item = {},
  onStart,
  onEnd,
  onGrabItem,
  onDropItem,
  onCancel,
  onMoveItem,
  dropSensitivity = "regular"
}) => {
  const objectRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [{ handlerId }, dropRef] = (0,react_dnd__WEBPACK_IMPORTED_MODULE_2__.useDrop)({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item2, monitor) {
      if (!objectRef.current) {
        return;
      }
      const dragIndex = item2.index;
      const newInd = index;
      if (dragIndex === newInd) {
        return;
      }
      if (dropSensitivity === "regular") {
        const hoverBoundingRect = objectRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < newInd && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > newInd && hoverClientY > hoverMiddleY) {
          return;
        }
      }
      onMoveItem(newInd, dragIndex);
      item2.index = newInd;
    }
  });
  const [{ isDragging }, dragRef, dragPreviewRef] = (0,react_dnd__WEBPACK_IMPORTED_MODULE_2__.useDrag)({
    type,
    item() {
      if (onStart) {
        onStart();
      }
      const { width } = objectRef.current?.getBoundingClientRect() ?? {};
      return { index, width, ...item };
    },
    end() {
      if (onEnd) {
        onEnd();
      }
    },
    canDrag: active,
    /**
     * This is for useful when the item is in a virtualized list.
     * However, if we don't have an ID then we want the libraries
     * defaults to take care of this.
     */
    isDragging: item.id ? (monitor) => {
      return item.id === monitor.getItem().id;
    } : void 0,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const handleKeyDown = (0,_useKeyboardDragAndDrop__WEBPACK_IMPORTED_MODULE_1__/* .useKeyboardDragAndDrop */ .A)(active, index, {
    onGrabItem,
    onDropItem,
    onCancel,
    onMoveItem
  });
  return [{ handlerId, isDragging, handleKeyDown }, objectRef, dropRef, dragRef, dragPreviewRef];
};


/***/ }),

/***/ 40703:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ useKeyboardDragAndDrop)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67294);

const useKeyboardDragAndDrop = (active, index, { onCancel, onDropItem, onGrabItem, onMoveItem }) => {
  const [isSelected, setIsSelected] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleMove = (movement) => {
    if (!isSelected) {
      return;
    }
    if (movement === "UP") {
      onMoveItem(index - 1, index);
    } else if (movement === "DOWN") {
      onMoveItem(index + 1, index);
    }
  };
  const handleDragClick = () => {
    if (isSelected) {
      if (onDropItem) {
        onDropItem(index);
      }
      setIsSelected(false);
    } else {
      if (onGrabItem) {
        onGrabItem(index);
      }
      setIsSelected(true);
    }
  };
  const handleCancel = () => {
    if (isSelected) {
      setIsSelected(false);
      if (onCancel) {
        onCancel(index);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (!active) {
      return;
    }
    if (e.key === "Tab" && !isSelected) {
      return;
    }
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "Enter":
        handleDragClick();
        break;
      case "Escape":
        handleCancel();
        break;
      case "ArrowDown":
      case "ArrowRight":
        handleMove("DOWN");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        handleMove("UP");
        break;
      default:
    }
  };
  return handleKeyDown;
};


/***/ }),

/***/ 84668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Jg: () => (/* binding */ selectFieldSizes),
/* harmony export */   KQ: () => (/* binding */ makeSelectModelLinks),
/* harmony export */   Vo: () => (/* binding */ makeSelectModelAndComponentSchemas),
/* harmony export */   Yg: () => (/* binding */ selectAppDomain)
/* harmony export */ });
/* unused harmony export makeSelectModels */
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20573);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14506);


const selectAppDomain = () => (state) => {
  return state["content-manager_app"] || _reducer__WEBPACK_IMPORTED_MODULE_0__/* .initialState */ .E;
};
const makeSelectApp = () => createSelector(selectAppDomain(), (substate) => {
  return substate;
});
const makeSelectModels = () => createSelector(selectAppDomain(), (state) => state.models);
const makeSelectModelLinks = () => (0,reselect__WEBPACK_IMPORTED_MODULE_1__/* .createSelector */ .P1)(selectAppDomain(), (state) => ({
  collectionTypeLinks: state.collectionTypeLinks,
  singleTypeLinks: state.singleTypeLinks
}));
const makeSelectModelAndComponentSchemas = () => (0,reselect__WEBPACK_IMPORTED_MODULE_1__/* .createSelector */ .P1)(selectAppDomain(), ({ components, models }) => ({
  schemas: [...components, ...models]
}));
const selectFieldSizes = (0,reselect__WEBPACK_IMPORTED_MODULE_1__/* .createSelector */ .P1)(selectAppDomain(), (state) => state.fieldSizes);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (makeSelectApp)));



/***/ }),

/***/ 21323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const selectLayout = (state) => state["content-manager_editViewLayoutManager"].currentLayout;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectLayout);


/***/ }),

/***/ 56723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  COMPONENT: "component",
  EDIT_FIELD: "editField",
  FIELD: "field",
  DYNAMIC_ZONE: "dynamicZone",
  RELATION: "relation"
});


/***/ }),

/***/ 69881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getTrad = (id) => `content-manager.${id}`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getTrad);


/***/ }),

/***/ 13920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  _Q: () => (/* reexport */ ItemTypes/* default */.Z),
  W3: () => (/* reexport */ utils_arrayMoveItem),
  ko: () => (/* reexport */ utils_checkIfAttributeIsDisplayable),
  FE: () => (/* reexport */ composeRefs),
  Di: () => (/* reexport */ utils_createDefaultForm),
  Ex: () => (/* reexport */ schema),
  du: () => (/* reexport */ utils_formatLayoutToApi),
  TA: () => (/* reexport */ utils_generatePermissionsObject),
  Ts: () => (/* reexport */ utils_getFieldName),
  Uo: () => (/* reexport */ utils_getMaxTempKey),
  IF: () => (/* reexport */ utils_getRequestUrl),
  OB: () => (/* reexport */ getTrad/* default */.Z),
  w8: () => (/* reexport */ utils_mergeMetasWithSchema),
  kc: () => (/* reexport */ utils_removePasswordFieldsFromData)
});

// UNUSED EXPORTS: removeKeyInObject

// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__(50361);
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/arrayMoveItem.js

const arrayMoveItem = (arr, from, to) => {
  if (Array.isArray(arr) && from >= 0 && to >= 0 && from <= arr.length - 1 && to <= arr.length - 1) {
    const newArray = cloneDeep_default()(arr);
    const item = newArray.splice(from, 1);
    newArray.splice(to, 0, item[0]);
    return newArray;
  }
  return arr;
};
/* harmony default export */ const utils_arrayMoveItem = (arrayMoveItem);

// EXTERNAL MODULE: ./node_modules/lodash/toLower.js
var toLower = __webpack_require__(7334);
var toLower_default = /*#__PURE__*/__webpack_require__.n(toLower);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/checkIfAttributeIsDisplayable.js

const checkIfAttributeIsDisplayable = (attribute) => {
  const type = attribute.type;
  if (type === "relation") {
    return !toLower_default()(attribute.relationType).includes("morph");
  }
  return !["json", "dynamiczone", "richtext", "password"].includes(type) && !!type;
};
/* harmony default export */ const utils_checkIfAttributeIsDisplayable = (checkIfAttributeIsDisplayable);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/composeRefs.js
const setRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
};
const composeRefs = (...refs) => {
  return (node) => refs.forEach((ref) => setRef(ref, node));
};

// EXTERNAL MODULE: ./node_modules/lodash/get.js
var get = __webpack_require__(27361);
var get_default = /*#__PURE__*/__webpack_require__.n(get);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/createDefaultForm.js

const createDefaultForm = (attributes, allComponentsSchema) => {
  return Object.keys(attributes).reduce((acc, current) => {
    const attribute = get_default()(attributes, [current], {});
    const { default: defaultValue, component, type, required, min, repeatable } = attribute;
    if (defaultValue !== void 0) {
      acc[current] = defaultValue;
    }
    if (type === "component") {
      const currentComponentSchema = allComponentsSchema?.[component]?.attributes ?? {};
      const currentComponentDefaultForm = createDefaultForm(
        currentComponentSchema,
        allComponentsSchema
      );
      if (required === true) {
        acc[current] = repeatable === true ? [] : currentComponentDefaultForm;
      }
      if (min && repeatable === true && required) {
        acc[current] = [];
        for (let i = 0; i < min; i += 1) {
          acc[current].push(currentComponentDefaultForm);
        }
      }
    }
    if (type === "dynamiczone") {
      if (required === true) {
        acc[current] = [];
      }
    }
    return acc;
  }, {});
};
/* harmony default export */ const utils_createDefaultForm = (createDefaultForm);

// EXTERNAL MODULE: ./node_modules/lodash/omit.js
var omit = __webpack_require__(57557);
var omit_default = /*#__PURE__*/__webpack_require__.n(omit);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/formatLayoutToApi.js


const formatLayoutToApi = ({ layouts, metadatas, ...rest }) => {
  const list = layouts.list.map((obj) => {
    if (obj.name) {
      return obj.name;
    }
    return obj;
  });
  const formattedMetadatas = Object.keys(metadatas).reduce((acc, current) => {
    const currentMetadatas = get_default()(metadatas, [current], {});
    let editMetadatas = currentMetadatas.edit;
    if (editMetadatas.mainField) {
      editMetadatas = { ...editMetadatas, mainField: currentMetadatas.edit.mainField.name };
    }
    return {
      ...acc,
      [current]: {
        edit: editMetadatas,
        list: omit_default()(currentMetadatas.list, ["mainField"])
      }
    };
  }, {});
  const edit = layouts.edit.map(
    (row) => row.map(({ name, size }) => ({
      name,
      size
    }))
  );
  return {
    ...rest,
    layouts: { edit, list },
    metadatas: formattedMetadatas
  };
};
/* harmony default export */ const utils_formatLayoutToApi = (formatLayoutToApi);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/generatePermissionsObject.js
const addSubjectToPermissionsArray = (array, uid) => array.map((data) => ({ ...data, subject: uid }));
const generatePermissionsObject = (uid) => {
  const permissions = {
    create: [{ action: "plugin::content-manager.explorer.create", subject: null }],
    delete: [{ action: "plugin::content-manager.explorer.delete", subject: null }],
    publish: [{ action: "plugin::content-manager.explorer.publish", subject: null }],
    read: [{ action: "plugin::content-manager.explorer.read", subject: null }],
    update: [{ action: "plugin::content-manager.explorer.update", subject: null }]
  };
  return Object.keys(permissions).reduce((acc, current) => {
    acc[current] = addSubjectToPermissionsArray(permissions[current], uid);
    return acc;
  }, {});
};
/* harmony default export */ const utils_generatePermissionsObject = (generatePermissionsObject);


// EXTERNAL MODULE: ./node_modules/lodash/isNaN.js
var lodash_isNaN = __webpack_require__(7654);
var isNaN_default = /*#__PURE__*/__webpack_require__.n(lodash_isNaN);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/getFieldName.js

const getFieldName = (stringName) => stringName.split(".").filter((string) => isNaN_default()(parseInt(string, 10)));
/* harmony default export */ const utils_getFieldName = (getFieldName);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/getMaxTempKey.js
const getMaxTempKey = (arr) => {
  if (arr.length === 0) {
    return -1;
  }
  const maxTempKey = Math.max.apply(
    Math,
    arr.map((o) => o.__temp_key__ ?? 0)
  );
  return Number.isNaN(maxTempKey) ? -1 : maxTempKey;
};
/* harmony default export */ const utils_getMaxTempKey = (getMaxTempKey);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/getRequestUrl.js
const getRequestUrl = (path) => `/content-manager/${path}`;
/* harmony default export */ const utils_getRequestUrl = (getRequestUrl);

// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/getTrad.js
var getTrad = __webpack_require__(69881);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/ItemTypes.js
var ItemTypes = __webpack_require__(56723);
// EXTERNAL MODULE: ./node_modules/lodash/set.js
var set = __webpack_require__(36968);
var set_default = /*#__PURE__*/__webpack_require__.n(set);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/mergeMetasWithSchema.js

const mergeMetasWithSchema = (data, schemas, mainSchemaKey) => {
  const findSchema = (refUid) => schemas.find((obj) => obj.uid === refUid);
  const merged = Object.assign({}, data);
  const mainUID = data[mainSchemaKey].uid;
  const mainSchema = findSchema(mainUID);
  set_default()(merged, [mainSchemaKey], { ...data[mainSchemaKey], ...mainSchema });
  Object.keys(data.components).forEach((compoUID) => {
    const compoSchema = findSchema(compoUID);
    set_default()(merged, ["components", compoUID], { ...data.components[compoUID], ...compoSchema });
  });
  return merged;
};
/* harmony default export */ const utils_mergeMetasWithSchema = (mergeMetasWithSchema);

// EXTERNAL MODULE: ./node_modules/@strapi/helper-plugin/build/helper-plugin.esm.js + 24 modules
var helper_plugin_esm = __webpack_require__(52176);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/removePasswordFieldsFromData.js


const removePasswordFieldsFromData = (data, contentTypeSchema, componentSchema) => {
  const recursiveCleanData = (data2, schema) => {
    return Object.keys(data2).reduce((acc, current) => {
      const attrType = (0,helper_plugin_esm/* getType */.UN)(schema, current);
      const value = get_default()(data2, current);
      const component = (0,helper_plugin_esm/* getOtherInfos */.k2)(schema, [current, "component"]);
      const isRepeatable = (0,helper_plugin_esm/* getOtherInfos */.k2)(schema, [current, "repeatable"]);
      if (attrType === "dynamiczone") {
        acc[current] = value.map((componentValue) => {
          const subCleanedData = recursiveCleanData(
            componentValue,
            componentSchema[componentValue.__component]
          );
          return subCleanedData;
        });
        return acc;
      }
      if (attrType === "component") {
        if (isRepeatable) {
          acc[current] = value ? value.map((compoData) => {
            const subCleanedData = recursiveCleanData(compoData, componentSchema[component]);
            return subCleanedData;
          }) : value;
        } else {
          acc[current] = value ? recursiveCleanData(value, componentSchema[component]) : value;
        }
        return acc;
      }
      if (attrType !== "password") {
        acc[current] = value;
      }
      return acc;
    }, {});
  };
  return recursiveCleanData(data, contentTypeSchema);
};
/* harmony default export */ const utils_removePasswordFieldsFromData = (removePasswordFieldsFromData);

// EXTERNAL MODULE: ./node_modules/lodash/isBoolean.js
var isBoolean = __webpack_require__(51584);
var isBoolean_default = /*#__PURE__*/__webpack_require__.n(isBoolean);
// EXTERNAL MODULE: ./node_modules/lodash/isEmpty.js
var isEmpty = __webpack_require__(41609);
var isEmpty_default = /*#__PURE__*/__webpack_require__.n(isEmpty);
// EXTERNAL MODULE: ./node_modules/lodash/toNumber.js
var toNumber = __webpack_require__(14841);
var toNumber_default = /*#__PURE__*/__webpack_require__.n(toNumber);
// EXTERNAL MODULE: ./node_modules/yup/es/index.js + 26 modules
var es = __webpack_require__(87561);
// EXTERNAL MODULE: ./.cache/admin/src/content-manager/utils/isFieldTypeNumber.js
var isFieldTypeNumber = __webpack_require__(24056);
;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/schema.js








es/* addMethod */.kM(es/* mixed */.nK, "defined", function() {
  return this.test("defined", helper_plugin_esm/* translatedErrors */.I0.required, (value) => value !== void 0);
});
es/* addMethod */.kM(es/* array */.IX, "notEmptyMin", function(min) {
  return this.test("notEmptyMin", helper_plugin_esm/* translatedErrors */.I0.min, (value) => {
    if (isEmpty_default()(value)) {
      return true;
    }
    return value.length >= min;
  });
});
es/* addMethod */.kM(es/* string */.Z_, "isInferior", function(message, max) {
  return this.test("isInferior", message, function(value) {
    if (!value) {
      return true;
    }
    if (Number.isNaN(toNumber_default()(value))) {
      return true;
    }
    return toNumber_default()(max) >= toNumber_default()(value);
  });
});
es/* addMethod */.kM(es/* string */.Z_, "isSuperior", function(message, min) {
  return this.test("isSuperior", message, function(value) {
    if (!value) {
      return true;
    }
    if (Number.isNaN(toNumber_default()(value))) {
      return true;
    }
    return toNumber_default()(value) >= toNumber_default()(min);
  });
});
const getAttributes = (data) => get_default()(data, ["attributes"], {});
const createYupSchema = (model, { components }, options = { isCreatingEntry: true, isDraft: true, isFromComponent: false }) => {
  const attributes = getAttributes(model);
  return es/* object */.Ry().shape(
    Object.keys(attributes).reduce((acc, current) => {
      const attribute = attributes[current];
      if (attribute.type !== "relation" && attribute.type !== "component" && attribute.type !== "dynamiczone") {
        const formatted = createYupSchemaAttribute(attribute.type, attribute, options);
        acc[current] = formatted;
      }
      if (attribute.type === "relation") {
        acc[current] = [
          "oneWay",
          "oneToOne",
          "manyToOne",
          "oneToManyMorph",
          "oneToOneMorph"
        ].includes(attribute.relationType) ? es/* object */.Ry().nullable() : es/* array */.IX().nullable();
      }
      if (attribute.type === "component") {
        const componentFieldSchema = createYupSchema(
          components[attribute.component],
          {
            components
          },
          { ...options, isFromComponent: true }
        );
        if (attribute.repeatable === true) {
          const { min, max, required } = attribute;
          let componentSchema2 = es/* lazy */.Vo((value) => {
            let baseSchema = es/* array */.IX().of(componentFieldSchema);
            if (min) {
              if (required) {
                baseSchema = baseSchema.min(min, helper_plugin_esm/* translatedErrors */.I0.min);
              } else if (required !== true && isEmpty_default()(value)) {
                baseSchema = baseSchema.nullable();
              } else {
                baseSchema = baseSchema.min(min, helper_plugin_esm/* translatedErrors */.I0.min);
              }
            } else if (required && !options.isDraft) {
              baseSchema = baseSchema.min(1, helper_plugin_esm/* translatedErrors */.I0.required);
            }
            if (max) {
              baseSchema = baseSchema.max(max, helper_plugin_esm/* translatedErrors */.I0.max);
            }
            return baseSchema;
          });
          acc[current] = componentSchema2;
          return acc;
        }
        const componentSchema = es/* lazy */.Vo((obj) => {
          if (obj !== void 0) {
            return attribute.required === true && !options.isDraft ? componentFieldSchema.defined() : componentFieldSchema.nullable();
          }
          return attribute.required === true ? es/* object */.Ry().defined() : es/* object */.Ry().nullable();
        });
        acc[current] = componentSchema;
        return acc;
      }
      if (attribute.type === "dynamiczone") {
        let dynamicZoneSchema = es/* array */.IX().of(
          es/* lazy */.Vo(({ __component }) => {
            return createYupSchema(
              components[__component],
              { components },
              { ...options, isFromComponent: true }
            );
          })
        );
        const { max, min } = attribute;
        if (min) {
          if (attribute.required) {
            dynamicZoneSchema = dynamicZoneSchema.test("min", helper_plugin_esm/* translatedErrors */.I0.min, (value) => {
              if (options.isCreatingEntry) {
                return value && value.length >= min;
              }
              if (value === void 0) {
                return true;
              }
              return value !== null && value.length >= min;
            }).test("required", helper_plugin_esm/* translatedErrors */.I0.required, (value) => {
              if (options.isCreatingEntry) {
                return value !== null || value !== void 0;
              }
              if (value === void 0) {
                return true;
              }
              return value !== null;
            });
          } else {
            dynamicZoneSchema = dynamicZoneSchema.notEmptyMin(min);
          }
        } else if (attribute.required && !options.isDraft) {
          dynamicZoneSchema = dynamicZoneSchema.test("required", helper_plugin_esm/* translatedErrors */.I0.required, (value) => {
            if (options.isCreatingEntry) {
              return value !== null || value !== void 0;
            }
            if (value === void 0) {
              return true;
            }
            return value !== null;
          });
        }
        if (max) {
          dynamicZoneSchema = dynamicZoneSchema.max(max, helper_plugin_esm/* translatedErrors */.I0.max);
        }
        acc[current] = dynamicZoneSchema;
      }
      return acc;
    }, {})
  );
};
const createYupSchemaAttribute = (type, validations, options) => {
  let schema = es/* mixed */.nK();
  if (["string", "uid", "text", "richtext", "email", "password", "enumeration"].includes(type)) {
    schema = es/* string */.Z_();
  }
  if (type === "json") {
    schema = es/* mixed */.nK(helper_plugin_esm/* translatedErrors */.I0.json).test("isJSON", helper_plugin_esm/* translatedErrors */.I0.json, (value) => {
      if (!value || !value.length) {
        return true;
      }
      try {
        JSON.parse(value);
        return true;
      } catch (err) {
        return false;
      }
    }).nullable().test("required", helper_plugin_esm/* translatedErrors */.I0.required, (value) => {
      if (validations.required && (!value || !value.length)) {
        return false;
      }
      return true;
    });
  }
  if (type === "email") {
    schema = schema.email(helper_plugin_esm/* translatedErrors */.I0.email);
  }
  if (["number", "integer", "float", "decimal"].includes(type)) {
    schema = es/* number */.Rx().transform((cv) => isNaN_default()(cv) ? void 0 : cv).typeError();
  }
  if (type === "biginteger") {
    schema = es/* string */.Z_().matches(/^-?\d*$/);
  }
  if (["date", "datetime"].includes(type)) {
    schema = es/* date */.hT();
  }
  Object.keys(validations).forEach((validation) => {
    const validationValue = validations[validation];
    if (!!validationValue || !isBoolean_default()(validationValue) && Number.isInteger(Math.floor(validationValue)) || validationValue === 0) {
      switch (validation) {
        case "required": {
          if (!options.isDraft) {
            if (type === "password" && options.isCreatingEntry) {
              schema = schema.required(helper_plugin_esm/* translatedErrors */.I0.required);
            }
            if (type !== "password") {
              if (options.isCreatingEntry) {
                schema = schema.required(helper_plugin_esm/* translatedErrors */.I0.required);
              } else {
                schema = schema.test("required", helper_plugin_esm/* translatedErrors */.I0.required, (value) => {
                  if (value === void 0 && !options.isFromComponent) {
                    return true;
                  }
                  if ((0,isFieldTypeNumber/* default */.Z)(type)) {
                    if (value === 0) {
                      return true;
                    }
                    return !!value;
                  }
                  if (type === "boolean") {
                    return value !== null && value !== void 0;
                  }
                  if (type === "date" || type === "datetime") {
                    if (typeof value === "string") {
                      return !isEmpty_default()(value);
                    }
                    return !isEmpty_default()(value?.toString());
                  }
                  return !isEmpty_default()(value);
                });
              }
            }
          }
          break;
        }
        case "max": {
          if (type === "biginteger") {
            schema = schema.isInferior(helper_plugin_esm/* translatedErrors */.I0.max, validationValue);
          } else {
            schema = schema.max(validationValue, helper_plugin_esm/* translatedErrors */.I0.max);
          }
          break;
        }
        case "maxLength":
          schema = schema.max(validationValue, helper_plugin_esm/* translatedErrors */.I0.maxLength);
          break;
        case "min": {
          if (type === "biginteger") {
            schema = schema.isSuperior(helper_plugin_esm/* translatedErrors */.I0.min, validationValue);
          } else {
            schema = schema.min(validationValue, helper_plugin_esm/* translatedErrors */.I0.min);
          }
          break;
        }
        case "minLength": {
          if (!options.isDraft) {
            schema = schema.min(validationValue, helper_plugin_esm/* translatedErrors */.I0.minLength);
          }
          break;
        }
        case "regex":
          schema = schema.matches(new RegExp(validationValue), {
            message: helper_plugin_esm/* translatedErrors */.I0.regex,
            excludeEmptyString: !validations.required
          });
          break;
        case "lowercase":
          if (["text", "textarea", "email", "string"].includes(type)) {
            schema = schema.strict().lowercase();
          }
          break;
        case "uppercase":
          if (["text", "textarea", "email", "string"].includes(type)) {
            schema = schema.strict().uppercase();
          }
          break;
        case "positive":
          if ((0,isFieldTypeNumber/* default */.Z)(type)) {
            schema = schema.positive();
          }
          break;
        case "negative":
          if ((0,isFieldTypeNumber/* default */.Z)(type)) {
            schema = schema.negative();
          }
          break;
        default:
          schema = schema.nullable();
      }
    }
  });
  return schema;
};
/* harmony default export */ const schema = (createYupSchema);

;// CONCATENATED MODULE: ./.cache/admin/src/content-manager/utils/index.js

















/***/ }),

/***/ 24056:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ isFieldTypeNumber)
/* harmony export */ });
function isFieldTypeNumber(type) {
  return ["integer", "biginteger", "decimal", "float", "number"].includes(type);
}


/***/ }),

/***/ 53616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $k: () => (/* binding */ ACTION_UPDATE_STAGE_POSITION),
/* harmony export */   FT: () => (/* binding */ STAGE_COLOR_DEFAULT),
/* harmony export */   Nj: () => (/* binding */ ACTION_UPDATE_STAGE),
/* harmony export */   Ot: () => (/* binding */ ACTION_ADD_STAGE),
/* harmony export */   QM: () => (/* binding */ ACTION_SET_WORKFLOWS),
/* harmony export */   lv: () => (/* binding */ STAGE_COLORS),
/* harmony export */   sN: () => (/* binding */ REDUX_NAMESPACE),
/* harmony export */   uL: () => (/* binding */ DRAG_DROP_TYPES),
/* harmony export */   x4: () => (/* binding */ ACTION_DELETE_STAGE)
/* harmony export */ });
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42675);

const REDUX_NAMESPACE = "settings_review-workflows";
const ACTION_SET_WORKFLOWS = `Settings/Review_Workflows/SET_WORKFLOWS`;
const ACTION_DELETE_STAGE = `Settings/Review_Workflows/WORKFLOW_DELETE_STAGE`;
const ACTION_ADD_STAGE = `Settings/Review_Workflows/WORKFLOW_ADD_STAGE`;
const ACTION_UPDATE_STAGE = `Settings/Review_Workflows/WORKFLOW_UPDATE_STAGE`;
const ACTION_UPDATE_STAGE_POSITION = `Settings/Review_Workflows/WORKFLOW_UPDATE_STAGE_POSITION`;
const STAGE_COLORS = {
  primary600: "Blue",
  primary200: "Lilac",
  alternative600: "Violet",
  alternative200: "Lavender",
  success600: "Green",
  success200: "Pale Green",
  danger500: "Cherry",
  danger200: "Pink",
  warning600: "Orange",
  warning200: "Yellow",
  secondary600: "Teal",
  secondary200: "Baby Blue",
  neutral400: "Gray",
  neutral0: "White"
};
const STAGE_COLOR_DEFAULT = _strapi_design_system__WEBPACK_IMPORTED_MODULE_0__/* .lightTheme */ .W.colors.primary600;
const DRAG_DROP_TYPES = {
  STAGE: "stage"
};


/***/ }),

/***/ 53752:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ useReviewWorkflows)
/* harmony export */ });
/* harmony import */ var _strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52176);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(80129);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(88767);



function useReviewWorkflows(params = {}) {
  const { id = "", ...queryParams } = params;
  const defaultQueryParams = {
    populate: "stages"
  };
  const { get } = (0,_strapi_helper_plugin__WEBPACK_IMPORTED_MODULE_0__/* .useFetchClient */ .kY)();
  const queryString = (0,qs__WEBPACK_IMPORTED_MODULE_1__.stringify)({ ...defaultQueryParams, ...queryParams }, { encode: false });
  const { data, isLoading, status, refetch } = (0,react_query__WEBPACK_IMPORTED_MODULE_2__.useQuery)(
    ["review-workflows", "workflows", id],
    async () => {
      try {
        const {
          data: { data: data2 }
        } = await get(
          `/admin/review-workflows/workflows/${id}${queryString ? `?${queryString}` : ""}`
        );
        return data2;
      } catch (err) {
        return null;
      }
    }
  );
  let workflows = [];
  if (id && data) {
    workflows = [data];
  } else if (Array.isArray(data)) {
    workflows = data;
  }
  return {
    workflows,
    isLoading,
    status,
    refetch
  };
}


/***/ }),

/***/ 13037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   k: () => (/* binding */ getStageColorByHex),
/* harmony export */   s: () => (/* binding */ getAvailableStageColors)
/* harmony export */ });
/* harmony import */ var _strapi_design_system__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42675);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(53616);


function getStageColorByHex(hex) {
  if (!hex) {
    return null;
  }
  const themeColors = Object.entries(_strapi_design_system__WEBPACK_IMPORTED_MODULE_1__/* .lightTheme */ .W.colors).filter(
    ([, value]) => value.toUpperCase() === hex.toUpperCase()
  );
  const themeColorName = themeColors.reduce((acc, [name]) => {
    if (_constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv?.[name]) {
      acc = name;
    }
    return acc;
  }, null);
  if (!themeColorName) {
    return null;
  }
  return {
    themeColorName,
    name: _constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv[themeColorName]
  };
}
function getAvailableStageColors() {
  return Object.entries(_constants__WEBPACK_IMPORTED_MODULE_0__/* .STAGE_COLORS */ .lv).map(([themeColorName, name]) => ({
    hex: _strapi_design_system__WEBPACK_IMPORTED_MODULE_1__/* .lightTheme */ .W.colors[themeColorName].toUpperCase(),
    name
  }));
}


/***/ })

}]);