import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TrainType } from '../enums/train-type.enum';

@Entity({ name: 'trains' })
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'enum', enum: TrainType })
  type: TrainType;

  @Column({ type: 'integer' })
  capacity: number;
}
