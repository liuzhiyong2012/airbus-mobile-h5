const fs = require('fs')
const archiver = require('archiver')
const path = require('path')

const targetSystem = process.argv.splice(2)[0]
if (!targetSystem) {
  throw new Error('please check BUILD_TARGET variable in env before run this script')
}
const targetFile = `${targetSystem}.zip`
fs.exists(targetFile, (exist) => {
  if (exist) {
    fs.unlinkSync(targetFile)
  }
})
const output = fs.createWriteStream(path.join(__dirname, targetFile))
const archive = archiver('zip', {
  zlib: { level: 9 }
})
archive.directory('dist/', false)

output.on('end', function() {
  console.log('pipe data end')
})
output.on('close', function() {
  console.log(`Build system: ${targetSystem} success.`)
})
archive.on('warning', function(err) {
  throw err
})
archive.on('error', function(err) {
  throw err
})

archive.pipe(output)
archive.finalize()
   