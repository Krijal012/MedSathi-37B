import { User } from '../model/userModel.js';

describe('User Model', () => {
  it('should have the correct attributes', () => {
    const attributes = User.rawAttributes;
    expect(attributes.id).toBeDefined();
    expect(attributes.name).toBeDefined();
    expect(attributes.email).toBeDefined();
    expect(attributes.password).toBeDefined();
    expect(attributes.role).toBeDefined();
  });

  it('should have id as primary key and auto increment', () => {
    const idAttr = User.rawAttributes.id;
    expect(idAttr.primaryKey).toBe(true);
    expect(idAttr.autoIncrement).toBe(true);
  });

  it('should have email as unique', () => {
    const emailAttr = User.rawAttributes.email;
    expect(emailAttr.unique).toBe(true);
  });
});
