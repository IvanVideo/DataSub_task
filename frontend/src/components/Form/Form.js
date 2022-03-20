import './Form.css';
import React, { useEffect, useCallback } from 'react';

function Form({ getCardValues, createCard }) {
    const [values, setValues] = React.useState({}); // значения инпутов формы
    const [errors, setErrors] = React.useState({}); // значения ошибок инпутов формы
    const [isValid, setIsValid] = React.useState(false); // значение валидации формы

    // сбор значений инпутов формы
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value.replace(/\D/g, '') });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    };

    // сбор значений инпутов даты
    const handleChangeDate = (e) => {
        if (e.target.name === 'dateM' && e.target.value < 13) {
            setValues({ ...values, [e.target.name]: e.target.value.replace(/\D/g, '') });
            setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
            setIsValid(e.target.closest("form").checkValidity());
        }
        if (e.target.name === 'dateY' && e.target.value < 2025) {
            setValues({ ...values, [e.target.name]: e.target.value.replace(/\D/g, '') });
            setErrors({ ...errors, [e.target.name]: e.target.validationMessage });
            setIsValid(e.target.closest("form").checkValidity());
        }
    }

    // сабмитим форму
    const handleSubmitFrom = (e) => {
        e.preventDefault();
        createCard(values)
    }

    useEffect(() => {
        getCardValues(values)
    }, [values, errors])

    return (
        <form className='form' onSubmit={handleSubmitFrom}>
            <h2 className='form__title'>Заполните форму</h2>
            <div className='form__box'>
                <label className='form__label'>Card Number</label>
                <input
                    name='number'
                    className='form__input form__input-big'
                    minLength={16}
                    maxLength={16}
                    value={values.number}
                    onChange={handleChange}
                    required />
                <span className='form__error'>{errors.number}</span>
            </div>
            <div className='form__box'>
                <label className='form__label'>Expiration Date</label>
                <div className='form__date'>
                    <div className='form__container'>
                        <div className='form__date-box'>
                            <input
                                name='dateM'
                                placeholder='MM'
                                className='form__input form__input-small input__date'
                                minLength={2}
                                maxLength={2}
                                value={values.dateM}
                                onChange={handleChangeDate}
                                required />
                            <span className='form__error error'>{errors.dateM}</span>
                        </div>
                        <div className='form__date-box'>
                            <input
                                name='dateY'
                                placeholder='YYYY'
                                className='form__input form__input-medium input__date'
                                minLength={4}
                                maxLength={4}
                                value={values.dateY}
                                onChange={handleChangeDate}
                                required />
                            <span className='form__error error'>{errors.dateY}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form__box'>
                <label className='form__label'>CVV</label>
                <input
                    name='CVV'
                    className='form__input form__input-small'
                    minLength={3}
                    maxLength={3}
                    value={values.CVV}
                    onChange={handleChange}
                    required />
                <span className='form__error'>{errors.CVV}</span>

            </div>
            <div className='form__box'>
                <label className='form__label'>Amount</label>
                <input
                    name='amount'
                    className='form__input form__input-medium'
                    value={values.amount}
                    onChange={handleChange}
                    required />
                <span className='form__error'>{errors.amount}</span>

            </div>
            <button
                disabled={!isValid}
                className={isValid ? 'form__button' : 'form__button_disable'}>
                Отправить
            </button>
        </form>
    );
}

export default Form;