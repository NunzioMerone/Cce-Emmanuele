export interface NavItem {
  label: string;
  href: string;
  section?: string;
}

export interface NavbarProps {
  items: NavItem[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface PageLayoutProps {
  children: React.ReactNode;
}
