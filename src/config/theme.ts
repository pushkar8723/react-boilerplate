import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        contrastThreshold: 3,
        error: red,
        primary: indigo,
        secondary: pink,
        tonalOffset: 0.2,
    },
});
