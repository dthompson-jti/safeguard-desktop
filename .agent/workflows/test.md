---
description: Generate unit/integration tests for components or functions.
---

# Test Workflow

Generate tests following established project patterns.

## Goal
Test file(s) created with passing tests and good coverage of the target code.

## Inputs required (ask if missing)
- Target file or component to test
- Test type: `unit`, `integration`, or `reproduction` (for bugs)

## Safety + scope
- Do NOT: Modify production code (only test files).
- Only touch: Test files adjacent to target or in `__tests__/` directory.

## Skill routing (explicit)
- Use skill: `implement-test`.

## Procedure
1. **Discovery**:
   - run: view_file .agent/skills/implement-test/SKILL.md
   - Identify existing test patterns in the target directory.

2. **Planning**:
   - Plan test cases: happy path, edge cases, error cases.
   - For reproduction tests: ensure the bug is captured first.

3. **Execution**:
   - Generate test file following naming conventions.
   - Implement test cases with proper assertions.

4. **Verification**:
   - Run `npm run test [path/to/test]` to verify tests pass.

## Notes
- For bug reproduction tests, use `/debug` after creating the failing test.
