import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    username: string;

    @Column({ length: 255, unique: true, nullable: true })
    email?: string;

    @Column({ length: 20, unique: true, nullable: true })
    phone?: string;

    @Column({ length: 100, unique: true, nullable: true })
    wechatOpenid?: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    profilePicture?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
