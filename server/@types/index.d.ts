import 'express-session';

declare module "express-session" {
  interface Session {
    user_id: number;
    user_name: string;
    user_email: string;
    user_language: string;
    visit_count: number;
  }
}
