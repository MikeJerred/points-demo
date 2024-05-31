'use client';

import { Search } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { FormEventHandler, useContext, useState } from 'react';

import { CampaignContext } from './campaign-provider';

export default function DisplayPoints() {
  const { campaign } = useContext(CampaignContext);
  const [points, setPoints] = useState<number | null>(null);
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

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else if (!campaign) {

    } else {
      setErrors({});

      campaign.client.getPoints(address as `0x${string}`, eventName).then(value => {
        setPoints(value);
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Display Points
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }} color="primary">
        { points ?? '' }
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <TextField
            id="search-address-ctrl"
            name="address"
            label="Address"
            required
            helperText={errors['address']}
            error={!!errors['address']}
          />
          <TextField
            id="search-event-ctrl"
            name="event"
            label="Event Name"
            helperText={errors['event']}
            error={!!errors['event']}

          />

          <Button
            type="submit"
            startIcon={<Search />}
            disabled={!campaign}
            sx={{ width: 120, mx: 'auto' }}
          >
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
}
