import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// Pallet 1 : https://coolors.co/246eb9-4cb944-3e4e50-f5ee9e-f06543
// Pallet 2 : https://coolors.co/246eb9-4cb944-b3001b-f5ee9e-2d3142
export default createMuiTheme({
    palette: {
        contrastThreshold: 3,
        error: { main: '#b3001b' },
        primary: { main: '#246EB9' },
        secondary: { main: '#f06543' },
        tonalOffset: 0.2,
    },
});
