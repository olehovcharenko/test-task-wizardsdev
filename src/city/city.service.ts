import { Inject, Injectable } from '@nestjs/common';
import { queries } from './queries/sql-queries';
import { CityDTO } from './dtos/city.dto';
import {
  CitiesPopulationResponseDTO,
  CityPopulationDTO,
} from './dtos/city-population.dto';
import { CityMembersResponseDTO } from './dtos/city-members.dto';
import { ICityMembersQueryResult } from './interfaces/city-member-query-result.interface';
import { Client } from 'pg';

@Injectable()
export class CityService {
  constructor(@Inject('DATABASE_CONNECTION') private readonly client: Client) {}

  async getMembersCount(): Promise<CitiesPopulationResponseDTO> {
    const { rows } = await this.client.query(queries.getCityMembersCount);

    const cityPopulations: CityPopulationDTO[] = rows.map(
      (row: CityPopulationDTO) => ({
        city: row.city,
        count: row.count,
      }),
    );

    return {
      citiesPopulation: cityPopulations,
    };
  }

  async getMembersWithSameFirstName(): Promise<CityMembersResponseDTO> {
    const { rows } = await this.client.query(
      queries.getMembersWithSameFirstName,
    );

    const cityMembers: ICityMembersQueryResult[] = rows.map(
      (row: ICityMembersQueryResult) => ({
        city: row.city,
        first_name: row.first_name,
        count: row.count,
      }),
    );

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

    const { rows } = await this.client.query(query);

    return rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
    }));
  }
}
