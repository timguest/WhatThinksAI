import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  fetch(@Body() body: any)  {        
    return this.openaiService.findFree(body);
  }

  @Get()
  fetchFree(@Query() query_params)  {
    const {query_id} = query_params;
    return this.openaiService.findPaid(query_id);
  }
}
