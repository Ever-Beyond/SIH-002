import { useState } from 'react';
import { 
  Button, Card, Badge, EmptyState, ErrorState, 
  Input, Textarea, Select, Checkbox, Panel, Drawer, StatCard, 
  StatusIndicator, Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
  Pagination, useToast, Tooltip, Modal, Dialog, Dropdown, DropdownItem
} from '../../components';
import { Activity, Bell, Settings, User } from 'lucide-react';

const ToastDemo = () => {
  const { addToast } = useToast();
  return (
    <Button onClick={() => addToast({ type: 'success', title: 'Operation successful!', message: 'This is a test message.' })}>
      Show Toast
    </Button>
  );
}

const ComponentGallery = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      <header>
        <h1>NER-SHIELD Component Gallery</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>Visual verification of the Design System</p>
      </header>

      <section>
        <h2>Actions & Badges</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading>Loading</Button>
          
          <Badge variant="primary">New</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="danger">Critical</Badge>
        </div>
      </section>

      <section>
        <h2>Form Controls</h2>
        <div className="grid-layout-1-1" style={{ marginTop: '1rem' }}>
          <Input label="Email Address" placeholder="admin@ner-shield.gov.in" />
          <Input label="Password" type="password" error="Password is too short" />
          <Select label="Role" options={[{label: 'Admin', value: 'admin'}, {label: 'Dispatcher', value: 'dispatcher'}]} />
          <Checkbox label="Remember my device" />
          <div style={{ gridColumn: '1 / -1' }}>
            <Textarea label="Incident Details" placeholder="Describe the incident..." />
          </div>
        </div>
      </section>

      <section>
        <h2>Data Display & Status</h2>
        <div className="grid-auto-fit" style={{ marginTop: '1rem' }}>
          <StatCard title="Active Incidents" value="12" trend={{ value: 5, isPositive: false }} icon={<Activity />} />
          <StatCard title="Fleet Online" value="240" trend={{ value: 12, isPositive: true }} />
          <Card>
            <h3 style={{fontSize: '1rem', marginBottom: '1rem'}}>System Status</h3>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <StatusIndicator status="online" pulse /> <span style={{fontSize: '0.875rem'}}>API Gateway</span>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h2>Overlays & Feedback</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
          <Button variant="danger" onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <Dropdown trigger={<Button variant="outline">User Menu</Button>}>
            <DropdownItem><User size={16} style={{display:'inline', marginRight:'8px', verticalAlign:'middle'}}/> Profile</DropdownItem>
            <DropdownItem><Settings size={16} style={{display:'inline', marginRight:'8px', verticalAlign:'middle'}}/> Settings</DropdownItem>
          </Dropdown>
          <Tooltip content="Provides system notifications">
            <div style={{display: 'inline-flex', padding:'8px'}}><Bell color="var(--color-text-muted)"/></div>
          </Tooltip>
          <ToastDemo />
        </div>
      </section>

      <section>
        <h2>Tables & Pagination</h2>
        <Panel title="Recent Shipments" style={{ marginTop: '1rem' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>ID</TableHeader>
                <TableHeader>Origin</TableHeader>
                <TableHeader>Destination</TableHeader>
                <TableHeader>Status</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>SHP-001</TableCell>
                <TableCell>Guwahati</TableCell>
                <TableCell>Shillong</TableCell>
                <TableCell><Badge variant="success">Delivered</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHP-002</TableCell>
                <TableCell>Tezpur</TableCell>
                <TableCell>Itanagar</TableCell>
                <TableCell><Badge variant="warning">In Transit</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination currentPage={1} totalPages={5} onPageChange={()=>{}} />
          </div>
        </Panel>
      </section>

      <section>
        <h2>States</h2>
        <div className="grid-layout-1-1" style={{ marginTop: '1rem' }}>
          <EmptyState title="No Shipments" description="There are no active shipments in your queue." />
          <ErrorState title="Connection Lost" message="Failed to connect to the fleet tracking server." />
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Component Modal" footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}>
        <p style={{color: 'var(--color-text-muted)'}}>This is a reusable modal component using React Portals.</p>
      </Modal>

      <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} title="Delete Shipment?" description="This action cannot be undone." isDestructive onConfirm={() => setDialogOpen(false)}>
        {null}
      </Dialog>

      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)} title="Navigation">
        <p style={{color: 'var(--color-text-muted)'}}>Drawer content goes here.</p>
      </Drawer>

    </div>
  );
}

export default ComponentGallery;
