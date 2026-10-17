import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { useAuthContext } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  return function ProtectedRoute({ ...props }) {
    const { status } = useAuthContext();
    const { push } = useRouter();

    useEffect(() => {
      if (status === 'success') {
        push(`/dashboard`);
      }
    }, [status, push]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
