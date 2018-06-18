import { Test, TestingModule } from '@nestjs/testing';
import { ForecastController } from './forecast.controller';

describe('Forecast Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ForecastController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ForecastController = module.get<ForecastController>(ForecastController);
    expect(controller).toBeDefined();
  });
});
