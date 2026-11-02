/// <reference lib="dom" />
import { test, expect } from '@playwright/test';

// Setup before tests: Inject the mock session flag to ensure consistent mock data
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('ner_shield_mock_session', 'true');
  });
});

test.describe('E2E Critical Workflows', () => {

  test('1. Login Workflow', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: /Welcome Back/i })).toBeVisible();
    
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Verify successful login redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText('Command Center Overview')).toBeVisible();
  });

  test('2. Dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/dashboard/);

    // Dashboard metrics
    await expect(page.getByText('Command Center Overview')).toBeVisible();
    // Verify some metrics exist
    await expect(page.getByText('Active Vehicles')).toBeVisible();
    await expect(page.getByText('Active Shipments')).toBeVisible();
  });

  test('3. Fleet & Vehicle Details', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Navigate to Fleet
    await page.getByRole('link', { name: /Live Tracking/i }).click();
    await expect(page).toHaveURL(/\/fleet\/live/);

    // Click on a vehicle (V-101)
    await page.getByText('V-101').click();
    
    // The side panel or modal opens with "View Full Details"
    const detailsButton = page.getByRole('button', { name: /View Full Details/i }).first();
    await expect(detailsButton).toBeVisible();
    await detailsButton.click();

    // Verify Vehicle Profile loads
    await expect(page).toHaveURL(/\/fleet\/vehicles\/V-101/);
    await expect(page.getByText(/Vehicle Profile: V-101/i)).toBeVisible();
  });

  test('4. Reroute & Emergency Approval', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Go to vehicle reroute directly
    await page.goto('/fleet/vehicles/V-101/reroute');
    await expect(page.getByText('Reroute Recommendation')).toBeVisible();
    
    // AI route should be suggested (e.g. 42.5 km)
    await expect(page.getByText('42.5 km')).toBeVisible();
    
    // Click Accept Route
    await page.getByRole('button', { name: /Accept Route/i }).click();

    // Should navigate back to vehicle profile
    await expect(page).toHaveURL(/\/fleet\/vehicles\/V-101/);
  });

  test('5. Shipment Creation', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.goto('/logistics/shipments/create');
    await expect(page.getByText('Create New Shipment')).toBeVisible();

    await page.getByRole('combobox', { name: /Commodity Type \*/i }).selectOption('GENERAL');
    await page.getByRole('combobox', { name: /Priority \*/i }).selectOption('HIGH');
    await page.getByRole('textbox', { name: /Origin \*/i }).fill('Delhi');
    await page.getByRole('textbox', { name: /Destination \*/i }).fill('Mumbai');
    await page.getByRole('spinbutton', { name: /Quantity/i }).fill('500');

    await page.getByRole('button', { name: /Create Shipment/i }).click();

    await expect(page.getByText('Shipment Created Successfully!')).toBeVisible();
  });

  test('6. Incident Management', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.goto('/incidents');
    await expect(page.getByText('Incident Management')).toBeVisible();

    // Filter by ROADBLOCK by locating the combobox with 'All Types'
    await page.locator('select').nth(1).selectOption('ROADBLOCK');
    
    // Verify that a row with ROADBLOCK appears
    await expect(page.getByRole('cell', { name: 'ROADBLOCK' }).first()).toBeVisible();
  });

  test('7. Emergency Simulation & Approval', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.goto('/emergency/simulation');
    await expect(page.getByText('Emergency Simulation Engine')).toBeVisible();

    await page.getByRole('button', { name: /Run Simulation/i }).click();

    // After 2 seconds, simulation result appears
    await expect(page.getByText(/Simulation indicates a high risk/i)).toBeVisible({ timeout: 10000 });
  });

  test('8. Analytics', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel(/Email Address/i).fill('admin@ner-shield.gov.in');
    await page.getByPlaceholder('••••••••').fill('password');
    await page.getByRole('button', { name: /sign in/i }).click();

    await page.goto('/analytics');
    await expect(page.getByText('Analytics & KPIs')).toBeVisible();

    // Verify at least one chart container renders
    await expect(page.getByText('7-Day Delivery Trends')).toBeVisible();
    await expect(page.getByText('Incidents by District')).toBeVisible();
  });
});
