import { Input, Select, Button, Spinner } from '../../../components';
import { useCreateShipment } from '../hooks/useCreateShipment';

export const CreateShipmentForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetState
  } = useCreateShipment();

  if (submitSuccess) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-success)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          ✓
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Shipment Created Successfully!</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          The shipment has been recorded and added to the dispatch queue.
        </p>
        <Button variant="primary" onClick={resetState}>Create Another Shipment</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
      {submitError && (
        <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-danger)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-danger)' }}>
          {submitError}
        </div>
      )}

      <div className="grid-auto-fit">
        <div>
          <Select
            label="Commodity Type *"
            value={formData.commodityType}
            onChange={(e) => handleChange('commodityType', e.target.value)}
            options={[
              { value: '', label: 'Select Commodity' },
              { value: 'GENERAL', label: 'General' },
              { value: 'HAZARDOUS', label: 'Hazardous' },
              { value: 'PERISHABLE', label: 'Perishable' },
              { value: 'FRAGILE', label: 'Fragile' },
              { value: 'SECURE', label: 'Secure' },
            ]}
          />
          {errors.commodityType && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.commodityType}</span>}
        </div>

        <div>
          <Select
            label="Priority *"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={[
              { value: '', label: 'Select Priority' },
              { value: 'LOW', label: 'Low' },
              { value: 'MEDIUM', label: 'Medium' },
              { value: 'HIGH', label: 'High' },
              { value: 'CRITICAL', label: 'Critical' },
            ]}
          />
          {errors.priority && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.priority}</span>}
        </div>
      </div>

      <div className="grid-auto-fit">
        <div>
          <Input
            label="Origin *"
            placeholder="e.g. Guwahati Hub"
            value={formData.origin}
            onChange={(e) => handleChange('origin', e.target.value)}
          />
          {errors.origin && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.origin}</span>}
        </div>

        <div>
          <Input
            label="Destination *"
            placeholder="e.g. Shillong Facility"
            value={formData.destination}
            onChange={(e) => handleChange('destination', e.target.value)}
          />
          {errors.destination && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.destination}</span>}
        </div>
      </div>

      <div className="grid-auto-fit">
        <div>
          <Input
            label="Quantity (kg) *"
            type="number"
            placeholder="0"
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
          />
          {errors.quantity && <span style={{ color: 'var(--color-danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{errors.quantity}</span>}
        </div>

        <div>
          <Input
            label="Required Delivery Time"
            type="datetime-local"
            value={formData.requiredDeliveryTime}
            onChange={(e) => handleChange('requiredDeliveryTime', e.target.value)}
          />
        </div>
      </div>

      <div className="grid-auto-fit">
        <div>
          <Input
            label="Assigned Vehicle (Optional)"
            placeholder="e.g. V-101"
            value={formData.vehicle}
            onChange={(e) => handleChange('vehicle', e.target.value)}
          />
        </div>

        <div>
          <Input
            label="Assigned Driver (Optional)"
            placeholder="e.g. D-505"
            value={formData.driver}
            onChange={(e) => handleChange('driver', e.target.value)}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-base)', marginBottom: '0.5rem' }}>Special Requirements</label>
        <textarea
          style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-base)', minHeight: '100px', resize: 'vertical' }}
          placeholder="Any specific handling instructions, route restrictions, or compliance notes."
          value={formData.specialRequirements}
          onChange={(e) => handleChange('specialRequirements', e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner size="sm" /> Processing...
            </>
          ) : (
            'Create Shipment'
          )}
        </Button>
      </div>
    </form>
  );
};
