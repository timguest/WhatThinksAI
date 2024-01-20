import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { Personas } from './schemas/persona.schema';

@Controller('personas')
export class PersonasController {
  constructor(private readonly personasService: PersonasService) {}

  @Get()
  findAll(): Promise<Personas[]> {
    return this.personasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Personas> {
    return this.personasService.findOne(id);
  }

  @Post()
  fetch(@Body() personaFilters: any)  {
    console.log('persona post controller');
    
    return this.personasService.findFiltered(personaFilters);
  }
}
