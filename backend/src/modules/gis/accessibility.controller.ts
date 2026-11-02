import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessibilityService } from './accessibility.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('accessibility')
@UseGuards(JwtAuthGuard)
export class AccessibilityController {
  constructor(private readonly accessibilityService: AccessibilityService) {}

  @Get()
  getCurrentAccessibility() {
    return this.accessibilityService.getCurrentAccessibility();
  }
}
