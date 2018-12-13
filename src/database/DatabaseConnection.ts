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
import { App, Module } from '@yourwishes/app-base';

export const CONFIG_URL = "database.url";

const pgp:IMain = pgPromise({

});

export class DatabaseConnection extends Module {
  connection:IDatabase<any>;

  constructor(app:App) {
    super(app);
  }

  isConnected():boolean { return this.connection != null; }

  async init():Promise<void> {
    //Check the configuration.
    if(!this.app.config.has(CONFIG_URL)) throw "Missing Database Connection URL in Configuration.";

    //Now attempt to connect to the PostgreSQL server
    this.connection = await pgp(this.app.config.get(CONFIG_URL));
  }

  //Since we want queries to run through us in the future we're going to setup
  //some alias functions here, in the future we may support things like MySQL
  //mongodb etc.
  //Database Shorthand functions
  async none(query:string, data:object|undefined=undefined):Promise<any> {
    return await this.connection.none(query, data);
  }

  async any(query:string, data:object|undefined=undefined):Promise<any> {
    return await this.connection.any(query, data);
  }

  async one(query:string, data:object|undefined=undefined):Promise<any> {
    return await this.connection.one(query, data);
  }

  async oneOrNone(query:string, data:object|undefined=undefined):Promise<any> {
    return await this.connection.oneOrNone(query, data);
  }

  async query(query:string, data:object|undefined=undefined):Promise<any> {
    return await this.connection.query(query, data);
  }
}