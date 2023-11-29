const fs=require('fs')
function saveToJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON file:', err)
      } else {
        console.log(`Data saved to ${filePath}`)
      }
    })
  }

module.exports =saveToJson