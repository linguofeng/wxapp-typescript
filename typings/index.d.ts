declare namespace wx {
  export function getStorageSync(key: string): any;
  export function setStorageSync(key: string, data: any): void;
  export function login(args: any): void;
  export function getUserInfo(args: any): void;
  export function navigateTo(args: any): void;
  export function request(args: Object): void;
}

declare interface Application {
  onLaunch(): void
  store: {
    dispatch: (Object) => void,
  }
}

declare interface BasePage {
  setData(data: Object): void
}

declare function App(app: Application): void;
declare function Page(page: BasePage): void;

declare function getApp(): Application;

declare var global: {
  global: any,
  Object: any,
  clearTimeout: any,
}
