# PROJECT CONTINUITY RULE

Before modifying the NER-SHIELD project:

1. Inspect the repository.
2. Read the existing architecture documentation.
3. Read the previous task completion report.
4. Inspect relevant existing code.
5. Determine what is already implemented.
6. Do not recreate existing functionality.
7. Do not rename public APIs without a migration reason.
8. Do not change database schema without migrations.
9. Do not introduce a new library when an existing dependency already solves the problem.
10. Preserve existing API contracts unless the task explicitly changes them.

If you discover an architectural problem from a previous task:

DO NOT silently rewrite everything.

Report:
- problem
- impact
- proposed fix
- affected modules

Then implement the smallest safe correction.
