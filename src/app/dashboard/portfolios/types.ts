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

export type FieldId = keyof PortifolioType;

export type inputFieldsTypes = {
  label: string;
  fieldId: FieldId;
  rows: number;
}[];

export type imagesFiles = 'image_1' | 'image_2';
export type imagesSrcs = 'image_1_src' | 'image_2_src';

export type imageFieldsTypes = {
  file: imagesFiles;
  src: imagesSrcs;
  labelButton: string;
}[];

export type ConfigType = Tables<'config'>;

export type PortifolioType = Tables<'portfolio'>;

export type WorkType = Tables<'work'>;

export type ThemeStyles = { portfolio: PortifolioType };

export type SpacingTheme = Tables<'spacing_theme'>;
export type ColorTheme = Tables<'color_theme'>;
export type TypographyTheme = Tables<'typography_theme'>;
export type pageLayoutType = 'portrait' | 'landscape';

export type PageLayoutType = pageLayoutType;
