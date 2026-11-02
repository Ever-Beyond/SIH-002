import { useState } from 'react';
import { shipmentApi } from '../services/shipmentApi';
import type { CreateShipmentPayload } from '../types';

export const useCreateShipment = () => {
  const [formData, setFormData] = useState<CreateShipmentPayload>({
    commodityType: '',
    origin: '',
    destination: '',
    priority: '',
    quantity: '',
    requiredDeliveryTime: '',
    vehicle: '',
    driver: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CreateShipmentPayload, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateShipmentPayload, string>> = {};
    let isValid = true;

    if (!formData.commodityType) {
      newErrors.commodityType = 'Commodity type is required';
      isValid = false;
    }
    if (!formData.origin.trim()) {
      newErrors.origin = 'Origin is required';
      isValid = false;
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
      isValid = false;
    }
    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
      isValid = false;
    }
    if (!formData.quantity.trim() || isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field: keyof CreateShipmentPayload, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!validate()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await shipmentApi.createShipment(formData);

      if (response.success) {
        setSubmitSuccess(true);
        // Reset form on success
        setFormData({
          commodityType: '',
          origin: '',
          destination: '',
          priority: '',
          quantity: '',
          requiredDeliveryTime: '',
          vehicle: '',
          driver: '',
          specialRequirements: ''
        });
      } else {
        setSubmitError(response.error || 'An unexpected error occurred while creating the shipment.');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('A fatal error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetState
  };
};
