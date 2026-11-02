export class VehicleLocationUpdatedEvent {
  constructor(
    public readonly vehicleId: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly speed: number,
    public readonly heading: number,
    public readonly timestamp: string, // ISO UTC string
  ) {}
}
