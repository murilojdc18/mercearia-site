// Dados da loja num lugar só: todas as páginas leem daqui.
// Devem bater com o Perfil da Empresa no Google (mesmo nome, endereço e telefone).

const telefone = '5511972080503';

export const whats = (mensagem: string) =>
  `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

const enderecoBusca = 'Mercearia Guimarães Rosa, Rua Guimarães Rosa 465, Barueri SP';

// Dias no padrão do JavaScript (0 = domingo) para o "aberto agora"
export const semana = [
  { dia: 0, nome: 'Domingo', abre: 7, fecha: 14 },
  { dia: 1, nome: 'Segunda', abre: 7, fecha: 20 },
  { dia: 2, nome: 'Terça', abre: 7, fecha: 20 },
  { dia: 3, nome: 'Quarta', abre: 7, fecha: 20 },
  { dia: 4, nome: 'Quinta', abre: 7, fecha: 20 },
  { dia: 5, nome: 'Sexta', abre: 7, fecha: 20 },
  { dia: 6, nome: 'Sábado', abre: 7, fecha: 20 },
];

// Feriados cadastrados no Perfil da Empresa, com horário de domingo
export const feriados = [
  { data: '2026-10-12', nome: 'Nossa Senhora Aparecida', abre: 7, fecha: 14 },
  { data: '2026-11-02', nome: 'Finados', abre: 7, fecha: 14 },
  { data: '2026-11-15', nome: 'Proclamação da República', abre: 7, fecha: 14 },
  { data: '2026-11-20', nome: 'Consciência Negra', abre: 7, fecha: 14 },
];

export const loja = {
  nome: 'Mercearia Guimarães Rosa',
  telefoneExibicao: '(11) 97208-0503',
  telefoneSchema: '+55-11-97208-0503',
  endereco: {
    rua: 'Rua Guimarães Rosa, 465',
    bairro: 'Jardim Tupã',
    cidade: 'Barueri',
    uf: 'SP',
    // Conferir nos Correios: o OpenStreetMap dá 06435-350 para este trecho da rua
    cep: '06435-000',
  },
  // Aproximado (trecho da rua no OpenStreetMap). Conferir com o pino do Google Maps.
  geo: { lat: -23.5294663, lng: -46.8844014 },
  resumoHorario: [
    { dias: 'Segunda a sábado', horas: '7h às 20h' },
    { dias: 'Domingo e feriados', horas: '7h às 14h' },
  ],
  pagamentos: ['Pix', 'dinheiro', 'cartão de débito', 'cartão de crédito'],
  links: {
    whats: whats('Olá! Vim pelo site da Mercearia Guimarães Rosa.'),
    whatsInstagram: whats('Olá! Vim pelo Instagram da Mercearia Guimarães Rosa.'),
    whatsBolo: whats('Olá! Queria encomendar um bolo.'),
    whatsCardapio: whats('Olá! Vi o cardápio e queria saber se tem: '),
    rota: 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(enderecoBusca),
    waze: 'https://waze.com/ul?navigate=yes&q=' + encodeURIComponent('Rua Guimarães Rosa 465, Barueri'),
    mapa: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(enderecoBusca),
    mapaEmbed: 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(enderecoBusca),
    instagram: 'https://www.instagram.com/mercearia_guimaraesrosa1/',
    // Trocar pelo link oficial "Receber avaliações" do Perfil da Empresa
    avaliar: 'https://www.google.com/search?q=' + encodeURIComponent('Mercearia Guimarães Rosa Barueri'),
  },
};

export const enderecoCompleto =
  `${loja.endereco.rua}, ${loja.endereco.bairro}, ${loja.endereco.cidade}, ${loja.endereco.uf}, ${loja.endereco.cep}`;
