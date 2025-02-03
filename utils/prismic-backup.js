const prismic = require('@prismicio/client')
const fs = require('fs/promises')
const path = require('path')
const { format } = require('date-fns')
const sm = require('../slicemachine.config.json')

async function backupPrismicContent() {
  try {
    const client = prismic.createClient(sm.repositoryName)
    const currentDate = new Date()
    const dateString = format(currentDate, 'yyyy-MM-dd')
    const timestamp = format(currentDate, 'yyyy-MM-dd-HH-mm-ss')
    const backupDir = path.join(process.cwd(), 'prismic-backups')
    
    // Create backup directory if it doesn't exist
    await fs.mkdir(backupDir, { recursive: true })
    
    // Check for existing backup with the same date and delete it
    const files = await fs.readdir(backupDir)
    const existingBackup = files.find(file => file.startsWith(`backup-${dateString}`))
    if (existingBackup) {
      await fs.unlink(path.join(backupDir, existingBackup))
      console.log(`Deleted existing backup: ${existingBackup}`)
    }
    
    // Retrieve all available document types
    const allContent = await client.dangerouslyGetAll()
    
    // Create the backup file
    const backupPath = path.join(backupDir, `backup-${timestamp}.json`)
    await fs.writeFile(
      backupPath,
      JSON.stringify({
        timestamp,
        content: allContent
      }, null, 2)
    )
    
    // Keep only the latest 5 backups
    const updatedFiles = await fs.readdir(backupDir)
    if (updatedFiles.length > 5) {
      const oldestFiles = updatedFiles
        .sort()
        .slice(0, updatedFiles.length - 5)
      
      for (const file of oldestFiles) {
        await fs.unlink(path.join(backupDir, file))
      }
    }
    
    console.log(`✅ Backup completed: ${backupPath}`)
    return backupPath
    
  } catch (error) {
    console.error('❌ Error during backup:', error)
    throw error
  }
}

module.exports = { backupPrismicContent }