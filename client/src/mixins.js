const d_flex = (dir,jc,ai)=>{
  return `
    display:flex;
    flex-directions:${dir};
    align-items:${ai};
    justify-content:${jc};
  `
}
const d_grid = (size, gap)=>{
  return `
    display:grid;
    grid-gap:${gap};
    grid-template-columns:repeat(auto-fill,minmax(${size},1fr));
  `
}


export {
  d_flex,
  d_grid
}