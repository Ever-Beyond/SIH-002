import { Test, TestingModule } from '@nestjs/testing';
import { IncidentsService } from './incidents.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Incident, IncidentType, IncidentSeverity, IncidentStatus } from './entities/incident.entity.js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';

describe('IncidentsService', () => {
  let service: IncidentsService;
  let repo: Repository<Incident>;
  let eventEmitter: EventEmitter2;

  const mockIncident = {
    id: 'inc-1',
    type: IncidentType.ACCIDENT,
    severity: IncidentSeverity.HIGH,
    status: IncidentStatus.OPEN,
    district: 'Central',
    location: { type: 'Point', coordinates: [56.78, 12.34] },
    timestamp: new Date('2026-09-18T10:00:00Z'),
    description: 'Crash',
    affectedRoads: [],
    affectedVehicles: [],
    reportedBy: 'user-1',
    photos: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepo = {
    create: vi.fn().mockImplementation((dto) => dto),
    save: vi.fn().mockImplementation((incident) => Promise.resolve({ ...mockIncident, ...incident })),
    find: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
  };

  const mockEventEmitter = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentsService,
        {
          provide: getRepositoryToken(Incident),
          useValue: mockRepo,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<IncidentsService>(IncidentsService);
    repo = module.get<Repository<Incident>>(getRepositoryToken(Incident));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);

    vi.clearAllMocks();
  });

  it('should create an incident and emit incident.created event', async () => {
    const createDto = {
      type: IncidentType.ACCIDENT,
      severity: IncidentSeverity.HIGH,
      district: 'Central',
      location: { type: 'Point', coordinates: [56.78, 12.34] },
      timestamp: '2026-09-18T10:00:00Z',
      description: 'Crash',
      photos: [],
    };

    await service.create(createDto as any);
    
    expect(repo.create).toHaveBeenCalledWith({
      ...createDto,
      timestamp: new Date(createDto.timestamp),
    });
    expect(repo.save).toHaveBeenCalled();
    expect(eventEmitter.emit).toHaveBeenCalledWith('incident.created', expect.objectContaining({
      payload: expect.objectContaining({
        type: IncidentType.ACCIDENT,
        severity: IncidentSeverity.HIGH,
      }),
    }));
  });

  it('should not emit an event if persistence fails', async () => {
    mockRepo.save.mockRejectedValueOnce(new Error('DB failure'));

    await expect(service.create({
      type: IncidentType.ACCIDENT,
      severity: IncidentSeverity.HIGH,
      district: 'Central',
      location: { type: 'Point', coordinates: [56.78, 12.34] },
      timestamp: '2026-09-18T10:00:00Z',
    } as any)).rejects.toThrow('DB failure');

    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should emit incident.updated if meaningful change occurs', async () => {
    mockRepo.findOne.mockResolvedValueOnce(mockIncident);
    mockRepo.findOne.mockResolvedValueOnce({ ...mockIncident, severity: IncidentSeverity.CRITICAL });

    await service.update('inc-1', { severity: IncidentSeverity.CRITICAL });

    expect(repo.update).toHaveBeenCalled();
    expect(eventEmitter.emit).toHaveBeenCalledWith('incident.updated', expect.any(Object));
  });

  it('should not emit incident.updated if redundant update', async () => {
    mockRepo.findOne.mockResolvedValueOnce(mockIncident);
    mockRepo.findOne.mockResolvedValueOnce(mockIncident); // After update it's the same

    // Description is not a core payload field, so updating it alone shouldn't trigger an event
    await service.update('inc-1', { description: 'Updated description' });

    expect(repo.update).toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });
});
