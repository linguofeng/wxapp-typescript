declare namespace wx {
  export function getStorageSync(key: string): any;
  export function setStorageSync(key: string, data: any): void;
  export function login(args: any): void;
  export function getUserInfo(args: any): void;
  export function navigateTo(args: any): void;
}

declare interface BaseApp {
  onLaunch(): void
}

declare interface BasePage {
  setData(data: Object): void
}

declare function App(app: BaseApp): void;
declare function Page(page: BasePage): void;
