// Copyright (c) 2018 Dominic Masters
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import { Module, NPMPackage } from '@yourwishes/app-base';
import { IDatabaseApp } from './../app/IDatabaseApp';

export const CONFIG_URL = "database.url";

export const pgp:IMain = pgPromise({  });

export type QUERY_PARAM = object|undefined;

export class DatabaseConnection extends Module {
  app:IDatabaseApp;
  connection:IDatabase<any>;

  constructor(app:IDatabaseApp) {
    super(app);
  }

  isConnected():boolean { return this.connection != null; }

  loadPackage():NPMPackage { return require('./../../package.json'); }

  async init():Promise<void> {
    //Check the configuration.
    if(!this.app.config.has(CONFIG_URL)) throw new Error("Missing Database Connection URL in Configuration.");

    //Now attempt to connect to the PostgreSQL server
    this.logger.debug('Connecting to database...');
    this.connection = await pgp(this.app.config.get(CONFIG_URL));
    this.logger.debug('Successfully connected to the database.');
  }

  async destroy():Promise<void> {
    //TODO: Gracefully close connection.
  }

  //Since we want queries to run through us in the future we're going to setup
  //some alias functions here, in the future we may support things like MySQL
  //mongodb etc.
  //Database Shorthand functions
  none(query:string, data?:QUERY_PARAM) {
    return this.connection.none(query, data);
  }

  any<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.any<T>(query, data);
  }

  one<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.one<T>(query, data);
  }

  oneOrNone<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.oneOrNone<T>(query, data);
  }

  many<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.many<T>(query, data);
  }

  manyOrNone<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.manyOrNone<T>(query, data);
  }

  query<T=any>(query:string, data?:QUERY_PARAM) {
    return this.connection.query<T>(query, data);
  }
}
