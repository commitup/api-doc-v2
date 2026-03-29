import os
import shutil

base_dir = 'docs/money-transfers'
locales = [
    'i18n/tr/docusaurus-plugin-content-docs/current/money-transfers',
    'i18n/ru/docusaurus-plugin-content-docs/current/money-transfers'
]

# Ensure locale base dirs exist safely
for loc in locales:
    os.makedirs(loc, exist_ok=True)

synced_count = 0

# Walk the base directory completely
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.md'):
            # Calculate the relative file path to mirror the directory tree accurately
            rel_path = os.path.relpath(os.path.join(root, file), base_dir)
            source_path = os.path.join(root, file)
            
            for loc in locales:
                dest_path = os.path.join(loc, rel_path)
                dest_dir = os.path.dirname(dest_path)
                
                # Make sure the sub-directory hierarchy exists in the translation scope
                os.makedirs(dest_dir, exist_ok=True)
                
                # Only copy over if the translation file does not already exist natively
                if not os.path.exists(dest_path):
                    shutil.copy2(source_path, dest_path)
                    print(f"[LOCALE SYNC] Copied: {rel_path} -> {loc}")
                    synced_count += 1

print(f"\n[SUCCESS] Synchronization complete! Safely patched {synced_count} missing markdown files.")
