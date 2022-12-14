const setDateFilter = (
  startingDate: string | false | undefined,
  endingDate: string | false | undefined
): string | false => {
  if (typeof startingDate === 'string' && typeof endingDate === 'string') {
    return 'both'
  } else if (typeof startingDate === 'string') {
    return 'start'
  } else if (typeof endingDate === 'string') {
    return 'end'
  } else return false
}

export default setDateFilter
