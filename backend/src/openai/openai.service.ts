
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PersonasService } from 'src/personas/personas.service';
import { textTransformer } from './utils/transformer';
import mongoose from 'mongoose';
import { QueryInfo } from './schema/query.schema';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MODEL= 'gpt-4-1106-preview'
@Injectable()
export class OpenaiService {
  private openai: OpenAI;
  private queryInfoModel: mongoose.Model<QueryInfo>

  constructor(private readonly personaService: PersonasService, @InjectModel(QueryInfo.name)
  private queryInfo: mongoose.Model<QueryInfo>) {
    
    this.openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
    });
  }

  async findInfoWithGPT({data: dataset, body: requestBody, count:length}:any) {
    try {
        const arrayOfPromises = dataset.map(async (item) => {
          const instructions = await textTransformer(item, requestBody);
          const { formatted_system_prompt, formatted_user_prompt } = instructions;
  
          const completionPromise = this.openai.chat.completions.create({
            model: DEFAULT_MODEL,
            messages: [
              { role: "system", content: formatted_system_prompt },
              { role: "user", content: formatted_user_prompt }
            ],
            temperature: DEFAULT_TEMPERATURE,
            // max_tokens: 200
          });
  
          return completionPromise.then((completion) => ({
            user: item,
            content: completion.choices[0].message.content
          }));
        });
        console.log('lol', arrayOfPromises);
        
        const arrayOfResults = await Promise.all(arrayOfPromises);
        return { result: arrayOfResults, count: length };

  } catch (error) {
      console.error('Error:', error);
      throw new Error ('Error while chatgpt prompting')
    }
  }
  
  async findPaid(query_id: string) {    
    try {      
      const query_body = await this.queryInfo.findOne({query_id: query_id})
      const personas = await this.personaService.findFiltered(query_body?.data);
      // pass the values to the api
      const response = await this.findInfoWithGPT({data: personas, body: query_body?.data, count: personas.length} ); 
      return response
    } catch (error) {
      console.log('user service error - findAll');
      console.log(error);
      return error
    }
  }

  async findFree(body :any) {    
    try {      
      const data = await this.personaService.findFiltered(body);
      // save to queryInfo collection
      const uuid = uuidv4(); 
      const newQueryInfo = new this.queryInfo;
      newQueryInfo.query_id = uuid;
      newQueryInfo.data = {
        age: body.age,
        education_level: body.education_level,
        income_level: body.income_level,
        gender: body.gender,
        marital_status: body.marital_status,
        area_type: body.area_type,
        input_text: body.input_text,
        description: body.description
      };
      await newQueryInfo.save();
      //pass the values to the api
      const response = await this.findInfoWithGPT({data: data?.length > 2 ? data.slice(0, 2) : data, body, count: data?.length });            
      return {...response, query_id: uuid}
    } catch (error) {
      console.log('openai service error - findfree');
      console.log(error);
      return error
    }
  }
}

