import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

interface Props extends PropsWithChildren {
  isAllow: boolean;
}
const ProtectedRouter: React.FC<Props> = ({ isAllow, children }) => {
  if (!isAllow) {
    return <Navigate to={'/login'}></Navigate>;
  }

  return <div>{children}</div>;
};

export default ProtectedRouter;
