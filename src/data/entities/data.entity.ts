import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('device_reg_tbl')
export class Data {
  @PrimaryGeneratedColumn({ name: 'ref_id' })
  id: number;

  @Column({ name: 'flux_clientid' }) 
  channel_id: string;

  @Column({ name: 'flux_username' }) 
  thing_id: string;


  @Column({ name: 'imei' }) 
  imei: string;
}

