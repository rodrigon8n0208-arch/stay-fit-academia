// Conteúdo central do site. Dados confirmados no Instagram (@stay_fit_academia) e no site de
// matrícula da academia (stayfitacademia.sitesca.com) em 27/10/2026.
// O que falta confirmar está em PENDENCIAS.md.

export const SITE = {
  name: 'Stay Fit Academia',
  shortName: 'Stay Fit',
  tagline: 'Um estilo de vida.',
  description:
    'Stay Fit Academia em Satuba e Maceió (AL): musculação, FitDance, boxe, muay thai, funcional, GAP e mais. Duas unidades, Espaço Kids e matrícula online.',
  region: 'Satuba e Maceió',
  state: 'AL',
  email: 'academiastay.fit222@gmail.com',
  instagram: {
    handle: '@stay_fit_academia',
    url: 'https://www.instagram.com/stay_fit_academia/',
  },
  // Sistema de matrícula e painel do aluno que a academia já usa
  enrollUrl: 'https://stayfitacademia.sitesca.com/matricular',
  studentPanelUrl: 'https://stayfitacademia.sitesca.com/painel/login',
  whatsapp: {
    // Número da bio do Instagram (unidade Alegria)
    number: '5582988594034',
    defaultMessage: 'Olá! Vim pelo site e quero saber mais sobre a Stay Fit.',
  },
};

export function whatsappUrl(message: string = SITE.whatsapp.defaultMessage, number: string = SITE.whatsapp.number) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const mapsUrls = (query: string) => {
  const q = encodeURIComponent(query);
  return {
    embed: `https://www.google.com/maps?q=${q}&output=embed`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  };
};

export type ModalidadeId =
  | 'musculacao'
  | 'fitdance'
  | 'boxe'
  | 'muaythai'
  | 'gap'
  | 'funcional'
  | 'jump'
  | 'step'
  | 'ritbox';

export const UNITS = [
  {
    id: 'alegria',
    name: 'Stay Fit Alegria',
    short: 'Alegria',
    street: 'Rua G, 242 — Cond. Recanto da Alegria',
    district: 'Nova Satuba',
    city: 'Satuba',
    state: 'AL',
    postalCode: '57120-000',
    phone: '(82) 98859-4034',
    whatsapp: '5582988594034',
    maps: mapsUrls('Condomínio Recanto da Alegria, Rua G, 242, Nova Satuba, Satuba - AL, 57120-000'),
    modalidades: ['musculacao', 'fitdance', 'boxe', 'muaythai', 'gap', 'funcional'] as ModalidadeId[],
  },
  {
    id: 'graciliano',
    name: 'Stay Fit Graciliano',
    short: 'Graciliano',
    street: 'Rua Jeanette Carigé Pereira Lima, s/n',
    district: 'Graciliano Ramos (Cidade Universitária)',
    city: 'Maceió',
    state: 'AL',
    postalCode: '57073-197',
    phone: '(82) 99632-9374',
    whatsapp: '5582996329374',
    maps: mapsUrls('Rua Jeanette Carigé Pereira Lima, Graciliano Ramos, Maceió - AL, 57073-197'),
    modalidades: ['musculacao', 'fitdance', 'boxe', 'muaythai', 'gap', 'funcional', 'jump', 'step', 'ritbox'] as ModalidadeId[],
  },
] as const;

export type UnitId = (typeof UNITS)[number]['id'];

export const NAV = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Planos', href: '#planos' },
  { label: 'Unidades', href: '#unidades' },
];

// Frequências tiradas dos planos do site de matrícula (Alegria / Graciliano)
export const MODALIDADES: {
  id: ModalidadeId;
  name: string;
  kicker: string;
  text: string;
  slot: string;
  alt: string;
}[] = [
  {
    id: 'musculacao',
    name: 'Musculação',
    kicker: 'Todos os dias · nas duas unidades',
    text: 'Treino de força para ganhar disposição, saúde e resultado, no seu ritmo, todos os dias.',
    slot: 'modalidade-musculacao',
    alt: 'Pessoa treinando musculação com halteres',
  },
  {
    id: 'fitdance',
    name: 'FitDance',
    kicker: 'Até 3x por semana · nas duas unidades',
    text: 'Coreografias animadas para queimar calorias dançando. Energia lá em cima do começo ao fim.',
    slot: 'modalidade-fitdance',
    alt: 'Aula de FitDance em grupo',
  },
  {
    id: 'boxe',
    name: 'Boxe',
    kicker: '2x por semana · nas duas unidades',
    text: 'Técnica, condicionamento e muito suor. Ótimo para aliviar o estresse e ganhar resistência.',
    slot: 'modalidade-boxe',
    alt: 'Aula de boxe com luvas e saco de pancada',
  },
  {
    id: 'muaythai',
    name: 'Muay Thai',
    kicker: 'Até 2x por semana · nas duas unidades',
    text: 'A arte das oito armas: socos, chutes, joelhadas e cotoveladas para um treino completo.',
    slot: 'modalidade-muaythai',
    alt: 'Treino de muay thai com aparador de chutes',
  },
  {
    id: 'gap',
    name: 'GAP',
    kicker: '2x por semana · nas duas unidades',
    text: 'Glúteos, abdômen e pernas: aula focada para fortalecer e definir o corpo.',
    slot: 'modalidade-gap',
    alt: 'Aula de GAP com exercícios para glúteos e pernas',
  },
  {
    id: 'funcional',
    name: 'Funcional',
    kicker: 'Até 2x por semana · nas duas unidades',
    text: 'Movimentos do dia a dia com peso do corpo e acessórios para ganhar força, agilidade e equilíbrio.',
    slot: 'modalidade-funcional',
    alt: 'Treino funcional com cordas navais e kettlebells',
  },
  {
    id: 'jump',
    name: 'Jump',
    kicker: '1x por semana · unidade Graciliano',
    text: 'Treino no mini trampolim, intenso e divertido, para acelerar o coração.',
    slot: 'modalidade-jump',
    alt: 'Aula de jump com mini trampolins',
  },
  {
    id: 'step',
    name: 'Step',
    kicker: '2x por semana · unidade Graciliano',
    text: 'Aula aeróbica na plataforma para trabalhar condicionamento, ritmo e coordenação.',
    slot: 'modalidade-step',
    alt: 'Aula de step com plataformas',
  },
  {
    id: 'ritbox',
    name: 'Ritbox',
    kicker: '2x por semana · unidade Graciliano',
    text: 'Golpes de luta no ritmo da música: um aeróbico intenso que mistura dança e combate.',
    slot: 'modalidade-ritbox',
    alt: 'Aula de ritbox com golpes no ritmo da música',
  },
];

export const modalidadeName = (id: ModalidadeId) => MODALIDADES.find((m) => m.id === id)!.name;

// Planos publicados no site de matrícula (valores "a partir de"). [CONFIRMAR] se seguem válidos.
export type Plan = {
  name: string;
  price: number;
  period: string;
  text: string;
  includes: string[];
  badge?: string;
  featured?: boolean;
};

export type PlanExtra = { name: string; price: number; period: string; note?: string };

export const PLANS: Record<UnitId, { featured: Plan[]; extras: PlanExtra[] }> = {
  alegria: {
    featured: [
      {
        name: 'Musculação',
        price: 79.9,
        period: '/mês',
        text: 'Acesso à musculação todos os dias.',
        includes: ['Musculação todos os dias'],
      },
      {
        name: 'Musculação Premium',
        price: 105,
        period: '/mês',
        text: 'Musculação + todas as modalidades da unidade.',
        includes: ['Musculação todos os dias', 'Boxe, FitDance, GAP e Funcional (2x/sem)', 'Muay Thai (1x/sem)'],
        badge: 'Mais completo',
        featured: true,
      },
      {
        name: 'Musculação Familiar',
        price: 74.9,
        period: '/mês',
        text: 'Plano para treinar em família.',
        includes: ['Musculação todos os dias', 'Valor para família'],
      },
    ],
    extras: [
      { name: 'Musculação bimestral', price: 159.8, period: '2 meses' },
      { name: 'Musculação trimestral', price: 237, period: '3 meses' },
      { name: 'Musculação 4 meses', price: 479.9, period: '4 meses' },
      { name: 'Musculação anual à vista', price: 720, period: 'ano' },
      { name: 'Musculação anual no cartão', price: 780, period: 'ano' },
      { name: 'Personal', price: 100, period: 'mês' },
      { name: 'Boxe, FitDance ou GAP (2x/sem)', price: 40, period: 'mês', note: 'cada modalidade' },
      { name: 'Muay Thai (1x/sem)', price: 40, period: 'mês' },
    ],
  },
  graciliano: {
    featured: [
      {
        name: 'Musculação Individual',
        price: 79.9,
        period: '/mês',
        text: 'Acesso à musculação todos os dias.',
        includes: ['Musculação todos os dias'],
      },
      {
        name: 'Plano Premium',
        price: 105,
        period: '/mês',
        text: 'Musculação + todas as 9 modalidades da unidade.',
        includes: ['Musculação todos os dias', 'FitDance (3x/sem), Boxe, GAP, Muay Thai, Step e Ritbox (2x/sem)', 'Funcional e Jump (1x/sem)'],
        badge: 'Mais completo',
        featured: true,
      },
      {
        name: 'Família Musculação',
        price: 74.9,
        period: '/mês',
        text: 'Plano para treinar em família.',
        includes: ['Musculação todos os dias', 'Valor para família'],
      },
    ],
    extras: [
      { name: 'Plano Ouro (todas as modalidades)', price: 139, period: 'mês' },
      { name: 'Musculação bimestral', price: 159.8, period: '2 meses' },
      { name: 'Musculação trimestral', price: 239.7, period: '3 meses' },
      { name: 'Musculação anual à vista', price: 720, period: 'ano' },
      { name: 'Musculação anual no cartão', price: 780, period: 'ano' },
      { name: 'Boxe, FitDance, Funcional, GAP ou Muay Thai', price: 50, period: 'mês', note: 'cada modalidade' },
    ],
  },
};

export function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const DIFERENCIAIS = [
  {
    title: 'Espaço Kids',
    text: 'Enquanto você treina, seu filho fica em um ambiente seguro, organizado e pensado especialmente para ele.',
  },
  {
    title: 'Duas unidades',
    text: 'Nova Satuba e Graciliano Ramos: escolha a unidade que fica mais perto da sua rotina.',
  },
  {
    title: 'Matrícula online',
    text: 'Escolha o plano e matricule-se pelo site. Depois, acompanhe tudo pelo Painel do Aluno.',
  },
];

export const DESTAQUES = [
  { value: 2, prefix: '', suffix: '', label: 'unidades em Satuba e Maceió' },
  { value: 9, prefix: '', suffix: '', label: 'modalidades além da musculação' },
  { value: 10, prefix: '+', suffix: ' mil', label: 'seguidores acompanhando no Instagram' },
  { value: 79, prefix: 'R$ ', suffix: ',90', label: 'por mês na musculação (a partir de)' },
];

export const FAQ = [
  {
    q: 'Quais modalidades a Stay Fit oferece?',
    a: 'Musculação, FitDance, Boxe, Muay Thai, GAP e Funcional nas duas unidades. Na unidade Graciliano também tem Jump, Step e Ritbox.',
  },
  {
    q: 'Onde ficam as unidades?',
    a: 'A Stay Fit Alegria fica na Rua G, 242, no Condomínio Recanto da Alegria, em Nova Satuba (Satuba). A Stay Fit Graciliano fica na Rua Jeanette Carigé Pereira Lima, no Graciliano Ramos (Cidade Universitária), em Maceió.',
  },
  {
    q: 'Posso fazer a matrícula pela internet?',
    a: 'Pode. É só escolher a unidade e o plano no nosso sistema de matrícula online. Se preferir, chame a gente no WhatsApp que a equipe te ajuda.',
  },
  {
    q: 'Tem lugar para deixar as crianças?',
    a: 'Tem. A Stay Fit conta com um Espaço Kids, um ambiente seguro e organizado para as crianças enquanto você treina.',
  },
  {
    q: 'Tem plano família?',
    a: 'Tem. Nas duas unidades existe plano de musculação para família, a partir de R$ 74,90 por mês.',
  },
  {
    q: 'Qual plano dá acesso a todas as aulas?',
    a: 'O plano Premium (a partir de R$ 105,00 por mês) inclui a musculação e todas as modalidades da unidade. Também dá para contratar uma modalidade avulsa.',
  },
];

// Reels reais do Instagram usados no "feed" (imagens em src/assets/img/feed-*.jpg)
export const FEED = [
  { image: 'feed-fitdance', url: 'https://www.instagram.com/stay_fit_academia/reel/De4kuoCJZPn/', alt: 'Turma dançando em aula na Stay Fit, com luzes hexagonais no teto' },
  { image: 'feed-biceps', url: 'https://www.instagram.com/stay_fit_academia/reel/DecnZsKJ12-/', alt: 'Reel de humor: bíceps e tríceps em grupo quando a academia está lotada' },
  { image: 'feed-converter', url: 'https://www.instagram.com/stay_fit_academia/reel/Dexaqa9pmfM/', alt: 'Alunas treinando na estrutura amarela da academia' },
  { image: 'feed-espaco-kids', url: 'https://www.instagram.com/stay_fit_academia/reel/DTtvjbgjF0v/', alt: 'Novidade: Espaço Kids da Stay Fit' },
  { image: 'feed-promocao', url: 'https://www.instagram.com/stay_fit_academia/reel/Deo93xlpRUC/', alt: 'Reel da promoção de indicação da Stay Fit' },
  { image: 'feed-cabelo-maluco', url: 'https://www.instagram.com/stay_fit_academia/reel/DejQOK1JeJV/', alt: 'Desafio do cabelo maluco na Stay Fit' },
];

export const MARQUEE_WORDS = ['Força', 'Foco', 'Energia', 'Saúde', 'Disciplina', 'Estilo de vida'];
