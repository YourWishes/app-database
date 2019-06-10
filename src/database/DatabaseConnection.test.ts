import { App } from '@yourwishes/app-base';
import { IDatabaseApp, DatabaseConnection } from './../';

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
});

describe('init', () => {
  it('should require the config to have the URL', async () => {
    let app = new SampleApp();
    let db = new DatabaseConnection(app);
    app.modules.addModule(db);
    await expect(db.init()).rejects.toThrow();
  });
});

describe('loadPackage', () => {
  it('should be called on construct and define the package.json', () => {
    let app = new SampleApp();
    let db = new DatabaseConnection(app);
    expect(db.package.name).toStrictEqual('@yourwishes/app-database');
  });
});
