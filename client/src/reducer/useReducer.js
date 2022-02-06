export const initialstate = null;

export const userReducer = (state, action)=>{
  const {type, payload}=action;
  switch (type) {
    case "USER":
      return payload;
    case "CLEAR":
      return null;
    case "UPDATE":
      return {
        ...state,
        followers:payload.followers,
        following:payload.following
      }
    case 'UPDATEAVATAR':
      return {
        ...state,
        url:payload
      }
    case 'EDITPROFILE':
      return{
        ...state,
        name:payload
      } 
    default:
      return state;
  }
}