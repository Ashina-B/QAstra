export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'fa fa-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'fa fa-sign-in',
        // target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'fas fa-clipboard',
        // target: true,
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'Projects',
    title: 'Projects',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Test Project 1',
        title: 'Test Project 1',
        type: 'item',
        classes: 'nav-item',
        url: '/project',
        icon: 'font-size'
      },
      {
        id: 'Test Project 2',
        title: 'Test Project 2',
        type: 'item',
        classes: 'nav-item',
        url: '/project',
        icon: 'bg-colors'
      }
      // ,
      // {
      //   id: 'tabler',
      //   title: 'Tabler',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: 'https://ant.design/components/icon',
      //   icon: 'ant-design',
      //   target: true,
      //   external: true
      // }
    ]
  },

  {
    id: 'user',
    title: 'Users Management',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
