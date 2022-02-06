export const useDisableScroll = (isModal)=>{
  if(isModal){
    document.body.style.cssText=`
      overflow:hidden!important;
    `
  }
  else{
    document.body.style= 'overflow:auto!important'
  }
}