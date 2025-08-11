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
    icon: 'fa fa-dashboard',
    children: [
      {
        id: 'project_overview',
        title: 'Project Overview',
        type: 'item',
        classes: 'nav-item',
        url: '/project-overview',
        icon: 'fa fa-info-circle',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'test_mgmt',
    title: 'Test Management',
    type: 'group',
    icon: 'fa fa-vials',
    children: [
      {
        id: 'test_suites',
        title: 'Test Suites',
        type: 'item',
        classes: 'nav-item',
        url: '/test-suites',
        icon: 'fa fa-folder-open',
        breadcrumbs: false
      },
      {
        id: 'test_cases',
        title: 'Test Cases',
        type: 'item',
        classes: 'nav-item',
        url: '/test-cases',
        icon: 'fa fa-file-alt',
        breadcrumbs: false
      },
      {
        id: 'test_runs',
        title: 'Test Runs',
        type: 'item',
        classes: 'nav-item',
        url: '/test-runs',
        icon: 'fa fa-play-circle',
        breadcrumbs: false
      },
      {
        id: 'test_plan',
        title: 'Test Plan',
        type: 'item',
        classes: 'nav-item',
        url: '/test-plan',
        icon: 'fa fa-tasks',
        breadcrumbs: false
      },
      {
        id: 'defects',
        title: 'Defects',
        type: 'item',
        classes: 'nav-item',
        url: '/defects',
        icon: 'fa fa-bug',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'Project_settings',
    title: 'project Settings',
    type: 'group',
    icon: 'fa fa-cogs',
    children: [
      {
        id: 'general_project_settings',
        title: 'General',
        type: 'item',
        classes: 'nav-item',
        url: '/settings/general',
        icon: 'fa fa-sliders-h',
        breadcrumbs: false
      },
      {
        id: 'project_access_control',
        title: 'Access Control',
        type: 'item',
        classes: 'nav-item',
        url: '/settings/access-control',
        icon: 'fa fa-user-shield',
        breadcrumbs: false
      }
    ]
  }
]



