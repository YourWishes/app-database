import { DatabaseConnection } from './DatabaseConnection';
import { App } from '@yourwishes/app-base';
import { IDatabaseApp } from './../app/IDatabaseApp';

class SampleApp extends App implements IDatabaseApp {
  database:DatabaseConnection;
}

describe('DatabaseConnection', () => {
  it('should require an app', () => {
    expect(() => new DatabaseConnection(null)).toThrow();
  });

  it('should construct with an app', () => {
    let app = new SampleApp();
    expect(() => new DatabaseConnection(app)).not.toThrow();
  });

  it('should be able to be added to an app', () => {
    let app = new SampleApp();
    let db = new DatabaseConnection(app);
    expect(() => app.addModule(db)).not.toThrow();
    expect(app.modules).toContain(db);
  });
});

describe('init', () => {
  it('should require the config to have the URL', async () => {
    let app = new SampleApp();
    let db = new DatabaseConnection(app);
    app.addModule(db);
    await expect(db.init()).rejects.toThrow();
  });
});
