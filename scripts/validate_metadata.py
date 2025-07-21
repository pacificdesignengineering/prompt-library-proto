import os
import yaml
import jsonschema
from jsonschema import validate

# Define the metadata schema
schema = {
    "type": "object",
    "required": ["name", "category", "description", "version", "author", "compatible_llms", "compatible_interfaces", "inputs", "outputs", "chaining_compatible"],
    "properties": {
        "name": {"type": "string"},
        "category": {"type": "string"},
        "description": {"type": "string"},
        "version": {"type": "number"},
        "author": {"type": "string"},
        "compatible_llms": {"type": "array", "items": {"type": "string"}},
        "compatible_interfaces": {"type": "array", "items": {"type": "string"}},
        "inputs": {"type": "array", "items": {"type": "string"}},
        "outputs": {"type": "array", "items": {"type": "string"}},
        "chaining_compatible": {"type": "boolean"}
    }
}

def validate_prompt_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
        if '---' not in content:
            print(f"{filepath}: ❌ No metadata found.")
            return
        frontmatter = content.split('---')[1]
        metadata = yaml.safe_load(frontmatter)
        try:
            validate(instance=metadata, schema=schema)
            print(f"{filepath}: ✅ Valid metadata.")
        except jsonschema.exceptions.ValidationError as e:
            print(f"{filepath}: ❌ Invalid metadata - {e.message}")

def scan_prompts(base_dir):
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                validate_prompt_file(os.path.join(root, file))

if __name__ == "__main__":
    scan_prompts('prompts')
