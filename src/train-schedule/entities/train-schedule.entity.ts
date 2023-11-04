import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Train } from '../../trains/entities/train.entity';
import { Station } from '../../stations/entities/station.entity';

@Entity({ name: 'train_schedule' })
export class TrainSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  arrive_time: string;

  @Column({ type: 'timestamptz' })
  departure_time: string;

  @ManyToOne(() => Train)
  @JoinColumn({ name: 'train_id' })
  train: Train;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_from_id' })
  station_from: Station;

  @ManyToOne(() => Station)
  @JoinColumn({ name: 'station_to_id' })
  station_to: Station;
}
