import { config } from 'dotenv';
config();

export const CONNECT_TO_DB = process.env.CONNECT_TO_DB
  ? process.env.CONNECT_TO_DB === 'true'
  : false;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
export const SILENT = process.env.SILENT ? process.env.SILENT === 'true' : false;
export const PG_HOST = process.env.PG_HOST || 'localhost';
export const PG_USER = process.env.PG_USER || 'postgres';
export const PG_PASSWORD = process.env.PG_PASSWORD || 'postgres';
export const PG_DB = process.env.PG_DB || 'postgres';
export const PG_PORT = process.env.PG_PORT ? parseInt(process.env.PG_PORT, 10) : 5438;
export const IS_PRODUCTION = process.env.NODE_ENV ? process.env.NODE_ENV === 'production' : false;

const constants = {
  CONNECT_TO_DB,
  PORT,
  SILENT,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  PG_DB,
  IS_PRODUCTION,
};
console.log(constants);
