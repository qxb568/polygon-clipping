/**
 * A bounding box has the format:
 *
 *  { ll: { x: xmin, y: ymin }, ur: { x: xmax, y: ymax } }
 *
 */

export const isInBbox = (bbox, point) => {
  return (
    (bbox.ll.x <= point.x) &&
    (point.x <= bbox.ur.x) &&
    (bbox.ll.y <= point.y) &&
    (point.y <= bbox.ur.y)
  )
}

function comparePointValue(value1,value2,threshold = 0){
  const threshold = 0.0001;
  if(abs(value1 - value2) < threshold)return 0;
  else return value1 - value2;
}

/* Returns either null, or a bbox (aka an ordered pair of points)
 * If there is only one point of overlap, a bbox with identical points
 * will be returned */
export const getBboxOverlap = (b1, b2,threshold = 0) => {
  // check if the bboxes overlap at all
  if (
    comparePointValue(b2.ur.x - b1.ll.x,threshold) < 0 ||
    comparePointValue (b1.ur.x - b2.ll.x,threshold) < 0 ||
    comparePointValue(b2.ur.y - b1.ll.y,threshold)<0 ||
    comparePointValue(b1.ur.y - b2.ll.y,threshold)<0
  ) return null

  // find the middle two X values
  const lowerX = comparePointValue(b1.ll.x - b2.ll.x,threshold)<0 ? b2.ll.x : b1.ll.x
  const upperX = comparePointValue(b1.ur.x - b2.ur.x,threshold)<0 ? b1.ur.x : b2.ur.x

  // find the middle two Y values
  const lowerY = comparePointValue(b1.ll.y - b2.ll.y,threshold) <0 ? b2.ll.y : b1.ll.y
  const upperY = comparePointValue(b1.ur.y - b2.ur.y,threshold ) < 0? b1.ur.y : b2.ur.y

  // put those middle values together to get the overlap
  return { ll: { x: lowerX, y: lowerY }, ur: { x: upperX, y: upperY } }
}
