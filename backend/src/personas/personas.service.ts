import { Injectable, NotFoundException } from '@nestjs/common';
import { Personas } from './schemas/persona.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PersonasService {
  constructor(
    @InjectModel(Personas.name)
    private personaModel: mongoose.Model<Personas>
) {}

private generateQuery(filters: any): any {
  const query: any = {};

  if (filters.age) {
    query.age = {}

    if (filters.age.lowerLimit !== undefined) {
      query.age.$gte = filters.age.lowerLimit;
    }
    if (filters.age.upperLimit !== undefined) {
      query.age.$lte = filters.age.upperLimit;
    }
  }

  if (filters.education_level) {
    query.education_level = filters.education_level;
  }

  if (filters.income_level) {
    query.income_level = filters.income_level;
  }

  if (filters.gender) {
    query.gender = filters.gender;
  }

  if (filters.marital_status) {
    query.marital_status = filters.marital_status;
  }

  if (filters.area_type) {
    query.area_type = filters.area_type;
  }

  return query;
}

  async findAll(): Promise<Personas[]> {
    try {
      const personas = await this.personaModel.find();
      console.log({personas});
      
      return personas;
    } catch (error) {
      console.log('persona service error - findAll');
      console.log(error);
      return error
    }
  }

  async findOne(id: string): Promise<Personas> {
    try {
      const persona = await this.personaModel.findById(id);
      if (!persona) {
        throw new NotFoundException('Persona not found!')
      }
      return persona;
    } catch (error) {
      console.log('user service error - find_one');
      console.log(error);
      return error
    }
  }

  async findFiltered(filters: any)  {    
    const query = this.generateQuery(filters);    
    
    try {
      const persona = await this.personaModel.find(query);      
      return persona;
    } catch (error) {
      console.log('user service error - findAll');
      console.log(error);
      throw new NotFoundException('An error occured!')
    }
  }
}
