import React from "react";
import {
  Form,
  Select,
  Card,
  Table,
  Input,
  DatePicker,
  Button,
  Skeleton
} from "antd";
import moment from "moment";
import { connect } from "dva";
import PropTypes from "prop-types";

const { RangePicker, MonthPicker } = DatePicker;

const charCode = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

function noop() {}

function CusFormItem(form, injectFromItem = []) {
  if (!injectFromItem || injectFromItem.length === 0)
    return () => <div>配置项呢？</div>;

  @connect()
  class ContainerItem extends React.Component {
    constructor(props) {
      super(props);
      this.offset = 0;
      this.limit = 10;
      this.extendsParams = {};
    }

    componentDidMount() {
      this.getParams(this.search);
    }

    search = params => {
      const { dispatch, actionType } = this.props;
      if (!actionType) return;
      dispatch({ type: actionType, payload: { params: params.params } });
    };

    isCharCode = key => {
      return charCode.indexOf(key) !== -1;
    };

    kv = (key, obj = {}) => {
      const offset = charCode.indexOf(key);
      if (offset !== -1) {
        return {
          [obj[charCode[offset - 1]]]:
            typeof obj[charCode[offset]] === "string"
              ? obj[charCode[offset]].trim() === ""
                ? undefined
                : obj[charCode[offset]]
              : obj[charCode[offset]]
        };
      }
    };

    getParams = callback => {
      const { beforeCallback } = this.props;
      form.validateFields(async (err, values) => {
        if (!err) {
          let params = {
            offset: this.offset,
            limit: this.limit
          };
          const extendsParams = [];

          Object.keys(values).map(key => {
            if (key.indexOf("TIME") !== -1) {
              const timeList = key.split("-").slice(1);
              params = Object.assign(
                params,
                timeList.reduce((result, time, i) => {
                  if (Array.isArray(values[key]) && !values[key].length)
                    return result;
                  result[time] =
                    values[key] && moment(Number(values[key][i])).unix();
                  return result;
                }, {})
              );
            } else if (this.extendsParams[key]) {
              // extendsParams = Object.assign(extendsParams, this.kv(key, values));
              extendsParams.push(this.kv(key, values));
            } else if (!this.isCharCode(key)) {
              const value =
                typeof values[key] === "string" && values[key].trim() === ""
                  ? undefined
                  : values[key];
              params = Object.assign(params, { [key]: value });
            } else if (charCode.indexOf(key) % 2 === 1) {
              params = Object.assign(params, this.kv(key, values));
            }
          });

          let otherParams = {};

          if (beforeCallback) {
            otherParams = await beforeCallback({
              extendsParams,
              params
            });
          }

          callback(
            Object.assign({
              params: {
                ...params,
                ...otherParams
              },
              extendsParams
            })
          );
        }
      });
    };

    render() {
      const { getFieldDecorator, resetFields } = form;

      let indexOfCharCode = -1;

      const insertComponent = ele => {
        const E = ele.type;

        const labelCtx =
          typeof (ele.label || "") === "string"
            ? ele.label
            : insertComponent(ele.label);

        indexOfCharCode += 1;

        // 配置项没有传ID 从charCode里面分配
        let id = ele.id || charCode[indexOfCharCode];
        if (id === ele.id) {
          indexOfCharCode -= 1;
        }

        if (ele.extendsParams) this.extendsParams[id] = true;

        switch (E) {
          // TODO
          case "Input":
            return (
              <Form.Item label={labelCtx} key={id}>
                {getFieldDecorator(id, { ...(ele.config || {}) })(
                  <Input {...ele.props} />
                )}
              </Form.Item>
            );
          case "Select":
            return (
              <Form.Item label={labelCtx} key={id}>
                {getFieldDecorator(id, {
                  initialValue: ele.props[0].value,
                  ...(ele.config || {})
                })(
                  <Select style={ele.style ? ele.style : { width: 120 }}>
                    {(ele.props || []).map(prop => (
                      <Select.Option {...prop} key={prop.value}>
                        {prop.label}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            );
          case "RangePicker":
            id = `TIME-${
              typeof ele.id !== "string" ? ele.id.join("-") : ele.id
            }`;
            return (
              <Form.Item label={labelCtx} key={id}>
                {getFieldDecorator(id, { ...(ele.config || {}) })(
                  <RangePicker
                    format="YYYY-MM-DD HH:mm:ss"
                    showTime
                    {...(ele.props || {})}
                  />
                )}
              </Form.Item>
            );
          case "Button":
            return (
              <Form.Item key={id}>
                <Button
                  {...(ele.props || {})}
                  onClick={e => {
                    e.preventDefault();
                    const func = (ele.props || {}).onClick || noop;
                    if (
                      (ele.props || {}).htmlType === "submit" ||
                      (ele.props || {}).htmlType === "reset"
                    ) {
                      this.offset = 0;
                      // this.limit = 10;
                    }
                    if ((ele.props || {}).htmlType === "reset") {
                      resetFields();
                    }
                    this.getParams(func);
                  }}
                >
                  {ele.label}
                </Button>
              </Form.Item>
            );
          case "DatePicker":
            return (
              <Form.Item label={labelCtx} key={id}>
                {getFieldDecorator(id, {
                  ...(ele.config || {})
                })(
                  <DatePicker
                    format="YYYY-MM-DD"
                    showTime
                    {...(ele.props || {})}
                  />
                )}
              </Form.Item>
            );
          case "MonthPicker":
            return (
              <Form.Item label={labelCtx} key={id}>
                {getFieldDecorator(id, {
                  ...(ele.config || {})
                })(
                  <MonthPicker
                    format="YYYY-MM"
                    showTime
                    {...(ele.props || {})}
                  />
                )}
              </Form.Item>
            );
          default:
            return null;
        }
      };

      const { table, title } = this.props;

      return (
        <>
          <Card title={title}>
            <Form layout="inline">
              {injectFromItem.map(ele => insertComponent(ele))}
            </Form>
          </Card>
          <Card style={{ marginTop: 10 }}>
            <p>{`共搜索到 ${(table.pagination || {}).total || 0} 条记录`}</p>
            {table.loading ? (
              <Skeleton active />
            ) : (
              <Table
                bordered
                rowKey={(r, i) => String(r.id || i)}
                {...table}
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  onShowSizeChange: (current, size) => {
                    this.limit = size;
                    this.offset = 0;
                    this.getParams(this.search);
                  },
                  onChange: page => {
                    this.offset = (page - 1) * this.limit;
                    this.getParams(this.search);
                  },
                  current: this.offset / this.limit + 1,
                  ...(table.pagination || {})
                }}
              />
            )}
          </Card>
        </>
      );
    }
  }

  ContainerItem.propsTypes = {
    beforeCallback: PropTypes.func, // search 之前调用的钩子函数
    actionType: PropTypes.string, // 请求的action type
    table: PropTypes.object,
    title: PropTypes.string
    // dispatch: noop,
  };

  ContainerItem.defaultProps = {
    beforeCallback: noop, // search 之前调用的钩子函数
    actionType: "", // 请求的action type
    table: {},
    title: ""
    // dispatch: noop,
  };

  return ContainerItem;
}

export default CusFormItem;
