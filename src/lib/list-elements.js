export default (context, selector) => {
  return [].slice.call(context.querySelectorAll(selector))
}
