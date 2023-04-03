import React from 'react';
import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form(props) {
    const { fields, className } = props;

    const inputFields = fields.map((field, index) => {
        const { type, name, placeholder, class: fieldClass } = field;
        const finalClassName = fieldClass ? `${className} ${fieldClass}` : className;
        return (
            <label key={index}>
                {name} :
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={cx(fieldClass, finalClassName)}
                ></input>
            </label>
        );
    });
    return (
        <form className={cx(className)}>
            {inputFields}
            <button type="submit">Submit</button>
        </form>
    );
}

export default Form;
