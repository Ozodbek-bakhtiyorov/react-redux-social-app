import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Glory:wght@400;500;600;800&family=Poppins:wght@400;500;600;700;800;900&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,100&display=swap');
  *{
    margin: 0;
    padding:0;
    box-sizing:border-box;
    text-decoration:none;
  }
  body{
    font-family:'Roboto', sans-serif;
  }

  a{
    color:inherit;
  }
  .hidden{
    display:none;
  }
  span.toast{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .material-icons{
      text-align: center;
      vertical-align: middle;
      margin-right:10px;
      color:red;
    }
  }
`