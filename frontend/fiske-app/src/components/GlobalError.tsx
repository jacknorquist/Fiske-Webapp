import React, { useContext, ReactNode} from 'react';
import { Alert } from 'reactstrap';
import { useError } from '../context/ErrorContext.tsx';

const GlobalError: React.FC = () => {
  const { error, clearError } = useError();

  return (
    <Alert color="danger" isOpen={!!error} toggle={clearError}>
      {error}
    </Alert>
  );
};

export default GlobalError;