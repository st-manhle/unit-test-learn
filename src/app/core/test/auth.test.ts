import { AuthService } from '../services/auth.service';
import { AuthStorageService } from '../services/authStorage.service';

const storageKey = 'token';
const storageValue = 'Bearer Token';

// Bai tap 2
describe('Check AuthStorageService functions', () => {
  const authStorageService = new AuthStorageService();
  it('setToken', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    authStorageService.setToken(storageValue);
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith(storageKey, storageValue);
  });

  it('getToken', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    authStorageService.getToken();
    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith(storageKey);
  });

  it('removeToken', () => {
    jest.spyOn(Storage.prototype, 'removeItem');
    authStorageService.removeToken();
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith(storageKey);
  });
});

// Bai tap 3
describe('Check authentication functions', () => {
  const authService = new AuthService();
  it('signIn', () => {
    const mockFn = jest.spyOn(AuthStorageService.prototype, 'setToken');
    authService.signIn(storageValue);
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(storageValue);
  });

  it('signOut', () => {
    const mockFn = jest.spyOn(AuthStorageService.prototype, 'removeToken');
    authService.signOut();
    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith();
  });
});
