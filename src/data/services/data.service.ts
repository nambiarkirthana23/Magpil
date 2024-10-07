import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Data } from '../entities/data.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

@Injectable()
export class DataService {

  token: any;
  constructor(
    @InjectRepository(Data)
    private readonly dataRepository: Repository<Data>,
    // @InjectRepository(Update)
    // private readonly updateRepository:Repository<Update>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { 

    this.getToken1();


  }

  // async findAll(): Promise<Data[]> {
  //   try {
  //     return await this.dataRepository.find();
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException('Unable to retrieve data from the database', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }


  async findAll(): Promise<Data[]> {
    try {
      return await this.dataRepository.find({
        select: ['id', 'channel_id', 'thing_id', 'imei'],
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Unable to retrieve data from the database', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update() {
    try {

      const data = await this.findAll();

      if(data.length != 0) {
        for(let d of data) {
          console.log(d.channel_id, d.thing_id, d.imei);
  
          // Perform axios PUT method
  
          try {
            let resp = await axios.put(`http://magpil.com/channels/${d.channel_id}/things/${d.thing_id}`,{}, {headers: {'Authorization': 'Bearer ' + this.token}});
            console.log(resp.status)
          } catch(err) {
            console.log("Err1 msg ",err.response.status, err.response.data)
          }
          
        }
  
  
      }
    } catch(err) {
      console.log("Err msg ",err.response.status, err.response.data)
    }
    

  }

  async getToken(): Promise<{ token: string }> {
    try {
      const payload =  {
        email: 'rotomag@gmail.com',
        password: '12345678',
      };

      const accessToken = this.jwtService.sign(payload, { expiresIn: this.configService.get('EXPIRES_IN') });

      return {
        token: accessToken,
      };
    } catch (error) {
      console.error(error.message);
      throw new HttpException('Unable to get the token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getToken1(){
    try {
      const response = await axios.post('http://magpil.com/tokens', {
        email: 'rotomag@gmail.com',
        password: '12345678',
      });

// console.log(response)

      if (response.status === 201 && response.data.token) {
        this.token = response.data.token;
        console.log("Token ", this.token)
      }
    } catch (error) {
      console.error(error.message);
    }
  }


}



