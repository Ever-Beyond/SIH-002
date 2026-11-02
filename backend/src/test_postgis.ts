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
    await dataSource.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    console.log('PostGIS enabled successfully');
    
    // Test basic postgis functionality
    const result = await dataSource.query(`SELECT ST_AsText(ST_MakePoint(1, 2)) as point`);
    console.log('PostGIS test:', result);
    
    await dataSource.destroy();
  } catch (err) {
    console.error('Failed to enable PostGIS:', err);
    process.exit(1);
  }
}

main();
