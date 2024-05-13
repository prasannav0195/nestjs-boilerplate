import {
    Body, Controller, Post, Res, Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import ExpressController from '@app/common/expressController';

import LoginPayloadDto from './dto/login.dto';
import IAMService from './iam.service';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export default class IAMController extends ExpressController {
    constructor(private readonly iamService: IAMService) {
        super();
    }

  @Post('/login')
    async doMpLogin(@Body() loginPayload: LoginPayloadDto, @Req() req: Request, @Res() res: Response): Promise<void> {
        try {
            await this.iamService.doLogin();

            return this.json({}, { req, res });
        } catch (err) {
            return this.catch(err, { req, res });
        }
    }
}
