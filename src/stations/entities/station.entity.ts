import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stations' })
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar' })
  city: string;
}
