import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';
import { PG_HOST, PG_USER, PG_PASSWORD, PG_DB, PG_PORT, SILENT, CONNECT_TO_DB } from '../constants';
import { Entities } from '../entities';

class Typeorm {
  private static instance: Typeorm;

  private static connection: Connection | Promise<Connection> | any;

  /**
   * Get single instance of current class
   * @returns {Typeorm}
   */
  public static getInstance(): Typeorm {
    if (!Typeorm.instance) {
      Typeorm.instance = new Typeorm();
    }

    return Typeorm.instance;
  }

  public connect() {
    if (CONNECT_TO_DB) {
      if (!Typeorm.connection) {
        console.log(`PG_HOST = ${PG_HOST}`);
        const connectionConfig: ConnectionOptions = {
          type: 'postgres',
          host: PG_HOST,
          port: PG_PORT,
          username: PG_USER,
          password: PG_PASSWORD,
          database: PG_DB,
          entities: Entities,
          dropSchema: false,
          synchronize: true,
          logging: !SILENT,
        };

        Typeorm.connection = createConnection(connectionConfig)
          .then(connection => connection)
          .catch(e => console.error(e));
      }

      return Typeorm.connection;
    }
  }
}

export default Typeorm.getInstance();
