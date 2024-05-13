import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class IAMService {
    constructor(private configService: ConfigService) {}

    async doLogin(): Promise<boolean> {
        return false;
    }
}
