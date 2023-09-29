import { Inject, Injectable } from '@nestjs/common';
import { Connection, RowDataPacket } from 'mysql2/promise';
import { queries } from './queries/sql-queries';
import { CitiesPopulationResponseDTO } from './dtos/cities-population-response.dto';
import { ICityPopulation } from './interfaces/city-population.interface';
import { CityMembersResponseDTO } from './dtos/city-members-response.dto';
import { ICityMembersQueryResult } from './interfaces/city-members.interface';

@Injectable()
export class CityService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  async getMembersCount(): Promise<CitiesPopulationResponseDTO> {
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

  async getMembersWithSameFirstName(): Promise<CityMembersResponseDTO> {
    const [rows] = await this.connection.execute(
      queries.getMembersWithSameFirstName,
    );

    const cityMembers: ICityMembersQueryResult[] = (
      rows as RowDataPacket[]
    ).map((row: any) => ({
      city: row.city,
      first_name: row.first_name,
      count: row.count,
    }));

    const groupedData = cityMembers.reduce((acc, item) => {
      const city = item.city;
      const firstName = item.first_name;
      const count = item.count;

      if (!acc[city]) {
        acc[city] = { city, members: [] };
      }

      acc[city].members.push({ firstName, count });

      return acc;
    }, {});

    const cityMembersArray = Object.values(groupedData);

    return { cityMembers: cityMembersArray } as CityMembersResponseDTO;
  }
}
