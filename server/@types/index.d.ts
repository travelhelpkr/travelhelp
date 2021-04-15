import 'express-session';

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

declare module "*.json" {
  const value: any;
  export default value;
}