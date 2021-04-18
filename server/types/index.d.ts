import { Session } from 'express-session';

// check this discussion for understanding this delare moudle: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/49941#issuecomment-748590599
declare module "express-session" {
  export interface Session {
    user_id: number;
    user_name: string;
    user_email: string;
    user_language: string;
    visit_count: number;
    passport: any;
  }
}

// declare module "*.json" {
//   const value: any;
//   export default value;
// }
