import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type PersonasDocument = HydratedDocument<Personas>;

@Schema()
export class Personas {

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    age: number;

    @Prop()
    gender: string;

    @Prop()
    marital_status: string;

    @Prop()
    education_level: string;

    @Prop()
    employment_industry: string;

    @Prop()
    income_level: string;

    @Prop()
    area_type: string;

    @Prop()
    location: string;

    @Prop()
    hobbies: string;

    @Prop()
    children_amount: number;
}

export const PersonasSchema = SchemaFactory.createForClass(Personas)