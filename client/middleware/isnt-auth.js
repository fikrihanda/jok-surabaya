export default function ({store, redirect}) {
  let token = store.getters['authentication/token']
  if (!_.isEmpty(token)) {
    redirect('/')
  }
}
