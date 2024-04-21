const path = require('path');
// const sharp = require('sharp');
const Jimp = require('jimp');

class Resize {
    constructor(folder, userId) {
        this.folder = folder;
        this.userId = userId;
    }

    async save(buffer) {
        // console.log(typeof buffer, buffer);
        const filename = Resize.filename(this.userId);
        const filepath = this.filepath(filename);

        // await sharp(buffer)
        //     .resize(300, 300, {
        //         fit: sharp.fit.inside,
        //         withoutEnlargement: true
        //     })
        //     .toFile(filepath);

        return filename;
    }

    async saveFromFile(file) {
        const filename = Resize.filename(this.userId, file);
        const filepath = this.filepath(filename);

        // open a file called "lenna.png"
        Jimp.read(file, (err, result) => {
            if (err) throw err;
            result
                // .resize(300, 300) // resize
                .quality(80) // set JPEG quality
                // .greyscale() // set greyscale
                .write(filepath); // save
        });

        return filename;
    }

    static filename(fname, file) {
        return `${fname}${path.extname(file)}`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;