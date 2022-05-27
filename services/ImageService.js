const { publitioApi } = require('publitio_js_sdk');
const publitio = new publitioApi('zj4SSvwsZ3QAQ0xJwHeM', 'imD4PJemG5z4kMl23f6MzZzJbsoRPw1c')

class ImageService {
    static async uploadImage(file) {
        if(!file){
            throw Error('No file found for the request given.');
        }
        
        const image = await publitio.uploadFile(file.buffer, 'file');
        
        const image1 = await publitio.call(`/files/update/${image.id}`, 'PUT', {
            folder: 'ulR6MvlG'
        });

        const { id, url_preview, url_thumbnail, url_short } = image1;

        return { id, url_preview, url_thumbnail, url_short };
    }

    static async uploadImageByURL(file) {
        if(!file){
            throw Error('No file found for the request given.');
        }
        
        const image = await publitio.uploadFile(file, 'file');
        
        const image1 = await publitio.call(`/files/update/${image.id}`, 'PUT', {
            folder: 'ulR6MvlG'
        });

        const { id, url_preview, url_thumbnail, url_short } = image1;

        return { id, url_preview, url_thumbnail, url_short };
    }

    static async folders(){
        const list = await publitio.call('/folders/list', 'GET');
        return list;
    }
}

module.exports = ImageService;
