import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from './routes.service.js';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Route } from './entities/route.entity.js';
import { RouteStatus } from './entities/route.enums.js';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { RouteUpdatedEvent } from './events/route-events.js';

describe('RoutesService', () => {
  let service: RoutesService;
  let repo: Repository<Route>;
  let eventEmitter: EventEmitter2;

  const mockRoute = {
    id: 'route-1',
    name: 'Route 1',
    shipmentId: 'ship-1',
    status: RouteStatus.PROPOSED,
    isAlternative: false,
    vehicleId: null,
    path: { type: 'LineString', coordinates: [[1, 2], [3, 4]] },
    createdAt: new Date('2026-09-18T10:00:00Z'),
    updatedAt: new Date('2026-09-18T10:00:00Z'),
  };

  const mockRepo = {
    create: vi.fn().mockImplementation((dto) => dto),
    save: vi.fn().mockImplementation((route) => Promise.resolve({ ...mockRoute, ...route })),
    find: vi.fn().mockResolvedValue([mockRoute]),
    findOne: vi.fn().mockResolvedValue(mockRoute),
    update: vi.fn(),
  };

  const mockEventEmitter = {
    emit: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoutesService,
        {
          provide: getRepositoryToken(Route),
          useValue: mockRepo,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<RoutesService>(RoutesService);
    repo = module.get<Repository<Route>>(getRepositoryToken(Route));
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);

    vi.clearAllMocks();
  });

  it('should emit nothing on create as we scoped Task 69 to ROUTE_UPDATED', async () => {
    const createDto = {
      name: 'Route 1',
      shipmentId: 'ship-1',
      isAlternative: false,
      path: { type: 'LineString', coordinates: [[1, 2], [3, 4]] },
    };

    await service.create(createDto as any);
    
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled(); // No route.created per instructions
  });

  it('should not emit an event if update persistence fails', async () => {
    mockRepo.update.mockRejectedValueOnce(new Error('DB failure'));

    await expect(service.update('route-1', {
      status: RouteStatus.ACCEPTED,
    })).rejects.toThrow('DB failure');

    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should emit route.updated if meaningful change occurs', async () => {
    mockRepo.findOne.mockResolvedValueOnce(mockRoute);
    mockRepo.findOne.mockResolvedValueOnce({ ...mockRoute, status: RouteStatus.ACCEPTED });

    await service.update('route-1', { status: RouteStatus.ACCEPTED });

    expect(repo.update).toHaveBeenCalled();
    expect(eventEmitter.emit).toHaveBeenCalledWith('route.updated', expect.any(RouteUpdatedEvent));
  });

  it('should not emit route.updated if redundant update', async () => {
    mockRepo.findOne.mockResolvedValueOnce(mockRoute);
    mockRepo.findOne.mockResolvedValueOnce(mockRoute);

    // Update with exact same status shouldn't trigger an event
    await service.update('route-1', { status: RouteStatus.PROPOSED });

    expect(repo.update).toHaveBeenCalled();
    expect(eventEmitter.emit).not.toHaveBeenCalled();
  });

  it('should emit route.updated for main route and rejected alternatives on acceptRoute', async () => {
    const altRoute = { ...mockRoute, id: 'route-2', isAlternative: true };
    mockRepo.findOne.mockImplementation(async (query: any) => {
       if (query.where.id === 'route-1') {
         // If we are calling after the update, the repo.update has been called.
         // Let's just return what the updated state should be based on call count or args.
         // Actually, let's just make it simpler by tracking a local state or checking if payload was passed.
       }
       return undefined;
    });
    
    // Instead of a complex mock, we can just use mockResolvedValueOnce sequences
    mockRepo.findOne.mockReset();
    // 1st call: inside acceptRoute for 'route-1' (initial state)
    mockRepo.findOne.mockResolvedValueOnce(mockRoute);
    // 2nd call: inside acceptRoute loop for 'route-2' (after update alt)
    mockRepo.findOne.mockResolvedValueOnce({ ...altRoute, status: RouteStatus.REJECTED });
    // 3rd call: inside acceptRoute for 'route-1' (after update main)
    mockRepo.findOne.mockResolvedValueOnce({ ...mockRoute, status: RouteStatus.ACCEPTED, vehicleId: 'v-1' });

    mockRepo.find.mockResolvedValueOnce([mockRoute, altRoute]);

    await service.acceptRoute('route-1', 'v-1');

    expect(repo.update).toHaveBeenCalledWith('route-1', { status: RouteStatus.ACCEPTED, vehicleId: 'v-1' });
    expect(repo.update).toHaveBeenCalledWith('route-2', { status: RouteStatus.REJECTED });
    
    // We expect two emissions: one for altRoute rejected, one for main route accepted
    expect(eventEmitter.emit).toHaveBeenCalledTimes(2);
    expect(eventEmitter.emit).toHaveBeenCalledWith('route.updated', expect.objectContaining({
      payload: expect.objectContaining({ id: 'route-2', status: RouteStatus.REJECTED })
    }));
    expect(eventEmitter.emit).toHaveBeenCalledWith('route.updated', expect.objectContaining({
      payload: expect.objectContaining({ id: 'route-1', status: RouteStatus.ACCEPTED })
    }));
  });
});
