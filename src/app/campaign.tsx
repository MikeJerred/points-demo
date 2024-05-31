'use client';

import { Add, Delete } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useContext } from 'react';

import { createCampaign, createClient } from '@absinthe-points/sdk';
import { CampaignContext } from './campaign-provider';

export default function Campaign() {
  const { campaign, setCampaign } = useContext(CampaignContext);

  const createNewCampaign = async () => {
    const { apiKey, campaignId } = await createCampaign();
    const client = createClient(apiKey, campaignId);
    setCampaign({ apiKey, campaignId, client });
  };

  const forgetCampaign = () => {
    setCampaign(null);
  };

  return (
    <Box sx={{
      m: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    }}>
      {
        campaign
          ? <>
            <TextField
              id="api-key-ctrl"
              name="api"
              label="API Key"
              multiline
              value={campaign.apiKey}
              disabled
            />
            <TextField
              id="campaign-id-ctrl"
              name="id"
              label="Campaign ID"
              value={campaign.campaignId}
              disabled
            />

            <Button variant="outlined" startIcon={<Delete />} onClick={forgetCampaign}>Forget</Button>
          </>
          : <Button variant="outlined" startIcon={<Add />} onClick={createNewCampaign}>Create</Button>
      }
    </Box>
  );
}
