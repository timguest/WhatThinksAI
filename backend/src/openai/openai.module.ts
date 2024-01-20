import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { OpenaiController } from './openai.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Personas, PersonasSchema } from 'src/personas/schemas/persona.schema';
import { PersonasService } from 'src/personas/personas.service';
import { PersonasModule } from 'src/personas/personas.module';
import { QueryInfo, QueryInfoSchema } from './schema/query.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Personas.name, schema: PersonasSchema }]), MongooseModule.forFeature([{ name: QueryInfo.name, schema: QueryInfoSchema }]), PersonasModule],
  controllers: [OpenaiController],
  providers: [OpenaiService, PersonasService],
})
export class OpenaiModule {}
