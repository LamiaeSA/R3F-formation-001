export const scaleFactor = 1/10
export const leftSideId =(TREEID)=> TREEID + '.3'
export const rightSideId =(TREEID)=> TREEID + '.1'
export const backId =(TREEID)=> TREEID + '.2'
export const doorId =(TREEID)=> TREEID + '.0'
export const getParentId = (TREEID) => TREEID==='0' ? '0' : TREEID.substring(0, TREEID.lastIndexOf('.'))
