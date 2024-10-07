import { Controller, Get, Put, HttpException, HttpStatus, UseGuards, Res } from '@nestjs/common';
import { DataService } from '../services/data.service';
import { Data } from '../entities/data.entity';
import { AuthGuard } from '../guard/auth.guard';


@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) { }

  //@UseGuards(AuthGuard)
  @Get('all')
  async findAll(): Promise<Data[]> {
    try {
      return await this.dataService.findAll();
    } catch (error) {
      console.error(error);
      throw new HttpException('Unable to retrieve data from the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get('token')
  async getToken(): Promise<string> {
    try {
      const tokenResponse = await this.dataService.getToken();
      return tokenResponse.token;
    } catch (error) {
      console.error(error);
      throw new HttpException('Unable to get the token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('update')
  async updateAndReturnData(@Res() res: any) {
    try {
      await this.dataService.update();
      res.send(200)
      // return { count, updatedData };
    } catch (error) {
      console.error('Error in updateAndReturnData:', error);
      throw new HttpException('Unable to get the updated data', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @UseGuards(AuthGuard)
  // @Put('update')
  // async updateData(req: Request, res: Response): Promise<{ count: number; updatedData: { url: string; }[] }> {
  //   try {
  //     const { count, updatedData } = await this.dataService.update();
  //     return { count, updatedData };
  //   } catch (error) {
  //     console.error('Error in updateData:', error);
  //     throw new HttpException('Unable to update url', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

}