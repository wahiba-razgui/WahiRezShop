declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const DEFAULT_ROUTES: RouteInfo[] = [
  {path: '/home/profile', title: 'Profile', icon: 'pe-7s-user', class: ''}
];

export const USER_ROUTES: RouteInfo[] = [
  {path: '/home/purchase', title: 'purchase', icon: 'pe-7s-graph', class: ''}
];

export const MANAGER_ROUTES: RouteInfo[] = [
  {path: '/home/product', title: 'Product', icon: 'pe-7s-graph', class: ''},
  {path: '/home/sale', title: 'Sale', icon: 'pe-7s-graph', class: ''},
  {path: '/home/user', title: 'User', icon: 'pe-7s-graph', class: ''}
];
