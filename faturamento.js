/**
 * @typedef {{ dia: number, valor: number }} RegistroFaturamento
 * @typedef {{ menorValor: number, maiorValor: number, media: number, diasAcimaDaMedia: number }} EstatisticasFaturamento
 */

/**
 * Filtra apenas os dias com faturamento válido (valor > 0).
 * @param {RegistroFaturamento[]} registros
 * @returns {number[]}
 */
function extrairValoresValidos(registros) {
  return registros
    .map(({ valor }) => valor)
    .filter((valor) => valor > 0);
}

/**
 * Retorna o menor valor de um array de números.
 * @param {number[]} valores
 * @returns {number}
 */
function calcularMinimo(valores) {
  return Math.min(...valores);
}

/**
 * Retorna o maior valor de um array de números.
 * @param {number[]} valores
 * @returns {number}
 */
function calcularMaximo(valores) {
  return Math.max(...valores);
}

/**
 * Calcula a média aritmética de um array de números.
 * @param {number[]} valores
 * @returns {number}
 */
function calcularMedia(valores) {
  const soma = valores.reduce((acumulado, valor) => acumulado + valor, 0);
  return soma / valores.length;
}

/**
 * Conta quantos valores estão acima de um determinado limite.
 * @param {number[]} valores
 * @param {number} limite
 * @returns {number}
 */
function contarValoresAcimaDo(valores, limite) {
  return valores.filter((valor) => valor > limite).length;
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
 * Calcula as estatísticas de faturamento anual ignorando dias sem movimento.
 * @param {RegistroFaturamento[]} dados
 * @returns {EstatisticasFaturamento | null}
 */
export function calcularEstatisticas(dados) {
  if (!entradaEhValida(dados)) return null;

  const valoresValidos = extrairValoresValidos(dados);

  if (valoresValidos.length === 0) return null;

  const menorValor = calcularMinimo(valoresValidos);
  const maiorValor = calcularMaximo(valoresValidos);
  const media = calcularMedia(valoresValidos);
  const diasAcimaDaMedia = contarValoresAcimaDo(valoresValidos, media);

  return {
    menorValor,
    maiorValor,
    media,
    diasAcimaDaMedia,
  };
}
