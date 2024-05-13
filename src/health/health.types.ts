export type HealthCheckResponse = {
    message: string;
    appHealth: string;
    dbHealth: string;
    cacheHealth: string;
}
