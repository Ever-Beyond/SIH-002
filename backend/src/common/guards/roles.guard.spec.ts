import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard.js';
import { UserRole } from '../../modules/users/entities/user.entity.js';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  const mockExecutionContext = (userRole?: string): ExecutionContext => {
    return {
      getHandler: vi.fn(),
      getClass: vi.fn(),
      switchToHttp: vi.fn().mockReturnValue({
        getRequest: vi.fn().mockReturnValue({
          user: userRole ? { role: userRole } : undefined,
        }),
      }),
    } as unknown as ExecutionContext;
  };

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should return true if no roles are required', () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const context = mockExecutionContext();

    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should throw ForbiddenException if user is not present', () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    const context = mockExecutionContext(); // No user

    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should throw ForbiddenException if user role is not allowed', () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
    const context = mockExecutionContext(UserRole.VIEWER);

    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('should return true if user role is allowed', () => {
    vi.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN, UserRole.SUPER_ADMIN]);
    const context = mockExecutionContext(UserRole.ADMIN);

    expect(rolesGuard.canActivate(context)).toBe(true);
  });
});
