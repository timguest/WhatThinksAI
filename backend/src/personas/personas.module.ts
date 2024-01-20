import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonasSchema, Personas } from './schemas/persona.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Personas.name, schema: PersonasSchema }])],
  controllers: [PersonasController],
  providers: [PersonasService],
  exports: [PersonasService]
})
export class PersonasModule {}
