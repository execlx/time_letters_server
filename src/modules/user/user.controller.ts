import { 
  Controller, 
  Post, 
  Body, 
  Patch, 
  Param, 
  ParseIntPipe, 
  UseGuards 
} from '@nestjs/common';
import { UserService } from './user.service';
import { 
  CreateUserDto, 
  PhoneRegisterDto, 
  WechatRegisterDto,
  SetPasswordDto,
  ResetPasswordDto,
  UpdateUserDto 
} from './dto/user-dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Public } from '../../common/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCode } from '../../common/constants/errorcode.constant';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '创建用户失败' })
  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('创建用户失败', ErrorCode.SYSTEM_ERROR);
    }
  }

  @ApiOperation({ summary: '通过手机号创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '创建用户失败' })
  @Public()
  @Post('phone')
  async createByPhone(@Body() registerDto: PhoneRegisterDto) {
    try {
      return await this.userService.createByPhone(registerDto);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('创建用户失败', ErrorCode.SYSTEM_ERROR);
    }
  }

  @ApiOperation({ summary: '通过微信创建用户' })
  @ApiResponse({ status: 201, description: '用户创建成功' })
  @ApiResponse({ status: 400, description: '创建用户失败' })
  @Public()
  @Post('wechat')
  async createByWechat(@Body() registerDto: WechatRegisterDto) {
    try {
      return await this.userService.createByWechat(registerDto);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('创建用户失败', ErrorCode.SYSTEM_ERROR);
    }
  }

  @ApiOperation({ summary: '设置密码' })
  @ApiResponse({ status: 200, description: '密码设置成功' })
  @ApiResponse({ status: 400, description: '设置密码失败' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('password/set')
  async setPassword(@Body() setPasswordDto: SetPasswordDto) {
    try {
      await this.userService.setPassword(setPasswordDto.userId, setPasswordDto.password);
      return { message: '密码设置成功' };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('设置密码失败', ErrorCode.SYSTEM_ERROR);
    }
  }

  @ApiOperation({ summary: '重置密码' })
  @ApiResponse({ status: 200, description: '密码重置成功' })
  @ApiResponse({ status: 400, description: '重置密码失败' })
  @Public()
  @Post('password/reset')
  async resetPassword(@Body() resetDto: ResetPasswordDto) {
    try {
      await this.userService.resetPassword(resetDto.phone, resetDto.password);
      return { message: '密码重置成功' };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('重置密码失败', ErrorCode.SYSTEM_ERROR);
    }
  }

  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  @ApiResponse({ status: 400, description: '更新用户信息失败' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('更新用户信息失败', ErrorCode.SYSTEM_ERROR);
    }
  }
}