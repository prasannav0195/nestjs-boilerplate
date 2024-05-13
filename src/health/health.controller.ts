import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import HealthService from './health.service';
import { HealthCheckResponse } from './health.types';

@ApiTags('Health')
@Controller({ path: '/health', version: '1' })
export default class HealthController {
    constructor(private readonly healthService: HealthService) {}

  @Get()
    getHealth(): Promise<HealthCheckResponse> {
        return this.healthService.getHealth();
    }
}
