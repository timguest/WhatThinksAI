import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';

export type QueryInfoDocument = HydratedDocument<QueryInfo>;

@Schema()
export class QueryInfo {

    @Prop()
    query_id: string;

    @Prop({ type: Object }) // Define a field to store an object
    data: Record<string, any>; // You can use any type for the object structure
}

export const QueryInfoSchema = SchemaFactory.createForClass(QueryInfo)