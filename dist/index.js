import _extends from '@babel/runtime/helpers/extends';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import React from 'react';
import { DatePicker, Card, Form, Skeleton, Table, Button, Select, Input } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import PropTypes from 'prop-types';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var RangePicker = DatePicker.RangePicker,
    MonthPicker = DatePicker.MonthPicker;
var charCode = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

function noop() {}

function CusFormItem(form) {
  var _dec, _class, _temp;

  var injectFromItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!injectFromItem || injectFromItem.length === 0) return function () {
    return React.createElement("div", null, "\u914D\u7F6E\u9879\u5462\uFF1F");
  };
  var ContainerItem = (_dec = connect(), _dec(_class = (_temp =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(ContainerItem, _React$Component);

    function ContainerItem(props) {
      var _this;

      _classCallCheck(this, ContainerItem);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ContainerItem).call(this, props));

      _this.search = function (params) {
        var _this$props = _this.props,
            dispatch = _this$props.dispatch,
            actionType = _this$props.actionType;
        if (!actionType) return;
        dispatch({
          type: actionType,
          payload: {
            params: params.params
          }
        });
      };

      _this.isCharCode = function (key) {
        return charCode.indexOf(key) !== -1;
      };

      _this.kv = function (key) {
        var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var offset = charCode.indexOf(key);

        if (offset !== -1) {
          return _defineProperty({}, obj[charCode[offset - 1]], typeof obj[charCode[offset]] === "string" ? obj[charCode[offset]].trim() === "" ? undefined : obj[charCode[offset]] : obj[charCode[offset]]);
        }
      };

      _this.getParams = function (callback) {
        var beforeCallback = _this.props.beforeCallback;
        form.validateFields(function _callee(err, values) {
          var params, extendsParams, otherParams;
          return _regeneratorRuntime.async(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (err) {
                    _context.next = 10;
                    break;
                  }

                  params = {
                    offset: _this.offset,
                    limit: _this.limit
                  };
                  extendsParams = [];
                  Object.keys(values).map(function (key) {
                    if (key.indexOf("TIME") !== -1) {
                      var timeList = key.split("-").slice(1);
                      params = Object.assign(params, timeList.reduce(function (result, time, i) {
                        if (Array.isArray(values[key]) && !values[key].length) return result;
                        result[time] = values[key] && moment(Number(values[key][i])).unix();
                        return result;
                      }, {}));
                    } else if (_this.extendsParams[key]) {
                      // extendsParams = Object.assign(extendsParams, this.kv(key, values));
                      extendsParams.push(_this.kv(key, values));
                    } else if (!_this.isCharCode(key)) {
                      var value = typeof values[key] === "string" && values[key].trim() === "" ? undefined : values[key];
                      params = Object.assign(params, _defineProperty({}, key, value));
                    } else if (charCode.indexOf(key) % 2 === 1) {
                      params = Object.assign(params, _this.kv(key, values));
                    }
                  });
                  otherParams = {};

                  if (!beforeCallback) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 8;
                  return _regeneratorRuntime.awrap(beforeCallback({
                    extendsParams: extendsParams,
                    params: params
                  }));

                case 8:
                  otherParams = _context.sent;

                case 9:
                  callback(Object.assign({
                    params: _objectSpread({}, params, {}, otherParams),
                    extendsParams: extendsParams
                  }));

                case 10:
                case "end":
                  return _context.stop();
              }
            }
          });
        });
      };

      _this.offset = 0;
      _this.limit = 10;
      _this.extendsParams = {};
      return _this;
    }

    _createClass(ContainerItem, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.getParams(this.search);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var getFieldDecorator = form.getFieldDecorator,
            resetFields = form.resetFields;
        var indexOfCharCode = -1;

        var insertComponent = function insertComponent(ele) {
          var E = ele.type;
          var labelCtx = typeof (ele.label || "") === "string" ? ele.label : insertComponent(ele.label);
          indexOfCharCode += 1; // 配置项没有传ID 从charCode里面分配

          var id = ele.id || charCode[indexOfCharCode];

          if (id === ele.id) {
            indexOfCharCode -= 1;
          }

          if (ele.extendsParams) _this2.extendsParams[id] = true;

          switch (E) {
            // TODO
            case "Input":
              return React.createElement(Form.Item, {
                label: labelCtx,
                key: id
              }, getFieldDecorator(id, _objectSpread({}, ele.config || {}))(React.createElement(Input, ele.props)));

            case "Select":
              return React.createElement(Form.Item, {
                label: labelCtx,
                key: id
              }, getFieldDecorator(id, _objectSpread({
                initialValue: ele.props[0].value
              }, ele.config || {}))(React.createElement(Select, {
                style: ele.style ? ele.style : {
                  width: 120
                }
              }, (ele.props || []).map(function (prop) {
                return React.createElement(Select.Option, _extends({}, prop, {
                  key: prop.value
                }), prop.label);
              }))));

            case "RangePicker":
              id = "TIME-".concat(typeof ele.id !== "string" ? ele.id.join("-") : ele.id);
              return React.createElement(Form.Item, {
                label: labelCtx,
                key: id
              }, getFieldDecorator(id, _objectSpread({}, ele.config || {}))(React.createElement(RangePicker, _extends({
                format: "YYYY-MM-DD HH:mm:ss",
                showTime: true
              }, ele.props || {}))));

            case "Button":
              return React.createElement(Form.Item, {
                key: id
              }, React.createElement(Button, _extends({}, ele.props || {}, {
                onClick: function onClick(e) {
                  e.preventDefault();
                  var func = (ele.props || {}).onClick || noop;

                  if ((ele.props || {}).htmlType === "submit" || (ele.props || {}).htmlType === "reset") {
                    _this2.offset = 0; // this.limit = 10;
                  }

                  if ((ele.props || {}).htmlType === "reset") {
                    resetFields();
                  }

                  _this2.getParams(func);
                }
              }), ele.label));

            case "DatePicker":
              return React.createElement(Form.Item, {
                label: labelCtx,
                key: id
              }, getFieldDecorator(id, _objectSpread({}, ele.config || {}))(React.createElement(DatePicker, _extends({
                format: "YYYY-MM-DD",
                showTime: true
              }, ele.props || {}))));

            case "MonthPicker":
              return React.createElement(Form.Item, {
                label: labelCtx,
                key: id
              }, getFieldDecorator(id, _objectSpread({}, ele.config || {}))(React.createElement(MonthPicker, _extends({
                format: "YYYY-MM",
                showTime: true
              }, ele.props || {}))));

            default:
              return null;
          }
        };

        var _this$props2 = this.props,
            table = _this$props2.table,
            title = _this$props2.title;
        return React.createElement(React.Fragment, null, React.createElement(Card, {
          title: title
        }, React.createElement(Form, {
          layout: "inline"
        }, injectFromItem.map(function (ele) {
          return insertComponent(ele);
        }))), React.createElement(Card, {
          style: {
            marginTop: 10
          }
        }, React.createElement("p", null, "\u5171\u641C\u7D22\u5230 ".concat((table.pagination || {}).total || 0, " \u6761\u8BB0\u5F55")), table.loading ? React.createElement(Skeleton, {
          active: true
        }) : React.createElement(Table, _extends({
          bordered: true,
          rowKey: function rowKey(r, i) {
            return String(r.id || i);
          }
        }, table, {
          pagination: _objectSpread({
            showSizeChanger: true,
            showQuickJumper: true,
            onShowSizeChange: function onShowSizeChange(current, size) {
              _this2.limit = size;
              _this2.offset = 0;

              _this2.getParams(_this2.search);
            },
            onChange: function onChange(page) {
              _this2.offset = (page - 1) * _this2.limit;

              _this2.getParams(_this2.search);
            },
            current: this.offset / this.limit + 1
          }, table.pagination || {})
        }))));
      }
    }]);

    return ContainerItem;
  }(React.Component), _temp)) || _class);
  ContainerItem.propsTypes = {
    beforeCallback: PropTypes.func,
    // search 之前调用的钩子函数
    actionType: PropTypes.string,
    // 请求的action type
    table: PropTypes.object,
    title: PropTypes.string // dispatch: noop,

  };
  ContainerItem.defaultProps = {
    beforeCallback: noop,
    // search 之前调用的钩子函数
    actionType: "",
    // 请求的action type
    table: {},
    title: "" // dispatch: noop,

  };
  return ContainerItem;
}

export default CusFormItem;
