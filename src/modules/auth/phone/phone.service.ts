import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneVerification } from './entities/phone-verification.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepository: Repository<PhoneVerification>,
  ) {}

  async createVerificationCode(phone: string): Promise<string> {
    // Generate a 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Create and save verification record
    const verification = this.phoneVerificationRepository.create({
      phone,
      code,
    });
    await this.phoneVerificationRepository.save(verification);
    
    return code;
  }

  async validateVerificationCode(phone: string, code: string): Promise<boolean> {
    const verification = await this.phoneVerificationRepository.findOne({
      where: { phone, code },
      order: { createdAt: 'DESC' },
    });

    if (!verification) {
      return false;
    }

    // Check if code is expired (5 minutes)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    if (verification.createdAt < fiveMinutesAgo) {
      return false;
    }

    // Delete the used verification code
    await this.phoneVerificationRepository.delete(verification.id);
    
    return true;
  }
} 