# 📊 Faturamento Anual

Aplicação que processa um arquivo JSON com registros diários de faturamento e exibe estatísticas do período.

## Funcionalidades

- Calcula o **menor** e o **maior** valor de faturamento do período
- Calcula a **média** dos dias com movimento (dias sem faturamento são ignorados)
- Conta quantos dias ficaram **acima da média**

## Estrutura do Projeto

```
├── index.js          # Ponto de entrada: carrega os dados e exibe os resultados
├── faturamento.js    # Lógica de negócio: cálculo das estatísticas
├── dados.json        # Arquivo de dados com os registros diários
└── package.json
```

### Responsabilidades por módulo

**`faturamento.js`** contém funções puras e independentes:

| Função | Responsabilidade |
|---|---|
| `extrairValoresValidos` | Filtra dias com `valor > 0` |
| `calcularValores` | Calcula mínimo, máximo e soma em uma única passagem |
| `contarValoresAcima` | Conta valores acima de um limite |
| `entradaEhValida` | Valida se a entrada é um array não vazio |
| `calcularEstatisticas` | Orquestra as funções e retorna o resultado |

**`index.js`** cuida apenas de I/O:

| Função | Responsabilidade |
|---|---|
| `carregarDados` | Lê e faz parse do arquivo JSON |
| `formatarMoeda` | Formata números como `R$ 1.234,56` |
| `exibirResultados` | Imprime os resultados no console |

## Formato dos Dados

O arquivo `dados.json` deve ser um array de objetos com os campos `dia` e `valor`. Dias sem faturamento (finais de semana, feriados) devem ter `valor: 0`.

```json
[
  { "dia": 1, "valor": 22174.16 },
  { "dia": 2, "valor": 24537.66 },
  { "dia": 3, "valor": 0.0 }
]
```

## Como Executar

**Pré-requisito:** Node.js v14 ou superior (o projeto usa ES Modules).

```bash
# Executar
node index.js
```

### Saída esperada

```
--- Resultados do Faturamento ---
Menor Valor:        R$ 373,78
Maior Valor:        R$ 46.251,17
Média:              R$ 20.200,38
Dias acima da média: 11
```
