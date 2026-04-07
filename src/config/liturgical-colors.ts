import type { LiturgicalColor } from '../types/api.ts';

interface ColorTheme {
  accent: string;
  bg: string;
  text: string;
}

export const liturgicalColorMap: Record<LiturgicalColor, { light: ColorTheme; dark: ColorTheme }> = {
  white: {
    light: { accent: '#B8A88A', bg: '#FAF8F5', text: '#4A4335' },
    dark:  { accent: '#D4C5A9', bg: '#2A2620', text: '#EAE4D9' },
  },
  red: {
    light: { accent: '#C25B56', bg: '#FDF5F5', text: '#5C2A28' },
    dark:  { accent: '#D4807B', bg: '#2C1F1F', text: '#F0D0CE' },
  },
  purple: {
    light: { accent: '#8B6FA3', bg: '#F8F5FA', text: '#3D2E4A' },
    dark:  { accent: '#A98BBF', bg: '#251F2C', text: '#E0D4E8' },
  },
  green: {
    light: { accent: '#6B9B6E', bg: '#F5FAF5', text: '#2E4A30' },
    dark:  { accent: '#8AB88D', bg: '#1F2C1F', text: '#D0E8D2' },
  },
  rose: {
    light: { accent: '#C48B8B', bg: '#FDF6F6', text: '#5C3535' },
    dark:  { accent: '#D4A5A5', bg: '#2C2020', text: '#F0D8D8' },
  },
  black: {
    light: { accent: '#5A5A5A', bg: '#F5F5F5', text: '#2A2A2A' },
    dark:  { accent: '#8A8A8A', bg: '#1A1A1A', text: '#D0D0D0' },
  },
};
