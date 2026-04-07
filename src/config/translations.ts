import type { Season, CelebrationGrade, LiturgicalColor } from '../types/api.ts';

export const seasonNames: Record<Season, string> = {
  advent: 'Advento',
  christmas: 'Natal',
  ordinary_time_i: 'Tempo Comum I',
  lent: 'Quaresma',
  easter_triduum: 'Tríduo Pascal',
  easter_season: 'Tempo Pascal',
  ordinary_time_ii: 'Tempo Comum II',
};

export const gradeNames: Record<CelebrationGrade, string> = {
  Solemnity: 'Solenidade',
  Feast: 'Festa',
  Memorial: 'Memória',
  'Optional Memorial': 'Memória Facultativa',
  Commemoration: 'Comemoração',
};

export const colorNames: Record<LiturgicalColor, string> = {
  white: 'Branco',
  red: 'Vermelho',
  purple: 'Roxo',
  green: 'Verde',
  rose: 'Rosa',
  black: 'Preto',
};

export const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

export const weekdayFullNames = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado',
] as const;

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
] as const;
