export function currentView(state) {
  if (!state.get('views')) {
    return;
  }
  for (const [k, v] of state.get('views').entries()) {
    if (v) { return k;}
  }

  return null;
}
