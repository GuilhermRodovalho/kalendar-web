# Kalendar Web

Disclaimer: a maior parte do código desse respositório foi escrita por LLM. Tenha isso em mente.

Frontend do calendário litúrgico católico romano, baseado no Missale Romanum (3ª edição). Exibe o calendário com as celebrações, cores litúrgicas, temporadas, referências ao Missal e prefácios para cada dia do ano.

## Funcionalidades

- **Visualização mensal e semanal** do calendário litúrgico com navegação entre meses/anos
- **Detalhes do dia** com celebrações, graus (Solenidade, Festa, Memória...), cores litúrgicas e indicadores de celebração móvel/festa do Senhor
- **Referências ao Missal** — página do Missal, prefácios litúrgicos e referências ao Comum dos Santos
- **Próprio do Tempo** — informações da temporada litúrgica (página do Missal e prefácios) como fallback
- **Tema claro/escuro** com detecção automática da preferência do sistema e persistência via localStorage
- **Cores litúrgicas dinâmicas** — interface adapta-se visualmente à cor da celebração do dia (branco, vermelho, roxo, verde, rosa, preto)
- **Responsivo** e com suporte a navegação por teclado

## Tech Stack

- [React](https://react.dev) 19 + [TypeScript](https://www.typescriptlang.org) 5.9
- [Vite](https://vite.dev) 8 (dev server e build)
- [Tailwind CSS](https://tailwindcss.com) 4
- [React Router](https://reactrouter.com) 7
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)

## Pré-requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
git clone https://github.com/guilhermerodovalho/kalendar-web.git
cd kalendar-web
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Variáveis de ambiente:

| Variável | Descrição | Padrão |
|---|---|---|
| `VITE_API_BASE_URL` | URL base da API do Kalendar | `https://kalendar.guilhermerodovalho.com` |

## Uso

```bash
# Servidor de desenvolvimento com HMR
npm run dev

# Build de produção (type-check + bundle)
npm run build

# Preview do build de produção
npm run preview
```

## Testes

```bash
# Executar testes
npm test

# Modo watch
npm run test:watch

# Cobertura
npm run coverage
```

## Lint

```bash
npm run lint
```

## Estrutura do projeto

```
src/
├── components/     # Componentes React reutilizáveis
├── config/         # Cores litúrgicas e traduções (pt-BR)
├── context/        # ThemeContext (claro/escuro)
├── hooks/          # useCalendar, useCalendarDay, useTheme
├── pages/          # CalendarPage e DayDetailPage
├── types/          # Tipos da API (CalendarEntry, Celebration, Preface...)
└── utils/          # Utilitários de data
```

## API

A aplicação consome a API REST do [Kalendar](https://github.com/guilhermerodovalho/kalendar):

| Endpoint | Descrição |
|---|---|
| `GET /calendar/{year}` | Todas as entradas do ano |
| `GET /calendar/{year}/{month}/{day}` | Entrada de um dia específico |

## Rotas

| Rota | Página |
|---|---|
| `/` | Redireciona para o mês atual |
| `/calendar/:year/:month` | Calendário mensal (ou semanal via `?view=weekly`) |
| `/calendar/:year/:month/:day/details` | Detalhes do dia |
