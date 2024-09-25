import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, './public/images'),
  filename: (req, file, callback) =>
    callback(null, `${Date.now().toString()}.${file.mimetype.split('/')[1]}`),
})

export default multer({ storage }).single('attachment')
