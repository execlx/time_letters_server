import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    username: string;

    @Column({ length: 255, unique: true, nullable: true })
    email?: string;

    @Column({ length: 20, unique: true, nullable: true })
    phone?: string;

    @Column({ length: 100, unique: true, nullable: true })
    wechatOpenid?: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    profilePicture?: string;

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.ACTIVE
    })
    status: UserStatus;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
