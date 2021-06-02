import _Form from './Form';
import Field from './Field';
import useForm from './useForm';
import React from 'react';

// 使用forwardref转发一下ref，使得组件可以接收到
const Form = React.forwardRef(_Form);

Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm };
export default Form;
