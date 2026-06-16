const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[AuraClinic Backend] Server listening on port ${PORT}`);
});
