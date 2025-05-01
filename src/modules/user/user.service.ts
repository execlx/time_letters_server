import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCode } from '../../common/constants/errorcode.constant';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserService {
    private readonly logger = new LoggerService('用户服务');

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async validateUser(username: string, password: string): Promise<User | null> {
        this.logger.debug(`开始验证用户: ${username}`, 'validateUser');
        const user = await this.userRepository.findOne({ where: { username } });
        if (user && await bcrypt.compare(password, user.password)) {
            this.logger.log(`用户验证成功: ${username}`, 'validateUser');
            return user;
        }
        this.logger.warn(`用户验证失败: ${username}`, 'validateUser');
        return null;
    }

    async findById(id: number): Promise<User | null> {
        this.logger.debug(`开始查询用户: ${id}`, 'findById');
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            this.logger.warn(`用户不存在: ${id}`, 'findById');
        } else {
            this.logger.log(`用户查询成功: ${id}`, 'findById');
        }
        return user;
    }

    async findByPhone(phone: string): Promise<User | null> {
        this.logger.debug(`开始查询手机号用户: ${phone}`, 'findByPhone');
        const user = await this.userRepository.findOne({ where: { phone } });
        if (!user) {
            this.logger.warn(`手机号用户不存在: ${phone}`, 'findByPhone');
        } else {
            this.logger.log(`手机号用户查询成功: ${phone}`, 'findByPhone');
        }
        return user;
    }

    async findByWechat(openid: string): Promise<User | null> {
        this.logger.debug(`开始查询微信用户: ${openid}`, 'findByWechat');
        const user = await this.userRepository.findOne({ where: { wechatOpenid: openid } });
        if (!user) {
            this.logger.warn(`微信用户不存在: ${openid}`, 'findByWechat');
        } else {
            this.logger.log(`微信用户查询成功: ${openid}`, 'findByWechat');
        }
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        this.logger.debug(`开始查询邮箱用户: ${email}`, 'findByEmail');
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            this.logger.warn(`邮箱用户不存在: ${email}`, 'findByEmail');
        } else {
            this.logger.log(`邮箱用户查询成功: ${email}`, 'findByEmail');
        }
        return user;
    }

    async createUser(data: Partial<User>): Promise<User> {
        this.logger.debug('开始创建用户', 'createUser');
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`用户创建成功: ${savedUser.id}`, 'createUser');
        return savedUser;
    }

    async create(data: Partial<User>): Promise<User> {
        this.logger.debug('开始创建用户', 'create');
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`用户创建成功: ${savedUser.id}`, 'create');
        return savedUser;
    }

    async createByPhone(data: { phone: string; password?: string; username?: string }): Promise<User> {
        this.logger.debug(`开始创建手机号用户: ${data.phone}`, 'createByPhone');
        const existingUser = await this.findByPhone(data.phone);
        if (existingUser) {
            this.logger.warn(`手机号已注册: ${data.phone}`, 'createByPhone');
            throw new BusinessException('手机号已注册', ErrorCode.PHONE_EXISTS);
        }

        const userData = {
            ...data,
            username: data.username || `user_${data.phone.slice(-4)}_${Date.now().toString().slice(-4)}`
        };
        const user = this.userRepository.create(userData);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`手机号用户创建成功: ${savedUser.id}`, 'createByPhone');
        return savedUser;
    }

    async createByWechat(data: { wechatOpenid: string }): Promise<User> {
        this.logger.debug(`开始创建微信用户: ${data.wechatOpenid}`, 'createByWechat');
        const existingUser = await this.findByWechat(data.wechatOpenid);
        if (existingUser) {
            this.logger.warn(`微信用户已注册: ${data.wechatOpenid}`, 'createByWechat');
            throw new BusinessException('微信用户已注册', ErrorCode.USER_EXISTS);
        }

        const user = this.userRepository.create(data);
        const savedUser = await this.userRepository.save(user);
        this.logger.log(`微信用户创建成功: ${savedUser.id}`, 'createByWechat');
        return savedUser;
    }

    async setPassword(userId: number, password: string): Promise<void> {
        this.logger.debug(`开始设置用户密码: ${userId}`, 'setPassword');
        const user = await this.findById(userId);
        if (!user) {
            this.logger.warn(`用户不存在: ${userId}`, 'setPassword');
            throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        this.logger.log(`用户密码设置成功: ${userId}`, 'setPassword');
    }

    async resetPassword(phone: string, password: string): Promise<void> {
        this.logger.debug(`开始重置用户密码: ${phone}`, 'resetPassword');
        const user = await this.findByPhone(phone);
        if (!user) {
            this.logger.warn(`用户不存在: ${phone}`, 'resetPassword');
            throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
        }
        user.password = await bcrypt.hash(password, 10);
        await this.userRepository.save(user);
        this.logger.log(`用户密码重置成功: ${phone}`, 'resetPassword');
    }

    async update(id: number, data: Partial<User>): Promise<User> {
        this.logger.debug(`开始更新用户信息: ${id}`, 'update');
        const user = await this.findById(id);
        if (!user) {
            this.logger.warn(`用户不存在: ${id}`, 'update');
            throw new BusinessException('用户不存在', ErrorCode.USER_NOT_FOUND);
        }
        Object.assign(user, data);
        const updatedUser = await this.userRepository.save(user);
        this.logger.log(`用户信息更新成功: ${id}`, 'update');
        return updatedUser;
    }
} 