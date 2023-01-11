# Layers

That flexibility is powered by a "layer" approach; each layer has a responsibility, and you can use any of them to create your own timeline experience:

## Timeline Event

A pure logic layer. Each item in the swim lane. Is responsible for computing its own status; if it's in that range, distance from the start of the range, space used in that range, etc.

## Timeline

Another pure logic layer, represents each swim lane. Contains a collection of _Timeline Events_, and is responsible for range provided of this swimlane. If that range change, will ask to events to recompute their status.

## Timeline DOM

This layer is used if you need to render timeline events. Contains a collection of _Timeline_, and is responsible to compute _Timeline Events_ position in each swimlane. It will take care of range of every _Timeline_, and will provide gesture support to allow users to scroll in time.
