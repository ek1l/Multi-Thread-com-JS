import selecionaCotacao from './imprimeCotação.js';

const graficoDolar = document.querySelector('#graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Dólar',
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

const geraHorario = () => {
  let data = new Date();
  let horario = `${data.getHours()} : ${data.getMinutes()} : ${data.getSeconds()}`;
  return horario;
};

const adicionarDados = (grafico, legenda, dados) => {
  grafico.data.labels.push(legenda);
  grafico.data.datasets.forEach((dataset) => {
    dataset.data.push(dados);
  });
  grafico.update();
};

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');
workerDolar.addEventListener('message', (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  selecionaCotacao('dolar', valor);
  adicionarDados(graficoParaDolar, tempo, valor);
});

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Iene',
        data: [],
        borderWidth: 1,
      },
    ],
  },
});

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');
workerIene.addEventListener('message', (event) => {
  let tempo = geraHorario();
  let valor = event.data.ask;
  adicionarDados(graficoParaIene, tempo, valor);
  selecionaCotacao('Iene', valor);
});
