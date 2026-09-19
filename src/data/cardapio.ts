// Cardápio da loja. Regras:
// - Sem preço. Nunca.
// - status 'confirmado': a loja tem (visto nas fotos reais ou confirmado pela família).
//   status 'revisar': presumido. Só aparece em /cardapio/revisar até a família confirmar.
// - foto: caminho dentro de src/assets, sem extensão. ilustrativa: true quando a foto é
//   de banco de imagem (Unsplash) e não do produto da loja. Trocar pela real quando houver.

export type Status = 'confirmado' | 'revisar';
export type Item = {
  nome: string;
  descricao?: string;
  foto?: string;
  ilustrativa?: boolean;
  feitoAqui?: boolean;
  status: Status;
};
export type Grupo = {
  id: string;
  titulo: string;
  resumo: string;
  capa: string;
  destaque?: boolean;
  itens: Item[];
};

const ok = 'confirmado' as const;
const rev = 'revisar' as const;

export const cardapio: Grupo[] = [
  {
    id: 'padaria',
    titulo: 'Padaria',
    resumo: 'Pão quentinho da padaria do João e da Renata.',
    capa: 'vitrine',
    itens: [
      { nome: 'Pão francês', descricao: 'Casquinha crocante, do jeito que tem que ser.', feitoAqui: true, status: ok },
      { nome: 'Pão de batata', descricao: 'Massa macia, com recheio de frango ou peito de peru.', status: ok },
      { nome: 'Baguete recheada', descricao: 'Baguete assada com recheio, boa para o lanche.', foto: 'cardapio/baguete-recheada', status: ok },
      { nome: 'Pão de frios', descricao: 'Pão recheado com frios, sai da vitrine direto para a mesa.', foto: 'cardapio/pao-de-frios', status: ok },
      { nome: 'Pão de forma', descricao: 'Pacote fechado para o café da manhã da semana.', status: ok },
      { nome: 'Pão doce', descricao: 'Massa fofinha com cobertura doce.', status: rev },
      { nome: 'Pão de queijo', descricao: 'Mineirinho, sai quentinho.', status: rev },
      { nome: 'Pão de leite', descricao: 'Macio, bom para criança levar para a escola.', status: rev },
    ],
  },
  {
    id: 'salgados',
    titulo: 'Salgados',
    resumo: 'Para o lanche da tarde ou para levar.',
    capa: 'vitrine',
    itens: [
      { nome: 'Coxinha', descricao: 'Massa dourada e recheio de frango.', status: ok },
      { nome: 'Esfiha', descricao: 'Aberta, de carne.', status: rev },
      { nome: 'Enroladinho de salsicha', descricao: 'Massa de pão envolvendo a salsicha.', status: rev },
      { nome: 'Empada', descricao: 'Massa podre com recheio cremoso.', status: rev },
    ],
  },
  {
    id: 'bolos',
    titulo: 'Bolos e doces da Renata',
    resumo: 'Receita de confeiteira. Aceitamos encomenda para aniversário e festa.',
    capa: 'bolo-morango',
    destaque: true,
    itens: [
      { nome: 'Bolo de chocolate com morango', descricao: 'Recheio e cobertura de chocolate, morangos frescos e granulado.', foto: 'bolo-morango', feitoAqui: true, status: ok },
      { nome: 'Bolo de limão', descricao: 'Massa amanteigada com cobertura branca e raspas de limão.', foto: 'bolo-limao', feitoAqui: true, status: ok },
      { nome: 'Bolo de laranja', descricao: 'Massa úmida com calda de laranja.', foto: 'cardapio/bolo-laranja', feitoAqui: true, status: ok },
      { nome: 'Bolo caseiro', descricao: 'Bolo simples com açúcar por cima, para o café.', foto: 'cardapio/bolo-caseiro', feitoAqui: true, status: ok },
      { nome: 'Bolo de chocolate', descricao: 'Chocolate de verdade, com calda.', foto: 'cardapio/bolo-chocolate', ilustrativa: true, feitoAqui: true, status: ok },
      { nome: 'Sonho', descricao: 'Recheado e passado no açúcar.', foto: 'cardapio/sonho', status: ok },
      { nome: 'Rosquinha de chocolate', descricao: 'Coberta de chocolate.', status: ok },
      { nome: 'Bolo de cenoura com chocolate', descricao: 'Com cobertura de chocolate.', feitoAqui: true, status: rev },
      { nome: 'Bolo de fubá', descricao: 'O clássico do café da tarde.', feitoAqui: true, status: rev },
      { nome: 'Pudim', descricao: 'De leite condensado, com calda de caramelo.', feitoAqui: true, status: rev },
      { nome: 'Brigadeiro', descricao: 'Por unidade ou cento, para festa.', feitoAqui: true, status: rev },
    ],
  },
  {
    id: 'hortifruti',
    titulo: 'Hortifrúti',
    resumo: 'Escolhido pelo João. Muda conforme a semana.',
    capa: 'hortifruti',
    itens: [
      { nome: 'Banana', foto: 'cardapio/banana', ilustrativa: true, status: ok },
      { nome: 'Tomate', foto: 'cardapio/tomate', ilustrativa: true, status: ok },
      { nome: 'Cebola', foto: 'cardapio/cebola', ilustrativa: true, status: ok },
      { nome: 'Alho', foto: 'cardapio/alho', ilustrativa: true, status: ok },
      { nome: 'Limão', foto: 'cardapio/limao', ilustrativa: true, status: ok },
      { nome: 'Batata-doce', foto: 'cardapio/batata-doce', ilustrativa: true, status: ok },
      { nome: 'Abóbora', foto: 'cardapio/abobora', ilustrativa: true, status: ok },
      { nome: 'Ovos', foto: 'cardapio/ovos', ilustrativa: true, status: ok },
      { nome: 'Batata', status: rev },
      { nome: 'Laranja', status: rev },
      { nome: 'Maçã', status: rev },
    ],
  },
  {
    id: 'bebidas',
    titulo: 'Bebidas geladas',
    resumo: 'Direto da geladeira.',
    capa: 'bebidas',
    itens: [
      { nome: 'Refrigerantes', descricao: 'Garrafa de 2 litros e lata.', status: ok },
      { nome: 'Água mineral', descricao: 'Com e sem gás.', foto: 'cardapio/agua', ilustrativa: true, status: ok },
      { nome: 'Sucos de caixinha', status: ok },
      { nome: 'Energéticos', status: ok },
      { nome: 'Sorvetes e picolés', status: ok },
    ],
  },
  {
    id: 'frios',
    titulo: 'Frios, congelados e laticínios',
    resumo: 'Da geladeira e do freezer.',
    capa: 'mercearia',
    itens: [
      { nome: 'Congelados Perdigão', status: ok },
      { nome: 'Leite de caixinha', status: ok },
      { nome: 'Leite em pó', status: ok },
      { nome: 'Presunto e mussarela', status: rev },
      { nome: 'Mortadela', status: rev },
      { nome: 'Manteiga e margarina', status: rev },
      { nome: 'Requeijão', status: rev },
      { nome: 'Iogurte', status: rev },
    ],
  },
  {
    id: 'mercearia',
    titulo: 'Mercearia',
    resumo: 'O básico da despensa, pertinho de casa.',
    capa: 'mercearia',
    itens: [
      { nome: 'Café', foto: 'cardapio/cafe', ilustrativa: true, status: ok },
      { nome: 'Macarrão e macarrão instantâneo', foto: 'cardapio/macarrao', ilustrativa: true, status: ok },
      { nome: 'Molho de tomate', status: ok },
      { nome: 'Óleo', status: ok },
      { nome: 'Maionese', status: ok },
      { nome: 'Temperos e caldos', status: ok },
      { nome: 'Achocolatado', status: ok },
      { nome: 'Biscoitos recheados e cookies', foto: 'cardapio/biscoitos', ilustrativa: true, status: ok },
      { nome: 'Salgadinhos e batata palha', status: ok },
      { nome: 'Chocolates', status: ok },
      { nome: 'Balas', status: ok },
      { nome: 'Panetone', descricao: 'Na época do Natal.', status: ok },
      { nome: 'Arroz', status: rev },
      { nome: 'Feijão', status: rev },
      { nome: 'Açúcar', status: rev },
      { nome: 'Sal', status: rev },
      { nome: 'Farinha de trigo', status: rev },
    ],
  },
  {
    id: 'limpeza',
    titulo: 'Limpeza',
    resumo: 'Para a casa e para a roupa.',
    capa: 'cardapio/limpeza',
    itens: [
      { nome: 'Sabão em pó', status: ok },
      { nome: 'Amaciante', status: ok },
      { nome: 'Detergente', status: ok },
      { nome: 'Água sanitária', status: ok },
      { nome: 'Desinfetante', status: ok },
      { nome: 'Esponja', status: rev },
      { nome: 'Saco de lixo', status: rev },
      { nome: 'Sabão em barra', status: rev },
    ],
  },
  {
    id: 'higiene',
    titulo: 'Higiene',
    resumo: 'O que acabou no banheiro.',
    capa: 'cardapio/papel-higienico',
    itens: [
      { nome: 'Papel higiênico', status: ok },
      { nome: 'Shampoo e condicionador', status: ok },
      { nome: 'Desodorante', status: ok },
      { nome: 'Sabonete', status: rev },
      { nome: 'Creme dental', status: rev },
      { nome: 'Absorvente', status: rev },
    ],
  },
  {
    id: 'utilidades',
    titulo: 'Utilidades',
    resumo: 'Aquela coisa que você não esperava achar na mercearia.',
    capa: 'cardapio/fita-isolante',
    itens: [
      { nome: 'Fita isolante', status: ok },
      { nome: 'Conexões hidráulicas', descricao: 'Joelho e outras peças para encanamento.', status: ok },
      { nome: 'Pilhas', status: rev },
      { nome: 'Lâmpadas', status: rev },
      { nome: 'Isqueiro e fósforo', status: rev },
    ],
  },
];

// Grupos só com o que já está confirmado (o que vai para o ar)
export const cardapioPublico: Grupo[] = cardapio
  .map((g) => ({ ...g, itens: g.itens.filter((i) => i.status === 'confirmado') }))
  .filter((g) => g.itens.length > 0);

// Fotos de capa que são de banco de imagem
export const capasIlustrativas = new Set(['cardapio/limpeza', 'cardapio/papel-higienico', 'cardapio/fita-isolante']);
