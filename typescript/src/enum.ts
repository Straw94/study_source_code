enum Direction {
    Success,
    Fail,
    Others = 6,
    Next,
}



function CheckType(arr: any[], status: number): string {
  // return ''
  return Object.entries(Direction).filter(([key, value]) => status === value)[0][0]
}

const arr = [1,2]
console.log(CheckType(arr, 7))