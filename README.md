# helper-form

## 🌰

```js
construtor(props){
    this.FormItem = CusFormItem(props.form, [
        {
            type: 'Input',
            props: {
            placeholder: '请输入',
            },
            label: '活动名称',
            id: 'promotion_name',
        },
        {
            type: 'Select',
            label: '活动状态',
            props: [
                { label: '全部', value: '' },
                { label: '助力中', value: 1 },
                { label: '助力成功', value: 2 },
                { label: '已结束', value: 3 },
            ],
        },
        {
            label: '购买时间',
            type: 'RangePicker',
            props: { allowClear: false },
            config: {
                initialValue: [
                    moment()
                    .subtract('months', 1)
                    .startOf('day'),
                    moment().endOf('day'),
                ],
            },
            id: ['start_time', 'end_time'],
        },
        {
            type: 'Button',
            label: '中奖记录',
            props: {
            type: 'primary',
            onClick: () => {
                // TODO...
            },
            },
        },
    ]);
}
```

```js
getId = async ({params,extendsParams}) => {
    const stuId = await this.queryId('liveClass/getStuSimpleList', params.extendsParams[0]);
    return { student_id: stuId,  };
};
```

```js
<CusFormItem
    actionType="liveClass/getIntentConsumeList"
    beforeCallback={this.getId}
    table={{
        columns: this.columns.map(col => ({ align: 'center', ...col })),
        scroll: { x: 2400 },
        dataSource: consumeList.result || [],
        loading,
        pagination: {
        total: consumeList.total_size || 0,
        },
    }}
/>
```