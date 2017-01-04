
export function addMovement(newMovement) {
  return function (dispatch, getState) {
    console.info("addMovement", newMovement)
  }
}
