import { v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { CloudinaryConfig } from '../entities/clodinary.config'

export class CloudinaryProvider {
    constructor(private configService: ConfigService<CloudinaryConfig>){}

    useFactory() {
        return v2.config({
            cloud_name: this.configService.get<string>('cloud_name'),
            api_key: this.configService.get<string>('api_key'),
            api_secret: this.configService.get<string>('api_secret'),
        });
    }
  };