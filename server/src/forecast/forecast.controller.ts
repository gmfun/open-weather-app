import { Controller, Get, Param } from '@nestjs/common';
import { DataStoreService } from 'data-store.service';

@Controller('forecast')
export class ForecastController {

    constructor(private store: DataStoreService) {}

    @Get(':id')
    getForecast(@Param('id') id: number) {
        return this.store.getForecast(id);
    }
}
