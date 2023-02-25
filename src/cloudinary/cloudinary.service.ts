import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    deleteImage(public_id: string){
        v2.uploader.destroy(public_id, function(error,result) {
        console.log(result, error) })
        .then(resp => console.log(resp))
        .catch(_err=> console.log("Something went wrong, please try again later."));
    }
}
