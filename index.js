import { readFile } from 'fs/promises';
import { calcularEstatisticas } from './faturamento.js';

const CAMINHO_DADOS = './dados.json';

/**
 * Lê e faz o parse do arquivo JSON de faturamento.
 * @param {string} caminho
 * @returns {Promise<Array>}
 */
async function carregarDados(caminho) {
  const conteudo = await readFile(caminho, 'utf-8');
  return JSON.parse(conteudo);
}

/**
 * Formata um número como moeda brasileira (R$).
 * @param {number} valor
 * @returns {string}
 */
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/**
 * Exibe os resultados das estatísticas no console.
 * @param {import('./faturamento.js').EstatisticasFaturamento} resultados
 */
function exibirResultados(resultados) {
  console.log('\n--- Resultados do Faturamento ---');
  console.log(`Menor Valor:        ${formatarMoeda(resultados.menorValor)}`);
  console.log(`Maior Valor:        ${formatarMoeda(resultados.maiorValor)}`);
  console.log(`Média:              ${formatarMoeda(resultados.media)}`);
  console.log(`Dias acima da média: ${resultados.diasAcimaDaMedia}`);
}

/**
 * Ponto de entrada da aplicação.
 */
async function main() {
  try {
    const dados = await carregarDados(CAMINHO_DADOS);
    const resultados = calcularEstatisticas(dados);

    if (!resultados) {
      console.warn('Nenhum dado de faturamento válido encontrado.');
      return;
    }

    exibirResultados(resultados);
  } catch (error) {
    console.error('Erro ao processar dados:', error.message);
    process.exit(1);
  }
}

main();
