import { createMuiTheme } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import cyan from "@material-ui/core/colors/cyan";
import { tsTypeAliasDeclaration } from "@babel/types";

export default createMuiTheme({
  palette: {
    primary: teal,
    secondary: cyan, // Indigo is probably a good match with pink
    textColor: teal
  },
  overrides: {
    MuiMenuItem: {
     root: {
        color:'teal',
       '&$selected': {           
         color: 'white',
         backgroundColor: 'teal'
       },
      },
    },
  },  
});
