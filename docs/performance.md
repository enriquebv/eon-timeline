# Performance

To ensure performance in the library, in logic layer actions need to be atomic, and in DOM layer actions will be macro. That means:

- Logic:
  - When add an item to `Timeline`, will calculate his position at this moment.
  - If timeline range changes, will determine wich items will be shown.
  - If item is updated, at this moment his new position will be recomputed.
- DOM:
  - When render a timeline, each line will get first available item, position in the container, and the rest of items will be positioned after that item using marging.
  - When panning timeline, will move each line, to avoid applying positioning to each single item.
