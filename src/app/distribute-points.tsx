'use client';

import { AutoAwesome } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEventHandler, useContext, useState } from 'react';

import { CampaignContext } from './campaign-provider';

export default function DistributePoints() {
  const { campaign } = useContext(CampaignContext);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    const validationErrors: Record<string, string> = {};
    const formData = new FormData(event.currentTarget);

    const address = formData.get('address')?.toString();
    if (!address) {
      validationErrors['address'] = 'Required';
    } else if (!/^0x[a-f0-9]{40}$/i.test(address.toString())) {
      validationErrors['address'] = 'Must be a valid EVM address';
    }

    const eventName = formData.get('event')?.toString();
    if (!eventName) {
      validationErrors['event'] = 'Required';
    }

    const points = formData.get('points')?.toString();
    if (!points) {
      validationErrors['points'] = 'Required';
    } else if (+points <= 0) {
      validationErrors['points'] = 'Must be > 0';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else if (!campaign) {

    } else {
      setErrors({});

      campaign.client.distributePoints(
        eventName!,
        { points: +points!, address: address as `0x${string}` }
      ).then(() => {

      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Distribute Points
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <TextField
            id="address-ctrl"
            name="address"
            label="Address"
            required
            helperText={errors['address']}
            error={!!errors['address']}
          />
          <TextField
            id="event-ctrl"
            name="event"
            label="Event Name"
            required
            helperText={errors['event']}
            error={!!errors['event']}

          />
          <TextField
            id="points-ctrl"
            name="points"
            label="Points"
            type="number"
            required
            helperText={errors['points']}
            error={!!errors['points']}
          />

          <Button
            type="submit"
            startIcon={<AutoAwesome />}
            disabled={!campaign}
            sx={{ width: 195, mx: 'auto' }}
          >
            Distribute Points
          </Button>
        </Box>
      </form>
    </Box>
  );
}
