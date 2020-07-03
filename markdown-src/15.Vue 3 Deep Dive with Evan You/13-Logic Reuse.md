# Logic Reuse

The options API in Vue 2 has a couple ways to reuse code across your  codebase.  However, they each have their drawbacks which the Composition API solves.

In this lesson Evan will start by building a component from scratch  using the options API.  We’ll then make it reusable using a Mixin, and  look at the problems this introduces.  An alternative solution would be  to use higher order components or scoped slots, but those solutions  aren’t optimal either. Finally, we use the composition API to create a  composition function.