import { Controller, Post, Body } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { 
  SendCodeDto, 
  VerifyCodeDto, 
  SendCodeResponseDto, 
  VerifyCodeResponseDto 
} from './dto/phone-dto';
import { BusinessException } from '../../../common/exceptions/business.exception';
import { ErrorCode } from '../../../common/constants/errorcode.constant';

@ApiTags('手机验证码')
@Controller('phone')
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @ApiOperation({ summary: '验证验证码' })
  @ApiResponse({ status: 200, description: '验证成功', type: VerifyCodeResponseDto })
  @ApiResponse({ status: 400, description: '验证失败' })
  @ApiBody({ type: VerifyCodeDto })
  @Post('verify')
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    try {
      const isValid = await this.phoneService.validateVerificationCode(
        verifyCodeDto.phone,
        verifyCodeDto.code,
      );
      return { isValid };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('验证码验证失败', ErrorCode.VERIFICATION_CODE_ERROR);
    }
  }

  @ApiOperation({ summary: '发送验证码' })
  @ApiResponse({ status: 200, description: '发送成功', type: SendCodeResponseDto })
  @ApiResponse({ status: 400, description: '发送失败' })
  @ApiBody({ type: SendCodeDto })
  @Post('send-code')
  async sendVerificationCode(@Body() sendCodeDto: SendCodeDto) {
    try {
      const code = await this.phoneService.createVerificationCode(sendCodeDto.phone);
      // TODO: Implement actual SMS sending
      return { success: true, code };
    } catch (error) {
      if (error instanceof BusinessException) {
        throw error;
      }
      throw new BusinessException('验证码发送失败', ErrorCode.SYSTEM_ERROR);
    }
  }
} 