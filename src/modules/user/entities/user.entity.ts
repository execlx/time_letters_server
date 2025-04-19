import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    username: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;
}
