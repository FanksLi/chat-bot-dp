export interface ChatItem {
  id: number;
  title: string;
  model: string;
}

export interface Message {
  id: number | string;
  role: string;
  parts: { type: string; text?: string }[];
}

export interface ProjectItem {
  name: string;
  tag: string;
  tagColor: string;
  techStack: string;
  description: string;
}

export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
}