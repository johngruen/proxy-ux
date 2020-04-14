const server = require('server');
const { get } = server.router;
const { render } = server.reply;

server(async () => {
  return render('popup.pug', {});
});