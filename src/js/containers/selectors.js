export function currentView(state) {
  for (const [k, v] of state.get('views').entries()) {
    if (v) { return k;}
  }

  return null;
}
