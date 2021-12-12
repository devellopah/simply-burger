// import React from 'react'
import HashLoader from "react-spinners/HashLoader"
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import * as Yup from 'yup'
import { Formik, Form, Field, FieldProps, FormikHelpers } from 'formik'
import { useTranslation } from 'react-i18next'

import Button from '../../../components/ui/Button'
import classes from './ContactData.module.scss'
import axios from '../../../axios-orders'
import { Ingredients } from '../../../store/reducers/builderSlice'
import { Order, purchaseBurger } from '../../../store/reducers/orderSlice'
import withError from '../../../hoc/withError'
import { RootState } from '../../../app/store'

interface IAppProps {
  ingredients: Ingredients,
  totalPrice: number,
  loading: boolean,
  purchaseBurger: typeof purchaseBurger,
  history: any,
  idToken: string,
  localId: string,
}

const orderDataSchema = Yup.object({
  name: Yup.string().min(2, 'Too Short!').defined(),
  email: Yup.string().email('Invalid email').defined(),
  street: Yup.string().defined(),
  postal: Yup.number().defined(),
  deliveryMethod: Yup.string().oneOf(['fastest', 'cheapest']).defined()
})

type Values = Yup.InferType<typeof orderDataSchema>

const ContactData = (props: IAppProps) => {
  const { t } = useTranslation()
  const { idToken, history } = props

  return (
    <div className={classes.ContactData}>
      {props.loading
        ? <HashLoader css={'margin: auto'} />
        : <Formik
          initialValues={{
            name: 'Test',
            email: 'test@test.com',
            street: 'test street',
            postal: 123456,
            deliveryMethod: 'fastest',
          }}
            validationSchema={orderDataSchema}
            onSubmit={(
              values :Values,
              { setSubmitting }: FormikHelpers<Values>) => {
              setSubmitting(false)
              const order: Order = {
                ingredients: props.ingredients,
                price: props.totalPrice,
                localId: props.localId,
                orderData: values,
              }
              props.purchaseBurger({idToken, order, history})
            }}
          >
            {({ isSubmitting }) => (
              <Form translate="yes" className="form">
                <Field name="name">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div className="form__field">
                    <label htmlFor={field.name} className="form__label">{t('form.name.label')}</label>
                      <input
                        type="text"
                        className="form__control"
                        placeholder={t('form.name.placeholder')}
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
                <Field name="street">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div className="form__field">
                      <label htmlFor={field.name} className="form__label">{t('form.address.label')}</label>
                      <input
                        type="text"
                        className="form__control"
                        placeholder={t('form.address.placeholder')}
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
                <Field name="postal">
                  {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                    <div className="form__field">
                      <label htmlFor={field.name} className="form__label">{t('form.postal.label')}</label>
                      <input
                        type="text"
                        className="form__control"
                        placeholder={t('form.postal.placeholder')}
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
                <Field name="deliveryMethod">
                {({ field, form: { isSubmitting }, meta }: FieldProps) => (
                  <div className="form__field">
                    <label htmlFor={field.name} className="form__label">{t('form.delivery.label')}</label>
                    <select
                      id={field.name}
                      disabled={isSubmitting}
                      {...field}
                    >
                      <option value="fastest">fastest</option>
                      <option value="cheapest">cheapest</option>
                    </select>
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
                </Field>
                  <Button type="submit" disabled={isSubmitting} btnType="success">{t('actions.order')}</Button>
                {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              </Form>
            )}
          </Formik>}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  ingredients: state.builder.ingredients,
  totalPrice: state.builder.totalPrice,
  loading: state.order.loading,
  idToken: state.auth.idToken,
  localId: state.auth.localId,
})

export default withRouter(
  connect(mapStateToProps, {
    purchaseBurger,
  })(withError(ContactData, axios))
)