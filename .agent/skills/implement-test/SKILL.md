---
name: implement-test
description: Generate unit/integration tests following project patterns. Use when adding test coverage for existing or new components.
---

# Implement Test

Generate tests following established project patterns.

## When to Use
- Adding test coverage for new features
- Writing reproduction tests for bugs
- Extending coverage after refactoring
- TDD implementation

## Approach

### Phase 1: Test Discovery
1. Identify the component/function to test.
2. Check for existing test patterns in the same directory.
3. Review `*.test.tsx` or `*.test.ts` files for style guidance.

### Phase 2: Test Planning
For each test file, plan:
- **Happy Path**: Core functionality works as expected.
- **Edge Cases**: Empty states, boundary values, null inputs.
- **Error Cases**: Invalid inputs, network failures, timeouts.
- **Accessibility**: Keyboard navigation, screen reader compatibility (if UI).

### Phase 3: Test Implementation
**Naming Convention:**
- File: `[ComponentName].test.tsx` or `[functionName].test.ts`
- Describe blocks: `describe('[ComponentName]', () => { ... })`
- Test cases: `it('should [expected behavior] when [condition]', () => { ... })`

**Structure:**
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './component-name';

describe('ComponentName', () => {
  it('should render successfully', () => {
    render(<ComponentName />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  describe('when [condition]', () => {
    it('should [behavior]', () => {
      // Arrange
      // Act
      // Assert
    });
  });
});
```

### Phase 4: Verification
1. Run `npm run test [path/to/test]`
2. Verify all tests pass
3. Check coverage if applicable

## Constraints
- Follow existing test patterns in the codebase
- Use `@testing-library/react` for component tests
- Prefer `screen.getByRole` over `getByTestId` for accessibility
- Mock external dependencies, not internal modules
- Do not use snapshot tests unless explicitly requested

## Output
- Test file(s) created with passing tests
- Coverage summary (if requested)
