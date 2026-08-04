export type AdminRole = 'ADMINISTRATEUR' | 'COMMERCIAL';

export type Permission =
  | 'dashboard:view_global'
  | 'dashboard:view_commercial'
  | 'visitors:view'
  | 'users:manage'
  | 'forfaits:manage'
  | 'tarification:manage'
  | 'antifraude:manage'
  | 'finance:read'
  | 'finance:adjust'
  | 'moderation:manage'
  | 'commercial:manage'
  | 'commercial:leads'
  | 'commercial:reclamations'
  | 'commercial:incidents'
  | 'badges:manage'
  | 'tutorials:manage'
  | 'ads:manage';

export const ROLE_PERMISSIONS: Record<AdminRole, Permission[]> = {
  ADMINISTRATEUR: [
    'dashboard:view_global',
    'visitors:view',
    'users:manage',
    'forfaits:manage',
    'tarification:manage',
    'antifraude:manage',
    'finance:read',
    'finance:adjust',
    'moderation:manage',
    'commercial:manage',
    'commercial:leads',
    'badges:manage',
    'tutorials:manage',
    'ads:manage',
  ],
  COMMERCIAL: [
    'dashboard:view_commercial',
    'visitors:view',
    'commercial:leads',
    'commercial:reclamations',
    'commercial:incidents',
    'finance:read',
    'tutorials:manage',
  ],
};

export function hasPermission(role: AdminRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export interface NavItem {
  title: string;
  href: string;
  iconName: string;
  badge?: string;
  requiredPermission?: Permission;
  children?: Omit<NavItem, 'iconName' | 'children'>[]; // Structure récursive pour les sous-menus
}

export const ADMIN_NAVIGATION: NavItem[] = [
  // Dashboard & Vue globale
  {
    title: 'Vue globale',
    href: '/admin/administrateur/dashboard',
    iconName: 'LayoutDashboard',
    requiredPermission: 'dashboard:view_global',
  },
  {
    title: 'Synthèse Support',
    href: '/admin/administrateur/commercial/dashboard',
    iconName: 'LayoutDashboard',
    requiredPermission: 'dashboard:view_commercial',
  },

  // Audience & Visiteurs avec sous-menus
  {
    title: 'Visiteurs & Audience',
    href: '/admin/administrateur/visiteurs/global',
    iconName: 'TrendingUp',
    requiredPermission: 'visitors:view',
    children: [
      {
        title: 'Vue Globale',
        href: '/admin/administrateur/visiteurs/global',
        requiredPermission: 'visitors:view',
      },
      {
        title: 'Connectés (Inscrits)',
        href: '/admin/administrateur/visiteurs/connectes',
        requiredPermission: 'visitors:view',
      },
      {
        title: 'Non-Connectés (Anonymes)',
        href: '/admin/administrateur/visiteurs/anonymes',
        requiredPermission: 'visitors:view',
      },
      {
        title: 'Analytiques & Origines',
        href: '/admin/administrateur/visiteurs/stats',
        requiredPermission: 'visitors:view',
      },
    ],
  },

  // Équipe Commerciale & Leads
  {
    title: 'Équipe Commerciaux',
    href: '/admin/administrateur/commerciaux',
    iconName: 'Users',
    requiredPermission: 'commercial:manage',
  },
  
  {
    title: 'Top Vendeurs (+10)',
    href: '/admin/commercial/top-vendeurs',
    iconName: 'Users',
    requiredPermission: 'commercial:leads',
  },

  // Gestion Administrateur
  {
    title: 'Utilisateurs & Rôles',
    href: '/admin/administrateur/users',
    iconName: 'Users',
    requiredPermission: 'users:manage',
  },
  {
    title: 'Offres & Forfaits',
    href: '/admin/administrateur/forfaits',
    iconName: 'Package',
    requiredPermission: 'forfaits:manage',
  },
  {
    title: 'Badges & Certifications',
    href: '/admin/administrateur/badges',
    iconName: 'Award',
    requiredPermission: 'badges:manage',
  },
  {
    title: 'Centre de Tutoriels',
    href: '/admin/administrateur/tutoriels',
    iconName: 'Video',
    requiredPermission: 'tutorials:manage',
  },
  {
    title: 'Gestion Publicités',
    href: '/admin/administrateur/publicites',
    iconName: 'Megaphone',
    requiredPermission: 'ads:manage',
  },
  {
    title: 'Tarification & Règles',
    href: '/admin/administrateur/tarification/interactions',
    iconName: 'Sliders',
    requiredPermission: 'tarification:manage',
  },
  {
    title: 'Anti-fraude',
    href: '/admin/administrateur/antifraude',
    iconName: 'ShieldAlert',
    requiredPermission: 'antifraude:manage',
  },
  {
    title: 'Modération Annonces',
    href: '/admin/administrateur/moderation/annonces',
    iconName: 'CheckSquare',
    requiredPermission: 'moderation:manage',
  },

  // Finances & Support Commercial
  {
    title: 'Finance & Portefeuilles',
    href: '/admin/administrateur/finance/portefeuilles',
    iconName: 'Wallet',
    requiredPermission: 'finance:read',
  },
  {
    title: 'Abonnés Premium',
    href: '/admin/commercial/premium',
    iconName: 'Users',
    requiredPermission: 'commercial:leads',
  },
  {
    title: 'Réclamations',
    href: '/admin/administrateur/reclamations',
    iconName: 'Headphones',
    requiredPermission: 'commercial:reclamations',
  },
  {
    title: 'Incidents Débits',
    href: '/admin/administrateur/incidents',
    iconName: 'AlertCircle',
    requiredPermission: 'commercial:incidents',
  },
];