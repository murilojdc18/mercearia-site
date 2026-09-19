// Dados estruturados (schema.org) para o Google entender a loja e o cardápio.
import { loja, semana, feriados } from './loja';
import { cardapioPublico } from './cardapio';
import { absoluta } from './url';

const nomesDia = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const hora = (h: number) => `${String(h).padStart(2, '0')}:00`;

export function schemaLoja(site: URL) {
  const url = absoluta('/', site);
  return {
    '@context': 'https://schema.org',
    '@type': ['GroceryStore', 'Bakery'],
    '@id': `${url}#loja`,
    name: loja.nome,
    description: 'Mercearia e padaria de família no Jardim Tupã, em Barueri. Pão quentinho, bolos caseiros, hortifrúti e itens do dia a dia.',
    url,
    image: absoluta('/og.jpg', site),
    logo: absoluta('/favicon.svg', site),
    telephone: loja.telefoneSchema,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loja.endereco.rua,
      addressLocality: loja.endereco.cidade,
      addressRegion: loja.endereco.uf,
      postalCode: loja.endereco.cep,
      addressCountry: 'BR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: loja.geo.lat, longitude: loja.geo.lng },
    hasMap: loja.links.mapa,
    openingHoursSpecification: semana.map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: nomesDia[d.dia],
      opens: hora(d.abre),
      closes: hora(d.fecha),
    })),
    specialOpeningHoursSpecification: feriados.map((f) => ({
      '@type': 'OpeningHoursSpecification',
      validFrom: f.data,
      validThrough: f.data,
      opens: hora(f.abre),
      closes: hora(f.fecha),
    })),
    paymentAccepted: 'Pix, Dinheiro, Cartão de débito, Cartão de crédito',
    currenciesAccepted: 'BRL',
    hasMenu: absoluta('/cardapio/', site),
    sameAs: [loja.links.instagram],
  };
}

export function schemaCardapio(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `Cardápio da ${loja.nome}`,
    url: absoluta('/cardapio/', site),
    inLanguage: 'pt-BR',
    hasMenuSection: cardapioPublico.map((g) => ({
      '@type': 'MenuSection',
      name: g.titulo,
      description: g.resumo,
      hasMenuItem: g.itens.map((i) => ({
        '@type': 'MenuItem',
        name: i.nome,
        ...(i.descricao ? { description: i.descricao } : {}),
      })),
    })),
  };
}
