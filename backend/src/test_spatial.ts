import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function main() {
  try {
    await dataSource.initialize();
    console.log('Connected to DB');
    
    // 1. Insert some dummy spatial data using ST_GeomFromGeoJSON or ST_MakePoint
    // Vehicle at (longitude: 77.1025, latitude: 28.7041) - Delhi
    await dataSource.query(`
      INSERT INTO vehicles ("plateNumber", "type", "location")
      VALUES ('DL-01-AB-1234', 'TRUCK', ST_SetSRID(ST_MakePoint(77.1025, 28.7041), 4326))
    `);
    
    // Vehicle at (longitude: 77.2090, latitude: 28.6139) - New Delhi (close)
    await dataSource.query(`
      INSERT INTO vehicles ("plateNumber", "type", "location")
      VALUES ('DL-02-CD-5678', 'VAN', ST_SetSRID(ST_MakePoint(77.2090, 28.6139), 4326))
    `);

    // Incident at (longitude: 77.1500, latitude: 28.6500)
    await dataSource.query(`
      INSERT INTO incidents ("type", "severity", "district", "timestamp", "location")
      VALUES ('ROADBLOCK', 'HIGH', 'Central', NOW(), ST_SetSRID(ST_MakePoint(77.1500, 28.6500), 4326))
    `);

    console.log('Inserted dummy spatial data.');

    // 2. Query distance between Incident and all vehicles (using ST_DistanceSphere for meters)
    const result = await dataSource.query(`
      SELECT v."plateNumber", 
             ST_DistanceSphere(v.location, i.location) as distance_meters
      FROM vehicles v, incidents i
      WHERE i.type = 'ROADBLOCK'
      ORDER BY v.location <-> i.location
      LIMIT 2
    `);

    console.log('Spatial Distance Query Results:');
    console.table(result);

    // Clean up
    await dataSource.query('DELETE FROM vehicles;');
    await dataSource.query('DELETE FROM incidents;');

    await dataSource.destroy();
  } catch (err) {
    console.error('Spatial Test failed:', err);
    process.exit(1);
  }
}

main();
