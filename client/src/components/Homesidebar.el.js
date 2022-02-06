import styled from 'styled-components'

export const Content = styled.div`
  position:fixed;
  /* max-height:100vh; */
 .content{
  padding:2rem 1rem;
  overflow: auto;
  display: grid;
  grid-gap:20px;
  grid-template-columns:repeat(auto-fill);
  max-height: 80vh;
    /* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
 }
@media screen and (max-width:600px){
  position:static;
}
`
