import { AuthChecker } from 'type-graphql';
import Context from '../types/context';

const authChecker: AuthChecker<Context> = ({ context }) => {
  // if (roles.length === 0) {
  //   return context.user !== undefined;
  // }

  // if (!context.user) {
  //   return false;
  // }

  // if (context.user.roles.some(role => roles.includes(role))) {
  //   return true;
  // }

  // return false;

  return !!context.user;
};

export default authChecker;
