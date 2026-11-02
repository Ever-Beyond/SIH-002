import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateRefreshToken(userId: string, refreshTokenHash: string | null): Promise<void> {
    await this.usersRepository.update(userId, { refreshTokenHash });
  }

  // --- Admin User Management Methods ---

  private readonly safeSelect = {
    id: true,
    email: true,
    role: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
  };

  async adminCreate(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const existing = await this.findByEmail(createUserDto.email);
    if (existing) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      email: createUserDto.email,
      role: createUserDto.role,
      passwordHash,
    });
    
    const saved = await this.usersRepository.save(user);
    return this.usersRepository.findOneOrFail({
      where: { id: saved.id },
      select: this.safeSelect,
    });
  }

  async findAll(): Promise<Partial<User>[]> {
    return this.usersRepository.find({
      select: this.safeSelect,
      order: { createdAt: 'DESC' },
    });
  }

  async findOneSafe(id: string): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: this.safeSelect,
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existing = await this.findByEmail(updateUserDto.email);
      if (existing) throw new ConflictException('Email already in use');
    }

    await this.usersRepository.update(id, updateUserDto);
    
    return this.findOneSafe(id);
  }

  async updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.usersRepository.update(id, { isActive: updateStatusDto.isActive });
    
    return this.findOneSafe(id);
  }
}
