import { Inject, Injectable } from '@nestjs/common';
import { Connection, RowDataPacket } from 'mysql2/promise';
import { queries } from './queries/sql-queries';
import { CitiesPopulationResponseDTO } from './dtos/cities-population-response.dto';
import { ICityPopulation } from './interfaces/city-population.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  async getCityMembersCount(): Promise<CitiesPopulationResponseDTO> {
    const [rows] = await this.connection.execute(queries.getCityMembersCount);

    const cityPopulations: ICityPopulation[] = (rows as RowDataPacket[]).map(
      (row: any) => ({
        city: row.city,
        count: row.count,
      }),
    );

    return {
      citiesPopulation: cityPopulations,
    };
  }
}
