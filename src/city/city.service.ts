import { Inject, Injectable } from '@nestjs/common';
import { Connection, RowDataPacket } from 'mysql2/promise';
import { queries } from './queries/sql-queries';
import { CityDTO } from './dtos/city.dto';
import {
  CitiesPopulationResponseDTO,
  CityPopulationDTO,
} from './dtos/city-population.dto';
import { CityMembersResponseDTO } from './dtos/city-members.dto';
import { ICityMembersQueryResult } from './interfaces/city-member-query-result.interface';

@Injectable()
export class CityService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Connection,
  ) {}

  async getMembersCount(): Promise<CitiesPopulationResponseDTO> {
    const [rows] = await this.connection.execute(queries.getCityMembersCount);

    const cityPopulations: CityPopulationDTO[] = (rows as RowDataPacket[]).map(
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

  async getCityByPartialName(partialName: string): Promise<CityDTO[]> {
    const query = queries.getFilteredCities(partialName);

    const [rows] = await this.connection.execute(query);

    return (rows as RowDataPacket[]).map((row: any) => ({
      id: row.id,
      name: row.name,
      population: row.population,
    }));
  }
}
