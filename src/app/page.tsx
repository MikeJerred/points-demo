import {
  Box,
  Container,
  Drawer,
  Typography,
} from '@mui/material';

import Campaign from './campaign';
import CampaignProvider from './campaign-provider';
import DisplayPoints from './display-points';
import DistributePoints from './distribute-points';

const drawerWidth = 200;

export default function Home() {
  return (
    <CampaignProvider>
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Campaign
          </Typography>

          <Campaign />
        </Drawer>

        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" sx={{ m: 2, textAlign: 'center' }}>
            Points Demo Utility
          </Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 4,
          }}>
            <DisplayPoints />
            <DistributePoints />
          </Box>
        </Container>
      </Box>
    </CampaignProvider>
  );
}
