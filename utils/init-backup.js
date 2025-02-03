const { backupPrismicContent } = require('./prismic-backup');

backupPrismicContent()
  .then(() => {
    console.log('Backup completato con successo');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Errore durante il backup:', error);
    process.exit(1);
  });