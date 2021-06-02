import React, { Component, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
const FormItem = Form.Item;
export default function AntdFormPage() {
    const [form] = Form.useForm();
    const nameRules = [{ required: true, message: '姓名为必填' }];
    const passwordRules = [{ required: true, message: '请输入密码' }];
    const onFinish = (val) => {
        console.log('success', val);
    };
    const onFinishFailed = (val) => {
        console.log('failed', val);
    };
    useEffect(() => {
        form.setFieldsValue({ username: 'default' });
        console.log('form', form);
    });
    return (
        <div>
            <h3>AntdFormPage</h3>
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <FormItem name="username" label="姓名" rules={nameRules}>
                    <Input placeholder="请输入姓名" />
                </FormItem>
                <FormItem name="password" label="密码" rules={passwordRules}>
                    <Input placeholder="请输入密码" />
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        </div>
    );
}
