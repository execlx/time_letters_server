import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { 
  CreateUserDto, 
  PhoneRegisterDto, 
  WechatRegisterDto,
  SetPasswordDto,
  ResetPasswordDto,
  UpdateUserDto 
} from './dto/user-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [
          { username: createUserDto.username },
          { email: createUserDto.email }
        ]
      });

      if (existingUser) {
        throw new BadRequestException('Username or email already exists');
      }

      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create user');
    }
  }

  // 通过手机号创建用户
  async createByPhone(registerDto: PhoneRegisterDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [
          { username: registerDto.username },
          { phone: registerDto.phone }
        ]
      });

      if (existingUser) {
        throw new BadRequestException('Username or phone already exists');
      }

      const newUser = this.userRepository.create({
        username: registerDto.username,
        phone: registerDto.phone,
        password: registerDto.password
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create user with phone');
    }
  }

  // 通过微信创建用户
  async createByWechat(registerDto: WechatRegisterDto): Promise<User> {
    try {
      // TODO: 获取微信用户信息
      // const wechatUser = await this.wechatService.getUserInfo(registerDto.code);
      const wechatUser = { openid: 'test_openid' };

      const existingUser = await this.userRepository.findOne({
        where: [
          { username: registerDto.username },
          { wechatOpenId: wechatUser.openid }
        ]
      });

      if (existingUser) {
        throw new BadRequestException('Username or WeChat account already exists');
      }

      const newUser = this.userRepository.create({
        username: registerDto.username,
        wechatOpenId: wechatUser.openid,
        password: registerDto.password
      });

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create user with WeChat');
    }
  }

  // 通过用户名查找用户
  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { username } 
    });
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  // 通过手机号查找用户
  async findByPhone(phone: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { phone } 
    });
    if (!user) {
      throw new NotFoundException(`User with phone "${phone}" not found`);
    }
    return user;
  }

  // 通过微信 openid 查找用户
  async findByWechatOpenId(openId: string): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { wechatOpenId: openId } 
    });
    if (!user) {
      throw new NotFoundException(`User with WeChat openid "${openId}" not found`);
    }
    return user;
  }

  // 通过 ID 查找用户
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id } 
    });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  // 更新用户信息
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  // 设置密码
  async setPassword(userId: number, password: string): Promise<void> {
    const user = await this.findById(userId);
    user.password = password;
    await this.userRepository.save(user);
  }

  // 重置密码
  async resetPassword(phone: string, password: string): Promise<void> {
    const user = await this.findByPhone(phone);
    user.password = password;
    await this.userRepository.save(user);
  }
}

