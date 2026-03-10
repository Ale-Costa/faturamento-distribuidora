/**
 * @typedef {{ dia: number, valor: number }} RegistroFaturamento
 * @typedef {{ menorValor: number, maiorValor: number, media: number, diasAcimaDaMedia: number }} EstatisticasFaturamento
 */

/**
 * Calcula as estatísticas de faturamento anual ignorando dias sem movimento.
 * @param {RegistroFaturamento[]} dados
 * @returns {EstatisticasFaturamento | null}
 */
export function calcularEstatisticas(dados) {
  if (!entradaEhValida(dados)) return null;

  const valoresValidos = extrairValoresValidos(dados);
  if (valoresValidos.length === 0) return null;

  const { menorValor, maiorValor, soma } = calcularValores(valoresValidos);
  const media = soma / valoresValidos.length;
  const diasAcimaDaMedia = contarValoresAcima(valoresValidos, media);

  return {
    menorValor,
    maiorValor,
    media,
    diasAcimaDaMedia,
  };
}

/**
 * Valida se a entrada é um array não vazio de registros.
 * @param {unknown} dados
 * @returns {boolean}
 */
function entradaEhValida(dados) {
  return Array.isArray(dados) && dados.length > 0;
}

/**
 * Filtra apenas os dias com faturamento válido (valor > 0).
 * @param {RegistroFaturamento[]} registros
 * @returns {number[]}
 */
function extrairValoresValidos(registros) {
  return registros.map(({ valor }) => valor).filter((valor) => valor > 0);
}

/**
 * Calcula mínimo, máximo e soma em uma única passagem pelo array.
 * @param {number[]} valores
 * @returns {{ menorValor: number, maiorValor: number, soma: number }}
 */
function calcularValores(valores) {
  let menorValor = valores[0];
  let maiorValor = valores[0];
  let soma = 0;

  for (const valor of valores) {
    if (valor < menorValor) menorValor = valor;
    if (valor > maiorValor) maiorValor = valor;
    soma += valor;
  }

  return { menorValor, maiorValor, soma };
}

/**
 * Conta quantos valores estão acima de um determinado limite.
 * @param {number[]} valores
 * @param {number} limite
 * @returns {number}
 */
function contarValoresAcima(valores, limite) {
  return valores.filter((valor) => valor > limite).length;
}
