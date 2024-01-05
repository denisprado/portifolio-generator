'use client';

import React from 'react';
import { Tables } from 'types';

export interface ThemeData {
  id: string; // ou o tipo apropriado para o ID
}

export interface ThemeProps {
  tableName: string;
  data?: ThemeData[];
  selected?: string | null;
  setData?: React.Dispatch<React.SetStateAction<ThemeData[]>>;
  setSelected?: React.Dispatch<React.SetStateAction<string | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export type WorkFieldId = keyof WorkType;
export type PortfolioFieldId = keyof PortfolioType;

export type PortfolioInputFieldsTypes = {
  label: string;
  fieldId: PortfolioFieldId;
  rows: number;
}[];

export type WorkInputFieldsTypes = {
  label: string;
  fieldId: WorkFieldId;
  rows: number;
}[];

export type imagesFiles = 'image_1' | 'image_2';
export type imagesSrcs = 'image_1_src' | 'image_2_src';

export type imageFieldsTypes = {
  file: imagesFiles;
  src: imagesSrcs;
  labelButton: string;
}[];

export type RadioFieldsTypes = {
  label: string;
  fieldName: keyof WorkType;
  values: { value: string; label: string; default: boolean }[];
};

export type ConfigType = Tables<'config'>;

export type PortfolioType = Tables<'portfolio'>;

export type WorkType = Tables<'work'>;

export type ThemeStyles = { portfolio: PortfolioType };
export type WorkThemeStyles = { work: WorkType };

export type SpacingTheme = Tables<'spacing_theme'>;
export type ColorTheme = Tables<'color_theme'>;
export type TypographyTheme = Tables<'typography_theme'>;
export type pageLayoutType = 'portrait' | 'landscape';

export type PageLayoutType = pageLayoutType;
