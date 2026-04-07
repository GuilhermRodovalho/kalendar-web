export type LiturgicalColor = 'white' | 'red' | 'purple' | 'green' | 'rose' | 'black';

export type Season =
  | 'advent'
  | 'christmas'
  | 'ordinary_time_i'
  | 'lent'
  | 'easter_triduum'
  | 'easter_season'
  | 'ordinary_time_ii';

export type CelebrationGrade =
  | 'Solemnity'
  | 'Feast'
  | 'Memorial'
  | 'Optional Memorial'
  | 'Commemoration';

export interface Preface {
  name: string;
  numeral?: string;
  page: number;
  subtitle?: string;
}

export interface CommonReference {
  name: string;
  page: number;
}

export interface Celebration {
  name: string;
  grade: CelebrationGrade;
  level: number;
  color: LiturgicalColor;
  is_feast_of_the_lord?: boolean;
  is_movable: boolean;
  missal_page?: number;
  prefaces?: Preface[];
  common_ref?: CommonReference;
}

export interface CalendarEntry {
  date: string;
  season: Season;
  season_color: LiturgicalColor;
  celebrations: Celebration[];
  season_missal_page?: number;
  season_prefaces?: Preface[];
}
