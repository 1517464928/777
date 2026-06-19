export interface StatData {
  id: number;
  label: string;
  value: string;
  order: number;
}

export type BlockRole = "title" | "content" | "key";

export type BlockFont = "sans" | "serif" | "mono";

export interface BlockStyle {
  role?: BlockRole;
  color?: string;
  font?: BlockFont;
}

export interface ExperiencePanel {
  title: string;
  content: string;
  style?: {
    title?: BlockStyle;
    content?: BlockStyle;
  };
}

export function parsePanels(panelsJson: string): ExperiencePanel[] {
  if (!panelsJson) return [];
  try {
    const parsed = JSON.parse(panelsJson);
    if (!Array.isArray(parsed)) return [];
    return parsed as ExperiencePanel[];
  } catch {
    return [];
  }
}

export function stringifyPanels(panels: ExperiencePanel[]): string {
  return JSON.stringify(panels);
}

export function parseStyle(json: string): Record<string, BlockStyle> {
  if (!json) return {};
  try {
    const parsed = JSON.parse(json);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return {};
    return parsed as Record<string, BlockStyle>;
  } catch {
    return {};
  }
}

export function stringifyStyle(style: Record<string, BlockStyle>): string {
  return JSON.stringify(style);
}

export interface ExperienceData {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  detail1: string;
  detail2: string;
  workContent: string;
  achievements: string;
  growth: string;
  panel1Title: string;
  panel2Title: string;
  panel3Title: string;
  panel4Title: string;
  panels: string;
  style: string;
  order: number;
}

export interface AdvantageData {
  id: number;
  title: string;
  description: string;
  icon: string;
  style: string;
  order: number;
}

export interface ProjectData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  link: string;
  style: string;
  order: number;
}

export interface SocialLinkData {
  id: number;
  platform: string;
  url: string;
  label: string;
  order: number;
}

export interface SiteConfigData {
  id: number;
  heroTitle: string;
  heroButtonText: string;
  style: string;
}
