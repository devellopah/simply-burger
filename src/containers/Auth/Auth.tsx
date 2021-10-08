import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { Formik, Form, Field, FieldProps } from 'formik'
import HashLoader from "react-spinners/HashLoader"
import { useTranslation } from 'react-i18next'

import Button from '../../components/ui/Button'
import { authenticate } from '../../store/actions'
import { AppState } from '../../store'
import { Redirect } from 'react-router-dom'

interface IAuthProps {
  authenticate: any,
  isLoading: boolean,
  error: any | null,
  isAuth: boolean,
  totalPrice: number,
}

interface IAuthState {
  isLogin: boolean,
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').defined(),
  password: Yup.string().min(6, 'Too Short!').defined(),
})

type MyFormValues = Yup.InferType<typeof schema>

const Auth = (props: IAuthProps) => {

  const { t } = useTranslation()

  const [ isLogin, setIsLogin ] = useState(true)

  const switchAuthMode = () => {
    setIsLogin(!isLogin)
  }

  const initialValues: MyFormValues = {
    email: '',
    password: '',
  }

  return (
    <>
      {props.isAuth && <Redirect to={props.totalPrice > 0 ? '/checkout' : '/'} />}
      {props.error && <strong>{props.error.message}</strong>}
      {props.isLoading
          ? <HashLoader
            size={100}
            color={"#703b09"}
          />
          : <div className="form">
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false)
                props.authenticate({ ...values, isLogin })
              }}
            >
              {({ isSubmitting, values }) => (
              <Form translate="yes" className="form__form">
                  <Field name="email">
                    {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                      <div className="form__field">
                        <label htmlFor={field.name} className="form__label">{t('form.email.label')}</label>
                        <input
                          type="email"
                          className="form__control"
                          placeholder={t('form.email.placeholder')}
                          id={field.name}
                          disabled={isSubmitting}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                      <div className="form__field">
                        <label htmlFor={field.name} className="form__label">{t('form.password.label')}</label>
                        <input
                          type="password"
                          className="form__control"
                          placeholder={t('form.password.placeholder')}
                          id={field.name}
                          disabled={isSubmitting}
                          {...field}
                        />
                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Button type="submit" disabled={isSubmitting} btnType="success">{isLogin ? t('auth.login') : t('auth.account.create')}</Button>
                  {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                </Form>
              )}
            </Formik>
            {isLogin
              ? <div>{t('auth.account.need')} <Button btnType="success" clicked={switchAuthMode}>{t('auth.signup')}</Button></div>
              : <div>{t('auth.account.have')} <Button btnType="success" clicked={switchAuthMode}>{t('auth.login')}</Button></div>
            }
          </div>}
    </>
  )
}

export default connect(
  (state: AppState) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    isAuth: state.auth.idToken !== null,
    totalPrice: state.builder.totalPrice,
  }), { authenticate })(Auth)
