import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('medicines')
@Unique(["code", "category_key"])
export class Medicine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  manufacturer: string;

  @Column({ nullable: true, length: 64 })
  price: string;

  @Column({ nullable: true })
  specification: string;

  @Column({ nullable: true })
  dosage_form: string;

  @Column({ nullable: true })
  approval_number: string;

  @Column({ nullable: true, length: 512 })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true, length: 512 })
  detail_url: string;

  @Column({ nullable: true })
  category_key: number;

  @Column({ nullable: true, length: 255 })
  oss_image_url: string;

  @Column({ length: 64 })
  code: string;

  @Column({ type: 'text', nullable: true })
  indications: string;

  @Column({ type: 'text', nullable: true })
  usage_dosage: string;
} 