const conectaAPI = async () => {
  const conecta = await fetch(
    'https://economia.awesomeapi.com.br/last/JPY-BRL',
  );
  const conectaTraduzido = await conecta.json();
  postMessage(conectaTraduzido.JPYBRL);
};
addEventListener('message', () => {
  conectaAPI();
  setInterval(() => conectaAPI(), 5000);
});
