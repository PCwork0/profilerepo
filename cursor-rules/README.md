# Cursor Rules System

This folder contains cursor-specific rules, configurations, and templates for maintaining consistent development practices.

## Structure

- `rules.json` - Main configuration file for cursor rules
- `templates/` - Reusable rule templates and patterns

## Usage

Add cursor rules to `rules.json` in the following format:

```json
{
  "rules": [
    {
      "name": "Rule Name",
      "description": "Description of the rule",
      "pattern": "Pattern or condition",
      "action": "Action to take"
    }
  ]
}
```

## Templates

The `templates/` folder contains reusable rule patterns that can be imported and customized for specific projects.

## Best Practices

1. Keep rules focused and specific
2. Use clear, descriptive names
3. Document the purpose of each rule
4. Test rules before applying to production code 