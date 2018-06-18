import { Test, TestingModule } from '@nestjs/testing';
import { WeatherFetchService } from './weather-fetch.service';

describe('WeatherFetchService', () => {
  let service: WeatherFetchService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherFetchService],
    }).compile();
    service = module.get<WeatherFetchService>(WeatherFetchService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
