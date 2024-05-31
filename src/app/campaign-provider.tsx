'use client';

import { createContext, useEffect, useState } from 'react';

import { Client, createClient } from '@absinthe-points/sdk';

export type CampaignData = {
  apiKey: string;
  campaignId: number;
  client: Client;
};

export const CampaignContext = createContext<{
  campaign: CampaignData | null,
  setCampaign: (campaign: CampaignData | null) => void,
}>({
  campaign: null,
  setCampaign: () => {},
});

export default function CampaignProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isClient, setIsClient] = useState(false);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);

  useEffect(() => {
    if (isClient) {
      if (campaign) {
        localStorage?.setItem(
          'campaign',
          JSON.stringify({ apiKey: campaign.apiKey, campaignId: campaign.campaignId })
        );
      } else {
        localStorage?.removeItem('campaign');
      }
    }
  }, [campaign]);

  useEffect(() => {
    setIsClient(true);

    const json = localStorage?.getItem('campaign');
    if (json) {
      const data = JSON.parse(json);
      setCampaign({
        apiKey: data.apiKey,
        campaignId: data.campaignId,
        client: createClient(data.apiKey, data.campaignId),
      });
    } else {
      setCampaign(null);
    }
  }, []);

  return (
    <CampaignContext.Provider value={{ campaign, setCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}
