import React from 'react';

import Modal from '../../components/ui/Modal'
import useHttpError from '../../hooks/httpError'

const withError = (WrappedComponent, axios) => {
  const WithError = (props) => {

    const [error, clearError] = useHttpError(axios)
    return (
      <>
        <Modal
          show={error}
          clicked={clearError}
        >
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    )
  }
  return WithError
}

export default withError;
