# Separate delivery routing from learning support

Accepted for [product v2](../../product.md). A task's high/low learning value and high/low real-delivery risk determine delivery ownership. The junior handles high-learning/low-risk work with support; AI can handle routine low-risk work; a senior delivers high-learning/high-risk work while the junior receives a separate synthetic practice copy; a senior owns low-learning/high-risk work. The reviewed route and one-sentence reason are authored in P0.

L0–L4 is the depth of help offered for a sub-skill during practice. Passing G1–G3 can reduce that help but never changes delivery ownership. A high-risk real task does not become safe because a junior passed an exercise. The P0 extension cannot merge code, execute a customer-facing change, or import customer data to make a practice copy. This keeps the apprenticeship loop useful without implying production authorization.

The editor may read an explicit local selection for unscored help, but that context cannot convert a high-risk real task into a low-risk delivery or qualify a gate. Airwallex is a benchmark for a team with strong engineering review; no AirCheck-like system is assumed at another company. See [shared contract](../contracts.md) and [editor-context decision](0004-bounded-editor-context-and-mentor-lessons.md).
